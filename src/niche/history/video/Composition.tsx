import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const YEAR_DURATION = 180
const FACT_DURATION = 720

function YearCard({ year, accentColor }: { year: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const opacity = interpolate(frame, [0, 20, 140, 180], [0, 1, 1, 0])
  const scale = spring({ frame, fps, config: { damping: 8, stiffness: 100 } })

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}>
        <span style={{
          color: accentColor,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontFamily: 'system-ui, sans-serif',
        }}>
          Did You Know?
        </span>
        <p style={{
          color: '#ffffff',
          fontSize: 120,
          fontWeight: 900,
          fontFamily: 'Georgia, serif',
          margin: '16px 0 0',
          lineHeight: 1,
          textShadow: `0 2px 40px ${accentColor}40`,
        }}>
          {year}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function FactCard({ fact, significance, textColor, accentColor }: {
  fact: string; significance?: string; textColor: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 50 } })
  const opacity = interpolate(frame, [0, 30, 680, 720], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [35, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity,
        transform: `translateY(${slideY}px)`,
        padding: '0 50px',
        maxWidth: 980,
        textAlign: 'center',
      }}>
        <div style={{
          borderTop: `2px solid ${accentColor}`,
          borderBottom: `2px solid ${accentColor}`,
          padding: '32px 24px',
        }}>
          <p style={{
            color: textColor,
            fontSize: 38,
            fontWeight: 400,
            lineHeight: 1.5,
            fontFamily: 'Georgia, serif',
            margin: 0,
            fontStyle: 'italic',
          }}>
            "{fact}"
          </p>
        </div>
        {significance ? (
          <p style={{
            color: accentColor,
            fontSize: 22,
            fontWeight: 600,
            marginTop: 32,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: 1,
          }}>
            {significance}
          </p>
        ) : null}
      </div>
    </AbsoluteFill>
  )
}

function VignetteOverlay() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
      pointerEvents: 'none',
    }} />
  )
}

function GrainOverlay() {
  const frame = useCurrentFrame()
  const noise = interpolate(frame % 4, [0, 3], [0, 0.04])

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity: noise,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
      backgroundSize: '256px 256px',
      pointerEvents: 'none',
    }} />
  )
}

export const HistoryFactSchema = {
  year: { type: 'text' as const, label: 'Year', required: true },
  fact: { type: 'text' as const, label: 'Fact', required: true },
  significance: { type: 'text' as const, label: 'Significance', required: false },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1c1108' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#d4a574' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#f5e6d3' },
}

export const Composition: React.FC<{
  year: string
  fact: string
  significance?: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ year, fact, significance, bgColor = '#1c1108', accentColor = '#d4a574', textColor = '#f5e6d3' }) => {
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${bgColor} 0%, #2a1a0a 50%, ${bgColor} 100%)`,
    }}>
      <VignetteOverlay />
      <GrainOverlay />
      <Sequence from={0} durationInFrames={YEAR_DURATION}>
        <YearCard year={year} accentColor={accentColor} />
      </Sequence>
      <Sequence from={YEAR_DURATION} durationInFrames={FACT_DURATION}>
        <FactCard fact={fact} significance={significance} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
