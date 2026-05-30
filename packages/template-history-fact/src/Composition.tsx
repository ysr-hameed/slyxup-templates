import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const ACCENT = '#d4a574'
const BG = 'linear-gradient(180deg, #2a1a0a, #1c1108)'

function YearCard({ year }: { year: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const scale = spring({ frame, fps, config: { damping: 10, stiffness: 120 } })
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: ACCENT, fontSize: 20, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Did You Know?
        </span>
        <p style={{ color: '#ffffff', fontSize: 160, fontWeight: 900, fontFamily: 'Georgia, serif', margin: '16px 0 0', lineHeight: 1, textShadow: `0 4px 60px ${ACCENT}50` }}>
          {year}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function FactCard({ fact, significance }: { fact: string; significance?: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 15, 450, 480], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [25, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 50px', maxWidth: 980, textAlign: 'center' }}>
        <div style={{
          borderTop: `2px solid ${ACCENT}`, borderBottom: `2px solid ${ACCENT}`,
          padding: '36px 28px', position: 'relative',
        }}>
          <span style={{ position: 'absolute', top: -8, left: 16, color: ACCENT, fontSize: 48, fontFamily: 'Georgia, serif', lineHeight: 1 }}>&ldquo;</span>
          <p style={{ color: '#f5e6d3', fontSize: 48, fontWeight: 400, lineHeight: 1.5, fontFamily: 'Georgia, serif', margin: 0, fontStyle: 'italic' }}>
            {fact}
          </p>
          <span style={{ position: 'absolute', bottom: -40, right: 16, color: ACCENT, fontSize: 48, fontFamily: 'Georgia, serif', lineHeight: 1 }}>&rdquo;</span>
        </div>
        {significance ? (
          <p style={{ color: ACCENT, fontSize: 24, fontWeight: 600, marginTop: 32, fontFamily: 'system-ui, sans-serif', letterSpacing: 1 }}>
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
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
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
  year: string; fact: string; significance?: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ year, fact, significance, bgColor = '#1c1108', accentColor = '#d4a574', textColor = '#f5e6d3' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #2a1a0a 50%, ${bgColor} 100%)` }}>
      <VignetteOverlay />
      <Sequence from={0} durationInFrames={120}>
        <YearCard year={year} />
      </Sequence>
      <Sequence from={120} durationInFrames={480}>
        <FactCard fact={fact} significance={significance} />
      </Sequence>
    </AbsoluteFill>
  )
}
