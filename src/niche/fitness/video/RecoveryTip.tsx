import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const INTRO_DURATION = 120
const GAUGE_DURATION = 210
const TIP_DURATION = 120

function CircularGauge({ level, color, size = 320 }: { level: number; color: string; size?: number }) {
  const r = 130
  const stroke = 18
  const circ = 2 * Math.PI * r
  const progress = Math.min(level / 100, 1)
  const offset = circ * (1 - progress)

  const segments = [
    { end: 33, color: '#22c55e' },
    { end: 66, color: '#eab308' },
    { end: 100, color: '#ef4444' },
  ]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 8px ${color}44)` }}
      />
      <text x={size / 2} y={size / 2 - 10} textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize={56} fontWeight={900} fontFamily="system-ui, sans-serif">
        {level}%
      </text>
      <text x={size / 2} y={size / 2 + 40} textAnchor="middle" dominantBaseline="central"
        fill="rgba(255,255,255,0.4)" fontSize={16} fontWeight={600} fontFamily="system-ui, sans-serif">
        Recovery
      </text>
    </svg>
  )
}

function IntroCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 16, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Recovery
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 64, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.1 }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function GaugeCard({ recoveryTime, level, accentColor }: {
  recoveryTime: string; level: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 180, 210], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.5, 1])

  const levelNum = Math.min(Math.max(parseInt(level) || 50, 0), 100)
  const animLevel = interpolate(frame, [20, 170], [0, levelNum])

  const gaugeColor =
    animLevel > 66 ? '#22c55e' :
    animLevel > 33 ? '#eab308' :
    '#ef4444'

  const bodyParts = [
    { label: 'Upper Body', x: 30, y: 35 },
    { label: 'Core', x: 50, y: 50 },
    { label: 'Lower Body', x: 70, y: 60 },
  ]

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `scale(${scale})`, textAlign: 'center' }}>
        <CircularGauge level={Math.round(animLevel)} color={gaugeColor} />
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 24 }}>
          <div style={{
            padding: '12px 20px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, fontFamily: 'system-ui, sans-serif', display: 'block' }}>
              Est. Recovery
            </span>
            <span style={{ color: accentColor, fontSize: 28, fontWeight: 800, fontFamily: 'system-ui, sans-serif' }}>
              {recoveryTime}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 20, opacity: interpolate(animLevel, [10, 100], [0, 1]) }}>
          {bodyParts.map((part, i) => {
            const partDelay = 40 + i * 30
            const partOp = interpolate(Math.max(0, frame - partDelay), [0, 20], [0, 1])
            return (
              <div key={i} style={{
                textAlign: 'center', opacity: partOp,
                transform: `translateY(${interpolate(partOp, [0, 1], [10, 0])}px)`,
              }}>
                <div style={{
                  width: 8, height: 30, borderRadius: '4px 4px 0 0',
                  background: animLevel > 66 - i * 15 ? accentColor : 'rgba(255,255,255,0.1)',
                  margin: '0 auto 6px',
                  transition: 'background 0.2s',
                }} />
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
                  {part.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tip, accentColor, textColor }: { tip: string; accentColor: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 65 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [25, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity, transform: `translateY(${slideY}px)`,
        padding: '0 60px', maxWidth: 920, textAlign: 'center',
      }}>
        <span style={{
          color: accentColor, fontSize: 18, fontWeight: 700,
          letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif',
          display: 'block', marginBottom: 16,
        }}>
          Recovery Tip
        </span>
        <p style={{ color: textColor, fontSize: 38, fontWeight: 450, lineHeight: 1.4, fontFamily: 'Georgia, serif', margin: 0 }}>
          {tip}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const RecoveryTipSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  tip: { type: 'text' as const, label: 'Recovery Tip', required: true },
  recoveryTime: { type: 'text' as const, label: 'Recovery Time', required: true },
  level: { type: 'text' as const, label: 'Recovery Level (0-100)', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a1420' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#06b6d4' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string; tip: string; recoveryTime: string; level: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ title, tip, recoveryTime, level, bgColor = '#0a1420', accentColor = '#06b6d4', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const glow = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.06, 0.18])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #0f2235 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${accentColor}${Math.round(glow * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)` }} />
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION} durationInFrames={GAUGE_DURATION}>
        <GaugeCard recoveryTime={recoveryTime} level={level} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION + GAUGE_DURATION} durationInFrames={TIP_DURATION}>
        <TipCard tip={tip} accentColor={accentColor} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
