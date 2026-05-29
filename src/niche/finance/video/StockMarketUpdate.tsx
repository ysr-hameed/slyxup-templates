import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const HEADER_DURATION = 120
const CHANGE_DURATION = 180
const INSIGHT_DURATION = 600

function HeaderCard({ symbol, accentColor }: { symbol: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Market Update
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 80, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '12px 0 0', lineHeight: 1 }}>
          ${symbol}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function ChangeCard({ change, accentColor }: { change: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 150, 180], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.5, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: accentColor, fontSize: 100, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1 }}>
          {change}
        </span>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, fontWeight: 600, marginTop: 12, fontFamily: 'system-ui, sans-serif' }}>
          Today's Change
        </p>
      </div>
    </AbsoluteFill>
  )
}

function InsightCard({ insight, textColor }: { insight: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 25, 560, 600], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 50px', maxWidth: 960, textAlign: 'center' }}>
        <p style={{ color: textColor, fontSize: 40, fontWeight: 400, lineHeight: 1.5, fontFamily: 'Georgia, serif', margin: 0 }}>
          {insight}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const StockMarketUpdateSchema = {
  symbol: { type: 'text' as const, label: 'Stock Symbol', required: true },
  change: { type: 'text' as const, label: 'Change (e.g. +2.3%)', required: true },
  insight: { type: 'text' as const, label: 'Market Insight', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0f1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#22c55e' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  symbol: string
  change: string
  insight: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ symbol, change, insight, bgColor = '#0a0f1a', accentColor = '#22c55e', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const gridMove = interpolate(frame, [0, 900], [0, -30])

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, transform: `translateY(${gridMove}px)` }}>
        {Array.from({ length: 10 }).map((_, r) => (
          <div key={r} style={{ display: 'flex', gap: 40, marginBottom: 60 }}>
            {Array.from({ length: 6 }).map((_, c) => (
              <span key={c} style={{ color: accentColor, fontSize: 14, fontFamily: '"JetBrains Mono", monospace' }}>
                {Math.random().toFixed(2)}
              </span>
            ))}
          </div>
        ))}
      </div>
      <Sequence from={0} durationInFrames={HEADER_DURATION}>
        <HeaderCard symbol={symbol} accentColor={accentColor} />
      </Sequence>
      <Sequence from={HEADER_DURATION} durationInFrames={CHANGE_DURATION}>
        <ChangeCard change={change} accentColor={accentColor} />
      </Sequence>
      <Sequence from={HEADER_DURATION + CHANGE_DURATION} durationInFrames={INSIGHT_DURATION}>
        <InsightCard insight={insight} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
