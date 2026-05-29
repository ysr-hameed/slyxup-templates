import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const INTRO_DURATION = 120
const PROGRESS_DURATION = 210
const CELEBRATION_DURATION = 120

const RADIUS = 180
const STROKE = 24
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function CircularProgress({ progress, color, size = 400 }: { progress: number; color: string; size?: number }) {
  const offset = CIRCUMFERENCE * (1 - Math.min(progress, 1))
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={STROKE} />
      <circle
        cx={size / 2} cy={size / 2} r={RADIUS} fill="none"
        stroke={color} strokeWidth={STROKE} strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize={72} fontWeight={900} fontFamily="system-ui, sans-serif">
        {Math.round(progress * 100)}%
      </text>
    </svg>
  )
}

function IntroCard({ title, goal, accentColor }: { title: string; goal: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-20, 0])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Goal Progress
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 64, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 8px', lineHeight: 1.2 }}>
          {title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 28, fontWeight: 500, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
          {goal}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function ProgressCard({ current, target, accentColor }: { current: string; target: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 180, 210], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.6, 1])
  const currentNum = parseFloat(current.replace(/[^0-9.]/g, '')) || 0
  const targetNum = parseFloat(target.replace(/[^0-9.]/g, '')) || 100
  const ratio = targetNum > 0 ? Math.min(currentNum / targetNum, 1) : 0
  const progress = interpolate(frame, [20, 180], [0, ratio])
  const displayCount = interpolate(frame, [20, 180], [0, currentNum])
  const animVal = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 20, stiffness: 40 } })
  const milestonePop = interpolate(progress, [0.49, 0.5, 0.99, 1], [1, 1.15, 1.15, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale * milestonePop})` }}>
        <CircularProgress progress={progress} color={accentColor} />
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 60 }}>
          <div>
            <p style={{ color: accentColor, fontSize: 36, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1 }}>
              {Math.round(displayCount).toLocaleString()}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 600, fontFamily: 'system-ui, sans-serif', margin: '4px 0 0' }}>
              Current
            </p>
          </div>
          <div>
            <p style={{ color: '#ffffff', fontSize: 36, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1 }}>
              {target}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 600, fontFamily: 'system-ui, sans-serif', margin: '4px 0 0' }}>
              Target
            </p>
          </div>
        </div>
        <div style={{ marginTop: 16, opacity: interpolate(progress, [0.9, 1], [0, 1]) }}>
          <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>
            {progress >= 1 ? 'Goal reached!' : `${Math.round((1 - progress) * 100)}% to go`}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function CelebrationCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 8, stiffness: 50 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0, 1.2])
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * 360
    const dist = interpolate(frame, [0, 60], [0, 120 + Math.random() * 80])
    return { angle, dist, color: ['#ffd700', '#ff6b6b', '#48dbfb', '#ff9ff3'][i % 4] }
  })

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 12, height: 12,
          borderRadius: '50%',
          background: p.color,
          opacity,
          transform: `translate(${Math.cos(p.angle * Math.PI / 180) * p.dist}px, ${Math.sin(p.angle * Math.PI / 180) * p.dist}px)`,
        }} />
      ))}
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: accentColor, fontSize: 24, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Achievement Unlocked
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 72, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1 }}>
          {title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 28, fontWeight: 500, fontFamily: 'system-ui, sans-serif', marginTop: 12 }}>
          100% Complete
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const GoalVisualizerSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  goal: { type: 'text' as const, label: 'Goal', required: true },
  current: { type: 'text' as const, label: 'Current Value', required: true },
  target: { type: 'text' as const, label: 'Target Value', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f172a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#22c55e' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string; goal: string; current: string; target: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ title, goal, current, target, bgColor = '#0f172a', accentColor = '#22c55e', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const shimmer = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.05, 0.15])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #1a1a2e 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${accentColor}${Math.round(shimmer * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)` }} />
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroCard title={title} goal={goal} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION} durationInFrames={PROGRESS_DURATION}>
        <ProgressCard current={current} target={target} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION + PROGRESS_DURATION} durationInFrames={CELEBRATION_DURATION}>
        <CelebrationCard title={title} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
