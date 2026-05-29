import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 120
const BREAKDOWN_DURATION = 780

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 25, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 25], [20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 20, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Budget Planner
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 56, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2, padding: '0 40px' }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function BreakdownCard({ categories, accentColor, textColor }: { categories: string[]; accentColor: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const totalSegments = categories.length

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
      <div style={{ width: '100%', maxWidth: 800 }}>
        {categories.map((cat, i) => {
          const segmentStart = i * (780 / totalSegments)
          const localFrame = frame - segmentStart
          const enter = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 14, stiffness: 80 } })
          const opacity = interpolate(Math.max(0, localFrame), [0, 15, 60, 780 / totalSegments], [0, 1, 1, 0])
          const barWidth = interpolate(enter, [0, 1], [0, 1])

          return (
            <div key={i} style={{ marginBottom: 20, opacity }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: textColor, fontSize: 20, fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>{cat.split(':')[0]}</span>
                <span style={{ color: accentColor, fontSize: 20, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{cat.split(':')[1]}</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${barWidth * 100}%`, background: accentColor, borderRadius: 4, transition: 'width 0.1s' }} />
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const BudgetPlannerSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  categories: { type: 'list' as const, label: 'Categories (format: Name:Amount)', itemType: 'text', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a1628' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#06b6d4' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  categories: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, categories, bgColor = '#0a1628', accentColor = '#06b6d4', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={BREAKDOWN_DURATION}>
        <BreakdownCard categories={categories} accentColor={accentColor} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
