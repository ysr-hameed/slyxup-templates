import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 120
const CODE_DURATION = 780

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Tutorial
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 56, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', margin: '16px 0 0', lineHeight: 1.2, padding: '0 40px' }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function CodeCard({ code, accentColor, textColor }: { code: string[]; accentColor: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
      <div style={{ background: '#0d1117', border: `1px solid ${accentColor}30`, borderRadius: 12, padding: '32px 28px', width: '100%', maxWidth: 860 }}>
        {code.map((line, i) => {
          const lineStart = i * 90
          const localFrame = frame - lineStart
          const opacity = interpolate(Math.max(0, localFrame), [0, 15, 60, 780], [0, 1, 1, 0])
          const slideX = interpolate(Math.max(0, localFrame), [0, 15], [-20, 0])

          return (
            <p key={i} style={{ color: line.startsWith('//') ? 'rgba(255,255,255,0.3)' : textColor, fontSize: 22, fontFamily: '"JetBrains Mono", monospace', margin: '8px 0', opacity, transform: `translateX(${slideX}px)`, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {line}
            </p>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const CodeTutorialSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  code: { type: 'list' as const, label: 'Code Lines', itemType: 'text', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0d1117' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#58a6ff' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#c9d1d9' },
}

export const Composition: React.FC<{
  title: string
  code: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, code, bgColor = '#0d1117', accentColor = '#58a6ff', textColor = '#c9d1d9' }) => {
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={CODE_DURATION}>
        <CodeCard code={code} accentColor={accentColor} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
