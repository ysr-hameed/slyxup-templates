import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const AFFIRMATION_DURATION = 150
const AFFIRMATION_COUNT = 3

function FloatingBackground({ accentColor }: { accentColor: string }) {
  const frame = useCurrentFrame()
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const baseX = (i * 137 + 50) % 1080
    const baseY = (i * 211 + 30) % 1920
    const driftX = Math.sin(frame * 0.01 + i) * 40
    const driftY = Math.cos(frame * 0.008 + i * 1.3) * 40
    const opacity = 0.1 + Math.sin(frame * 0.02 + i * 0.7) * 0.05
    const size = 4 + (i % 3) * 4
    return { x: baseX + driftX, y: baseY + driftY, opacity, size }
  })

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: p.x, top: p.y,
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: accentColor,
          opacity: p.opacity,
        }} />
      ))}
    </div>
  )
}

function AffirmationCard({ affirmation, index, accentColor }: { affirmation: string; index: number; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 65 } })
  const opacity = interpolate(frame, [0, 20, 120, 150], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [40, 0])

  const wordReveal = interpolate(frame, [20, 120], [0, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity, transform: `translateY(${slideY}px)`,
        textAlign: 'center', padding: '0 60px', maxWidth: 980,
      }}>
        <span style={{
          color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 4,
          textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif',
          display: 'block', marginBottom: 24,
        }}>
          Affirmation {index + 1}
        </span>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: -20, top: -30,
            color: accentColor, fontSize: 96, fontWeight: 900, opacity: 0.3,
            fontFamily: 'Georgia, serif',
          }}>&ldquo;</span>
          <p style={{
            color: '#ffffff', fontSize: 44, fontWeight: 500,
            lineHeight: 1.4, fontFamily: 'Georgia, serif', margin: 0,
          }}>
            {affirmation.split('').map((char, i) => (
              <span key={i} style={{
                opacity: interpolate(wordReveal, [i / affirmation.length, (i + 1) / affirmation.length], [0, 1]),
                display: 'inline-block',
                transform: `translateY(${interpolate(wordReveal, [i / affirmation.length, (i + 1) / affirmation.length], [10, 0])}px)`,
                transition: 'opacity 0.05s, transform 0.05s',
              }}>{char}</span>
            ))}
          </p>
          <span style={{
            position: 'absolute',
            right: -20, bottom: -40,
            color: accentColor, fontSize: 96, fontWeight: 900, opacity: 0.3,
            fontFamily: 'Georgia, serif',
          }}>&rdquo;</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const AffirmationReelSchema = {
  affirmation1: { type: 'text' as const, label: 'Affirmation 1', required: true },
  affirmation2: { type: 'text' as const, label: 'Affirmation 2', required: true },
  affirmation3: { type: 'text' as const, label: 'Affirmation 3', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1a0a2e' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#a855f7' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  affirmation1: string; affirmation2: string; affirmation3: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ affirmation1, affirmation2, affirmation3, bgColor = '#1a0a2e', accentColor = '#a855f7', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const glow = interpolate(Math.sin(frame * 0.015), [-1, 1], [0.08, 0.2])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #2d1b4e 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${accentColor}${Math.round(glow * 100).toString(16).padStart(2, '0')} 0%, transparent 70%)` }} />
      <FloatingBackground accentColor={accentColor} />
      <Sequence from={0} durationInFrames={AFFIRMATION_DURATION}>
        <AffirmationCard affirmation={affirmation1} index={0} accentColor={accentColor} />
      </Sequence>
      <Sequence from={AFFIRMATION_DURATION} durationInFrames={AFFIRMATION_DURATION}>
        <AffirmationCard affirmation={affirmation2} index={1} accentColor={accentColor} />
      </Sequence>
      <Sequence from={AFFIRMATION_DURATION * 2} durationInFrames={AFFIRMATION_DURATION}>
        <AffirmationCard affirmation={affirmation3} index={2} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
