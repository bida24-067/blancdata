import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Blanc Data — Data Analytics & Intelligence in Botswana'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#121212',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#34d399',
            }}
          />
          <span style={{ color: '#ffffff80', fontSize: '16px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Data Consultancy · Gaborone, Botswana
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ color: '#9fa3fc', fontSize: '18px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Blanc Data
          </div>
          <div
            style={{
              color: '#ffffff',
              fontSize: '52px',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '800px',
            }}
          >
            Data Analytics & Intelligence in Botswana.
          </div>
          <div style={{ color: '#ffffff80', fontSize: '22px', maxWidth: '700px', lineHeight: 1.4 }}>
            Enterprise pipelines · Predictive models · Interactive dashboards
          </div>
        </div>

        {/* Bottom domain */}
        <div style={{ color: '#ffffff40', fontSize: '16px' }}>blancsociety.co.uk</div>
      </div>
    ),
    { ...size },
  )
}
