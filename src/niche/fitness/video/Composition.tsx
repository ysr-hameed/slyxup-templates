import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const EXERCISE_DURATION = 180
const TIP_DURATION = 720

function ExerciseCard({ exercise, duration, accentColor }: {
  exercise: string; duration?: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 10, stiffness: 90 } })
  const opacity = interpolate(frame, [0, 20, 140, 180], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.8, 1])

  const barProgress = interpolate(frame, [20, 140], [0, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
        padding: '0 40px',
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          fontFamily: 'system-ui, sans-serif',
        }}>
          Today's Exercise
        </span>
        <h1 style={{
          color: '#ffffff',
          fontSize: 72,
          fontWeight: 900,
          fontFamily: 'system-ui, sans-serif',
          margin: '20px 0 16px',
          lineHeight: 1.1,
        }}>
          {exercise}
        </h1>
        <div style={{
          height: 6,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 3,
          margin: '24px auto',
          maxWidth: 400,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${barProgress * 100}%`,
            background: accentColor,
            borderRadius: 3,
            transition: 'width 0.1s',
          }} />
        </div>
        {duration ? (
          <p style={{
            color: accentColor,
            fontSize: 28,
            fontWeight: 700,
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
          }}>
            {duration}
          </p>
        ) : null}
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tip, textColor, accentColor }: { tip: string; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 65 } })
  const opacity = interpolate(frame, [0, 25, 690, 720], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity,
        transform: `translateY(${slideY}px)`,
        padding: '0 50px',
        maxWidth: 980,
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: accentColor,
          borderRadius: 2,
        }} />
        <p style={{
          color: textColor,
          fontSize: 40,
          fontWeight: 450,
          lineHeight: 1.5,
          fontFamily: 'Georgia, serif',
          margin: 0,
          paddingLeft: 24,
          textAlign: 'left',
        }}>
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
  exercise: string
  tip: string
  duration?: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ exercise, tip, duration, bgColor = '#1a0a0a', accentColor = '#f97316', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const glowIntensity = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.1, 0.3])

  return (
    <AbsoluteFill style={{
      background: bgColor,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 80% 20%, ${accentColor}${Math.round(glowIntensity * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
      }} />
      <Sequence from={0} durationInFrames={EXERCISE_DURATION}>
        <ExerciseCard exercise={exercise} duration={duration} accentColor={accentColor} />
      </Sequence>
      <Sequence from={EXERCISE_DURATION} durationInFrames={TIP_DURATION}>
        <TipCard tip={tip} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
