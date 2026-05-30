import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const ACCENT = '#f97316'
const BG = 'linear-gradient(135deg, #1a0505 0%, #3d0a0a 50%, #1a0505 100%)'

function ExerciseCard({ exercise, duration }: { exercise: string; duration?: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 110 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.85, 1])
  const barProgress = interpolate(frame, [15, 100], [0, 1])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Today's Exercise
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 96, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 20px', lineHeight: 1.05 }}>
          {exercise}
        </h1>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, margin: '24px auto', maxWidth: 400, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${barProgress * 100}%`, background: ACCENT, borderRadius: 4, boxShadow: `0 0 12px ${ACCENT}` }} />
        </div>
        {duration ? (
          <p style={{ color: ACCENT, fontSize: 36, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
            {duration}
          </p>
        ) : null}
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tip }: { tip: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 75 } })
  const opacity = interpolate(frame, [0, 15, 420, 450], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [20, 0])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity, transform: `translateY(${slideY}px)`,
        padding: '0 50px', maxWidth: 980, textAlign: 'center', position: 'relative',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: ACCENT, borderRadius: 3, boxShadow: `0 0 10px ${ACCENT}` }} />
        <p style={{ color: '#ffffff', fontSize: 48, fontWeight: 450, lineHeight: 1.5, fontFamily: 'Georgia, serif', margin: 0, paddingLeft: 28, textAlign: 'left' }}>
          {tip}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const WorkoutTipSchema = {
  exercise: { type: 'text' as const, label: 'Exercise Name', required: true },
  tip: { type: 'text' as const, label: 'Tip/Description', required: true },
  duration: { type: 'text' as const, label: 'Duration/Reps', required: false },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1a0a0a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f97316' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  exercise: string; tip: string; duration?: string
  bgColor?: string; accentColor?: string; textColor?: string
  contentX?: number; contentY?: number
}> = ({ exercise, tip, duration, bgColor = '#1a0a0a', accentColor = '#f97316', textColor = '#ffffff', contentX = 0, contentY = 0 }) => {
  const frame = useCurrentFrame()
  const glowIntensity = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.15, 0.35])
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #3d0a0a 50%, ${bgColor} 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 20%, ${accentColor}${Math.round(glowIntensity * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)` }} />
      <div style={{ transform: `translate(${contentX}px, ${contentY}px)`, width: '100%', height: '100%' }}>
        <Sequence from={0} durationInFrames={120}>
          <ExerciseCard exercise={exercise} duration={duration} />
        </Sequence>
        <Sequence from={120} durationInFrames={450}>
          <TipCard tip={tip} />
        </Sequence>
      </div>
    </AbsoluteFill>
  )
}
