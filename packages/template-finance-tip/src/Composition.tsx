import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 120
const STAT_DURATION = 90
const TIP_DURATION = 690

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 100, 120], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])
  const y = interpolate(frame, [0, 20], [20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale}) translateY(${y}px)` }}>
        <span style={{
          color: accentColor,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontFamily: 'system-ui, sans-serif',
        }}>
          Finance Tip
        </span>
        <h1 style={{
          color: '#ffffff',
          fontSize: 64,
          fontWeight: 800,
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.2,
          margin: '24px 0 0',
          padding: '0 40px',
        }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function StatCard({ stat, accentColor }: { stat: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 60, 90], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.5, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <p style={{
          color: accentColor,
          fontSize: 96,
          fontWeight: 900,
          fontFamily: 'system-ui, sans-serif',
          margin: 0,
          lineHeight: 1,
        }}>
          {stat}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tip, textColor }: { tip: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 660, 690], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity,
        transform: `translateY(${slideY}px)`,
        padding: '0 60px',
        maxWidth: 960,
      }}>
        <p style={{
          color: textColor,
          fontSize: 44,
          fontWeight: 500,
          lineHeight: 1.5,
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          margin: 0,
        }}>
          {tip}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const FinanceTipSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  tip: { type: 'text' as const, label: 'Tip', required: true },
  stat: { type: 'text' as const, label: 'Stat/Number', required: false },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a1628' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#10b981' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  tip: string
  stat?: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, tip, stat, bgColor = '#0a1628', accentColor = '#10b981', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const pulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.3, 0.6])

  return (
    <AbsoluteFill style={{
      background: bgColor,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 50%, ${accentColor}${Math.round(pulse * 100).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
      }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      {stat ? (
        <Sequence from={TITLE_DURATION} durationInFrames={STAT_DURATION}>
          <StatCard stat={stat} accentColor={accentColor} />
        </Sequence>
      ) : null}
      <Sequence
        from={TITLE_DURATION + (stat ? STAT_DURATION : 0)}
        durationInFrames={TIP_DURATION}
      >
        <TipCard tip={tip} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
