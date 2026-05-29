import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 120
const STEPS_DURATION = 780

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          How It Works
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 52, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2, padding: '0 40px' }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function StepsCard({ steps, textColor, accentColor }: { steps: string[]; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
      <div style={{ width: '100%', maxWidth: 700 }}>
        {steps.map((step, i) => {
          const stepStart = i * 110
          const localFrame = frame - stepStart
          const enter = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 12, stiffness: 80 } })
          const opacity = interpolate(Math.max(0, localFrame), [0, 20, 85, 110], [0, 1, 1, 0])
          const slideX = interpolate(enter, [0, 1], [-25, 0])

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, opacity, transform: `translateX(${slideX}px)` }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: `3px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: accentColor, fontSize: 20, fontWeight: 800, fontFamily: 'system-ui, sans-serif' }}>{i + 1}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: textColor, fontSize: 24, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.4 }}>{step}</p>
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const HowItWorksSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  steps: { type: 'list' as const, label: 'Steps', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#06b6d4' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  steps: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, steps, bgColor = '#0a0a1a', accentColor = '#06b6d4', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #0a1628 100%)` }}>
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={STEPS_DURATION}>
        <StepsCard steps={steps} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
