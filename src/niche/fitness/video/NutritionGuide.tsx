import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 120
const TIP_DURATION = 780

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Nutrition Guide
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 52, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2 }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tips, textColor, accentColor }: { tips: string[]; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
      <div style={{ width: '100%', maxWidth: 800 }}>
        {tips.map((tip, i) => {
          const tipStart = i * 130
          const localFrame = frame - tipStart
          const enter = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 14, stiffness: 65 } })
          const opacity = interpolate(Math.max(0, localFrame), [0, 20, 100, 130], [0, 1, 1, 0])
          const slideY = interpolate(enter, [0, 1], [25, 0])

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, opacity, transform: `translateY(${slideY}px)` }}>
              <span style={{ color: accentColor, fontSize: 28, fontFamily: 'system-ui, sans-serif' }}>
                {['🥗', '💪', '🥤', '🍎', '🥦'][i % 5]}
              </span>
              <p style={{ color: textColor, fontSize: 24, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.4 }}>{tip}</p>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const NutritionGuideSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  tips: { type: 'list' as const, label: 'Nutrition Tips', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a1a0a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#22c55e' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  tips: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, tips, bgColor = '#0a1a0a', accentColor = '#22c55e', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #0f2a0f 100%)` }}>
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={TIP_DURATION}>
        <TipCard tips={tips} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
