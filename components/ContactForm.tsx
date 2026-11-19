'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
  source: string
  consent: boolean
  honeypot: string // anti-spam bot trap
}

type Step = 1 | 2 | 3
type Status = 'idle' | 'submitting' | 'success' | 'error'

const sourceOptions = ['LinkedIn', 'Google', 'Event', 'Referral', 'Instagram', 'Other']

const initialData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  source: '',
  consent: false,
  honeypot: '',
}

interface Props {
  onClose?: () => void
  isOverlay?: boolean
}

export default function ContactForm({ onClose, isOverlay = false }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [stepNotice, setStepNotice] = useState<string | null>(null)

  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null)

  // Focus the first input of each step and clear the step notice.
  // Using setTimeout(0) defers the setState call out of the synchronous
  // effect body, satisfying react-hooks/set-state-in-effect.
  useEffect(() => {
    const id = setTimeout(() => {
      setStepNotice(null)
      if (step === 1) {
        nameInputRef.current?.focus()
      } else if (step === 2) {
        messageInputRef.current?.focus()
      }
    }, 0)
    return () => clearTimeout(id)
  }, [step])

  // Keyboard: Escape closes overlay if inside modal
  useEffect(() => {
    if (!isOverlay) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOverlay, onClose])

  const setField = (field: keyof FormData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
    if (stepNotice) {
      setStepNotice(null)
    }
  }

  // ── Validation ───────────────────────────────────────────
  function validateCurrentStep(currentStep: Step): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (currentStep === 1) {
      const trimmedName = data.name.trim()
      const trimmedEmail = data.email.trim()

      if (!trimmedName) {
        newErrors.name = 'Please enter your name.'
      }

      if (!trimmedEmail) {
        newErrors.email = 'Please enter your email address.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        newErrors.email = 'Please enter a valid email address (e.g. name@company.co.bw).'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setStepNotice('Please enter your name and email to continue.')
        if (newErrors.name) {
          nameInputRef.current?.focus()
        } else if (newErrors.email) {
          document.getElementById('email')?.focus()
        }
        return false
      }
    }

    if (currentStep === 2) {
      const trimmedMessage = data.message.trim()
      if (!trimmedMessage) {
        newErrors.message = 'Please tell us briefly what you want to achieve.'
      } else if (trimmedMessage.length < 10) {
        newErrors.message = 'Please provide a little more detail (at least 10 characters).'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setStepNotice('Please add a brief description of your project.')
        messageInputRef.current?.focus()
        return false
      }
    }

    if (currentStep === 3) {
      if (!data.source) {
        newErrors.source = 'Please select how you found us.'
      }
      if (!data.consent) {
        newErrors.consent = 'Please tick the consent box to submit.'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setStepNotice('Please select an option and confirm the consent box.')
        return false
      }
    }

    setErrors({})
    setStepNotice(null)
    return true
  }

  const handleNext = () => {
    if (!validateCurrentStep(step)) return
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    setErrors({})
    setStepNotice(null)
    setStep((prev) => (prev - 1) as Step)
  }

  // Handle Enter key across steps (ignore inside textarea to allow newlines)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() !== 'textarea' && step < 3) {
        e.preventDefault()
        handleNext()
      }
    }
  }

  // ── Submit ───────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateCurrentStep(3)) return
    if (data.honeypot) return // Bot caught by hidden field — silently discard

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('Server returned error response')
      }

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // ── Success State ─────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="flex flex-col gap-6 items-center text-center max-w-md mx-auto py-10 animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight">Thanks, you&apos;re all set.</h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">
          We&apos;ve received your message and will reply within 3 business days.
          While you wait, feel free to inspect our{' '}
          <Link href="/projects" className="text-white underline hover:text-[#9fa3fc] transition-colors">
            technical projects
          </Link>.
        </p>
        {isOverlay && (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
          >
            Close
          </button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate className="flex flex-col gap-8 w-full">
      {/* Honeypot field (hidden from screenreaders and humans) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        value={data.honeypot}
        onChange={(e) => setField('honeypot', e.target.value)}
        autoComplete="off"
      />

      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-white/50">
          <span>Step {step} of 3</span>
          <span>
            {step === 1 && 'Contact Details'}
            {step === 2 && 'Project Scope'}
            {step === 3 && 'Confirmation'}
          </span>
        </div>
        <div className="flex gap-2 items-center" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                n <= step ? 'bg-white shadow-sm' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Step 1: Contact Details ── */}
      {step === 1 && (
        <fieldset className="flex flex-col gap-5 border-none p-0 m-0 animate-fade-in">
          <div>
            <legend className="text-xl md:text-2xl font-medium text-white tracking-tight">
              How can we reach you?
            </legend>
            <p className="text-xs text-white/50 mt-1">
              Provide your details so our analytics team can send you a proposal or answer your questions.
            </p>
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-white/70 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              ref={nameInputRef}
              type="text"
              placeholder="e.g. Jane Smith"
              className={`w-full bg-[#141414] border ${
                errors.name ? 'border-red-500 ring-1 ring-red-500/30' : 'border-white/10 focus:border-white/40'
              } rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none transition-all`}
              value={data.name}
              onChange={(e) => setField('name', e.target.value)}
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-err' : undefined}
            />
            {errors.name && (
              <p id="name-err" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-white/70 mb-1.5">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. name@organisation.co.bw"
              className={`w-full bg-[#141414] border ${
                errors.email ? 'border-red-500 ring-1 ring-red-500/30' : 'border-white/10 focus:border-white/40'
              } rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none transition-all`}
              value={data.email}
              onChange={(e) => setField('email', e.target.value)}
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-err' : undefined}
            />
            {errors.email && (
              <p id="email-err" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-white/70 mb-1.5">
              Phone Number <span className="text-white/40 text-[11px]">(Optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. +267 7X XXX XXX"
              className="w-full bg-[#141414] border border-white/10 focus:border-white/40 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none transition-all"
              value={data.phone}
              onChange={(e) => setField('phone', e.target.value)}
              autoComplete="tel"
            />
          </div>

          {/* Organisation Field (Optional) */}
          <div>
            <label htmlFor="company" className="block text-xs font-medium text-white/70 mb-1.5">
              Organisation or Business <span className="text-white/40 text-[11px]">(Optional)</span>
            </label>
            <input
              id="company"
              type="text"
              placeholder="e.g. Ministry, Bank, Agribusiness, or SME"
              className="w-full bg-[#141414] border border-white/10 focus:border-white/40 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none transition-all"
              value={data.company}
              onChange={(e) => setField('company', e.target.value)}
              autoComplete="organization"
            />
          </div>
        </fieldset>
      )}

      {/* ── Step 2: Project Scope ── */}
      {step === 2 && (
        <fieldset className="flex flex-col gap-5 border-none p-0 m-0 animate-fade-in">
          <div>
            <legend className="text-xl md:text-2xl font-medium text-white tracking-tight">
              Tell us about your project
            </legend>
            <p className="text-xs text-white/50 mt-1">
              A few sentences is enough: what question you want to answer and what data you have.
            </p>
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Your message</label>
            <textarea
              id="message"
              ref={messageInputRef}
              placeholder="Describe your current data setup, the key question you want answered, or the dashboard/pipeline you need built…"
              rows={6}
              className={`w-full bg-[#141414] border ${
                errors.message ? 'border-red-500 ring-1 ring-red-500/30' : 'border-white/10 focus:border-white/40'
              } rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none transition-all resize-none`}
              value={data.message}
              onChange={(e) => setField('message', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'msg-err' : undefined}
            />
            {errors.message && (
              <p id="msg-err" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.message}
              </p>
            )}
          </div>
        </fieldset>
      )}

      {/* ── Step 3: Confirmation & Consent ── */}
      {step === 3 && (
        <fieldset className="flex flex-col gap-6 border-none p-0 m-0 animate-fade-in">
          <div>
            <legend className="text-xl md:text-2xl font-medium text-white tracking-tight">
              How did you find us?
            </legend>
            <p className="text-xs text-white/50 mt-1">
              Select one option to help us understand where our clients find us.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="radiogroup" aria-label="How did you find us?">
            {sourceOptions.map((opt) => (
              <label
                key={opt}
                className={`cursor-pointer px-4 py-3 rounded-xl border text-xs font-medium text-center transition-all select-none ${
                  data.source === opt
                    ? 'border-white bg-white text-black font-semibold shadow-md'
                    : 'border-white/10 text-white/70 hover:text-white hover:border-white/25 bg-[#141414]'
                }`}
              >
                <input
                  type="radio"
                  name="source"
                  value={opt}
                  className="sr-only"
                  checked={data.source === opt}
                  onChange={() => setField('source', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
          {errors.source && (
            <p role="alert" className="text-red-400 text-xs flex items-center gap-1 -mt-2">
              <span>⚠</span> {errors.source}
            </p>
          )}

          {/* Privacy Consent Checkbox */}
          <div className="pt-3 border-t border-white/[0.08]">
            <label className="flex gap-3 items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => setField('consent', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#141414] text-black focus:ring-0 cursor-pointer accent-white"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'consent-err' : undefined}
              />
              <span className="text-xs text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                I agree to allow Blanc Data to process these details solely to respond to this inquiry.{' '}
                <Link href="/privacy" className="text-white underline hover:text-[#9fa3fc]">
                  Read our privacy policy
                </Link>.
              </span>
            </label>
            {errors.consent && (
              <p id="consent-err" role="alert" className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.consent}
              </p>
            )}
          </div>
        </fieldset>
      )}

      {/* Helper notice if validation failed */}
      {stepNotice && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2 animate-fade-in">
          <span>ℹ</span>
          <span>{stepNotice}</span>
        </div>
      )}

      {/* Global error banner */}
      {status === 'error' && (
        <div role="alert" className="text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-xl p-4">
          The message could not be sent. Your inputs are saved. Please retry, or email us directly at{' '}
          <a href="mailto:hello@blancsociety.co.uk" className="underline text-white">
            hello@blancsociety.co.uk
          </a>.
        </div>
      )}

      {/* Form Controls / Buttons */}
      <div className="flex items-center justify-between pt-5 border-t border-white/[0.08]">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] text-xs font-medium transition-all active:scale-95 cursor-pointer"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3">
          {step < 3 && (
            <span className="hidden sm:inline text-[11px] text-white/40">Press Enter ↵</span>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-6 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md cursor-pointer hover:shadow-white/10"
              aria-label="Proceed to next step"
            >
              <span>Next</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 bg-white text-black text-xs font-semibold px-7 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Send inquiry</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
