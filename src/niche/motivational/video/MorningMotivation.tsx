import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const GREETING_DURATION = 90
const MESSAGE_DURATION = 210

function GreetingCard({ name, accentColor }: { name: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 60, 90], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.8, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Good Morning
        </span>
        <h1 style={{ color: accentColor, fontSize: 72, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2, padding: '0 40px' }}>
          {name}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function MessageCard({ message, textColor }: { message: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 180, 210], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 60px', maxWidth: 960 }}>
        <p style={{ color: textColor, fontSize: 48, fontWeight: 500, lineHeight: 1.4, textAlign: 'center', fontFamily: 'Georgia, serif', margin: 0 }}>
          {message}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const MorningMotivationSchema = {
  name: { type: 'text' as const, label: 'Name', required: true },
  message: { type: 'text' as const, label: 'Motivational Message', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f1729' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#fbbf24' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  name: string
  message: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ name, message, bgColor = '#0f1729', accentColor = '#fbbf24', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const sunGlow = interpolate(Math.sin(frame * 0.015), [-1, 1], [0.1, 0.4])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #1a1a3e 50%, ${bgColor} 100%)` }}>
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${accentColor}${Math.round(sunGlow * 100).toString(16).padStart(2, '0')} 0%, transparent 70%)` }} />
      <Sequence from={0} durationInFrames={GREETING_DURATION}>
        <GreetingCard name={name} accentColor={accentColor} />
      </Sequence>
      <Sequence from={GREETING_DURATION} durationInFrames={MESSAGE_DURATION}>
        <MessageCard message={message} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
