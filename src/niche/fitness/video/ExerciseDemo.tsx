import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 120
const DEMO_DURATION = 780

function TitleCard({ exercise, accentColor }: { exercise: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Exercise Demo
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 68, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '12px 0 0', lineHeight: 1.1 }}>
          {exercise}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function DemoCard({ steps, textColor, accentColor }: { steps: string[]; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 50px' }}>
      <div style={{ width: '100%', maxWidth: 800 }}>
        {steps.map((step, i) => {
          const stepStart = i * 130
          const localFrame = frame - stepStart
          const enter = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 12, stiffness: 75 } })
          const opacity = interpolate(Math.max(0, localFrame), [0, 20, 100, 130], [0, 1, 1, 0])
          const slideX = interpolate(enter, [0, 1], [-20, 0])

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 28, opacity, transform: `translateX(${slideX}px)` }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <span style={{ color: '#000', fontSize: 14, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{i + 1}</span>
              </div>
              <p style={{ color: textColor, fontSize: 24, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.5 }}>{step}</p>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const ExerciseDemoSchema = {
  exercise: { type: 'text' as const, label: 'Exercise Name', required: true },
  steps: { type: 'list' as const, label: 'Steps', itemType: 'text', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1a0a0a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f97316' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  exercise: string
  steps: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ exercise, steps, bgColor = '#1a0a0a', accentColor = '#f97316', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const glowIntensity = interpolate(Math.sin(frame * 0.025), [-1, 1], [0.1, 0.25])

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 70%, ${accentColor}${Math.round(glowIntensity * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)` }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard exercise={exercise} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={DEMO_DURATION}>
        <DemoCard steps={steps} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
