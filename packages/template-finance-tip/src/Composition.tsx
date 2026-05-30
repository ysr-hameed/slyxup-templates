import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const ACCENT = '#10b981'
const BG = 'linear-gradient(135deg, #001a0a 0%, #003d1a 50%, #001a0a 100%)'

function Particles() {
  const frame = useCurrentFrame()
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {[0,1,2].map(i => {
        const x = 20 + i * 30
        const y = 10 + interpolate(Math.sin(frame * 0.02 + i), [-1, 1], [0, 20])
        return (
          <div key={i} style={{
            position: 'absolute', left: `${x}%`, top: `${y}%`,
            width: 4, height: 4, borderRadius: '50%',
            background: ACCENT, opacity: 0.4,
            boxShadow: `0 0 8px ${ACCENT}`,
          }} />
        )
      })}
    </div>
  )
}

function TitleCard({ title }: { title: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 12, 70, 90], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 12], [0.85, 1])
  const y = interpolate(frame, [0, 12], [15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale}) translateY(${y}px)` }}>
        <span style={{ color: ACCENT, fontSize: 24, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Finance Tip
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 80, fontWeight: 800, fontFamily: 'system-ui, sans-serif', lineHeight: 1.15, margin: '16px 0 0', padding: '0 40px' }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function StatCard({ stat }: { stat: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 12, 50, 80], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 12], [0.4, 1])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <p style={{ color: ACCENT, fontSize: 120, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1, textShadow: `0 0 40px ${ACCENT}60` }}>
          {stat}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tip }: { tip: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 80 } })
  const opacity = interpolate(frame, [0, 12, 300, 330], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity, transform: `translateY(${slideY}px)`,
        maxWidth: 960,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 20, padding: '40px 48px 40px',
        backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)',
        margin: '0 40px',
      }}>
        <p style={{ color: '#ffffff', fontSize: 44, fontWeight: 500, lineHeight: 1.5, textAlign: 'center', fontFamily: 'Georgia, serif', margin: 0 }}>
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
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#001a0a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#10b981' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string; tip: string; stat?: string
  bgColor?: string; accentColor?: string; textColor?: string
  contentX?: number; contentY?: number
}> = ({ title, tip, stat, bgColor = '#001a0a', accentColor = '#10b981', textColor = '#ffffff', contentX = 0, contentY = 0 }) => {
  const frame = useCurrentFrame()
  const pulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.2, 0.5])
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 50%, ${accentColor}${Math.round(pulse * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
      }} />
      <Particles />
      <div style={{ transform: `translate(${contentX}px, ${contentY}px)`, width: '100%', height: '100%' }}>
        <Sequence from={0} durationInFrames={90}>
          <TitleCard title={title} />
        </Sequence>
        {stat ? (
          <Sequence from={90} durationInFrames={80}>
            <StatCard stat={stat} />
          </Sequence>
        ) : null}
        <Sequence from={90 + (stat ? 80 : 0)} durationInFrames={330}>
          <TipCard tip={tip} />
        </Sequence>
      </div>
    </AbsoluteFill>
  )
}
