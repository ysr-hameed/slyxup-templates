import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 90
const TIPS_DURATION = 810

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 60, 90], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Study Tips
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 56, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2 }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function TipsCard({ tips, textColor, accentColor }: { tips: string[]; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
      <div style={{ width: '100%', maxWidth: 800 }}>
        {tips.map((tip, i) => {
          const tipStart = i * 100
          const localFrame = frame - tipStart
          const enter = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 14, stiffness: 75 } })
          const opacity = interpolate(Math.max(0, localFrame), [0, 20, 75, 100], [0, 1, 1, 0])
          const slideX = interpolate(enter, [0, 1], [-20, 0])

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, opacity, transform: `translateX(${slideX}px)` }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#000', fontSize: 16, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{i + 1}</span>
              </div>
              <p style={{ color: textColor, fontSize: 24, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.4 }}>{tip}</p>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const StudyTipsSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  tips: { type: 'list' as const, label: 'Study Tips', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#6366f1' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  tips: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, tips, bgColor = '#0a0a1a', accentColor = '#6366f1', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={TIPS_DURATION}>
        <TipsCard tips={tips} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
