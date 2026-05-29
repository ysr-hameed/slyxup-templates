import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 150
const STRATEGY_DURATION = 750

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Brand Strategy
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 52, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2, padding: '0 40px' }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function StrategyCard({ points, textColor, accentColor }: { points: string[]; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
      <div style={{ width: '100%', maxWidth: 800 }}>
        {points.map((point, i) => {
          const pointStart = i * 125
          const localFrame = frame - pointStart
          const enter = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 10, stiffness: 70 } })
          const opacity = interpolate(Math.max(0, localFrame), [0, 20, 95, 125], [0, 1, 1, 0])
          const slideX = interpolate(enter, [0, 1], [25, 0])

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24, opacity, transform: `translateX(${slideX}px)` }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, marginTop: 8, flexShrink: 0 }} />
              <p style={{ color: textColor, fontSize: 24, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.5 }}>{point}</p>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const BrandStrategySchema = {
  title: { type: 'text' as const, label: 'Strategy Title', required: true },
  points: { type: 'list' as const, label: 'Strategy Points', itemType: 'text', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#a855f7' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  points: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, points, bgColor = '#0f0a1a', accentColor = '#a855f7', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 900], [0, 360])

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: `1px solid ${accentColor}08`, top: '20%', right: '-10%', transform: `rotate(${swirl}deg)` }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={STRATEGY_DURATION}>
        <StrategyCard points={points} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
