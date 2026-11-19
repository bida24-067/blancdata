import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import {
  renderNotificationEmailHtml,
  renderConfirmationEmailHtml,
  ContactEmailData,
} from '@/lib/email-templates'

// Lazy-init so build doesn't fail without env vars
function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(50).optional(),
  company: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  source: z.enum(['LinkedIn', 'Google', 'Event', 'Referral', 'Instagram', 'Other']),
  consent: z.literal(true),
  honeypot: z.string().max(0), // must be empty — bot trap
})

// In-memory rate limiting: max 5 submissions per IP per 15 min
const rateMap = new Map<string, { count: number; reset: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = 15 * 60 * 1000
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + window })
    return false
  }
  if (entry.count >= 5) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 422 })
  }

  const emailData: ContactEmailData = result.data
  const toTeamEmail = process.env.CONTACT_EMAIL || 'hello@blancsociety.co.uk'
  const fromSender = process.env.RESEND_FROM_EMAIL || 'Blanc Data <noreply@noreply.blancsociety.co.uk>'
  const teamReplyTo = toTeamEmail
  const resend = getResend()

  try {
    // 1. Send High-Priority Notification to Blanc Data Team
    const notificationHtml = renderNotificationEmailHtml(emailData)
    const notificationPlainText = [
      `New Inquiry from ${emailData.name} · Blanc Data`,
      '----------------------------------------',
      `Name: ${emailData.name}`,
      `Email: ${emailData.email}`,
      emailData.phone ? `Phone: ${emailData.phone}` : null,
      emailData.company ? `Company / Organisation: ${emailData.company}` : null,
      `Lead Source: ${emailData.source}`,
      '----------------------------------------',
      'Message:',
      emailData.message,
    ]
      .filter(Boolean)
      .join('\n')

    const { data: teamRes, error: teamErr } = await resend.emails.send({
      from: fromSender,
      to: [toTeamEmail],
      replyTo: emailData.email,       // Reply goes to the customer
      subject: `New Inquiry from ${emailData.name} · Blanc Data`,
      html: notificationHtml,
      text: notificationPlainText,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
    })

    if (teamErr) {
      console.error('Failed to dispatch team notification via Resend:', teamErr)
      return NextResponse.json({ error: teamErr.message }, { status: 500 })
    }

    // 2. Dispatch Confirmation / Acknowledgment Email to the User
    // Wrapped safely so third-party sandbox restrictions never break user submission flow
    let userConfirmationSent = false
    try {
      const confirmationHtml = renderConfirmationEmailHtml(emailData)
      const confirmationPlainText = [
        `Hi ${emailData.name},`,
        '',
        'Thank you for reaching out to Blanc Data. We have received your inquiry and our engineering team is reviewing your message.',
        '',
        'What happens next?',
        'We will get back to you within 3 business days to discuss your data question and potential scope.',
        '',
        'Summary of your inquiry:',
        emailData.company ? `Organisation: ${emailData.company}` : null,
        'Project Details:',
        emailData.message,
        '',
        'Explore our technical prototypes: https://blancsociety.co.uk/projects',
        '',
        'Warm regards,',
        'The Blanc Data Team',
        'Gaborone, Botswana · hello@blancsociety.co.uk',
      ]
        .filter(Boolean)
        .join('\n')

      const { error: userErr } = await resend.emails.send({
        from: fromSender,
        to: [emailData.email],
        replyTo: teamReplyTo,          // Reply goes to hello@blancsociety.co.uk
        subject: `We've received your message · Blanc Data`,
        html: confirmationHtml,
        text: confirmationPlainText,
        headers: {
          'List-Unsubscribe': `<mailto:hello@blancsociety.co.uk?subject=Unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          'Precedence': 'bulk',
        },
      })

      if (userErr) {
        console.warn(
          'Client confirmation email notice (domain may require DNS verification on Resend):',
          userErr.message
        )
      } else {
        userConfirmationSent = true
      }
    } catch (confErr) {
      console.warn('Unable to dispatch client confirmation email:', confErr)
    }

    return NextResponse.json({
      ok: true,
      teamNotificationId: teamRes?.id,
      userConfirmationSent,
    })
  } catch (err) {
    console.error('Unhandled email dispatch error:', err)
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 })
  }
}
