import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 90
const FACT_DURATION = 120

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 60, 90], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Quick Facts
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 52, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2 }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function FactCard({ fact, index, textColor, accentColor }: { fact: string; index: number; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 100 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [50, 0])

  const barH = interpolate(enter, [0, 1], [0, 100])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #0a0a1a, #16213e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', opacity }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Fact {index + 1}
        </span>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        opacity,
        transform: `translateY(${slideY}px)`,
        padding: '0 60px',
        maxWidth: 900,
      }}>
        <div style={{
          width: 6,
          height: 120,
          borderRadius: 3,
          background: `${accentColor}30`,
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${barH}%`,
            background: accentColor,
            borderRadius: 3,
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{
            color: textColor,
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.4,
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
          }}>
            {fact}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function OutroCard({ accentColor }: { accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 15, 30, 60], [0, 1, 1, 0])
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.6, 1])

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(135deg, #0a0a1a, #16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: accentColor,
              opacity: pulse,
            }} />
          ))}
        </div>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Stay Curious
        </span>
      </div>
    </AbsoluteFill>
  )
}

export const QuickFactsSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  fact1: { type: 'text' as const, label: 'Fact 1', required: true },
  fact2: { type: 'text' as const, label: 'Fact 2', required: true },
  fact3: { type: 'text' as const, label: 'Fact 3', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#6366f1' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  fact1: string
  fact2: string
  fact3: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, fact1, fact2, fact3, bgColor = '#0a0a1a', accentColor = '#6366f1', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 450], [0, 360])
  const facts = [fact1, fact2, fact3]

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', border: `1px solid ${accentColor}10`, top: '15%', left: '20%', transform: `rotate(${swirl}deg)` }} />
      <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', border: `1px solid ${accentColor}08`, bottom: '10%', right: '10%', transform: `rotate(${-swirl}deg)` }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      {facts.map((fact, i) => (
        <Sequence
          key={i}
          from={TITLE_DURATION + i * FACT_DURATION}
          durationInFrames={FACT_DURATION}
        >
          <FactCard fact={fact} index={i} textColor={textColor} accentColor={accentColor} />
        </Sequence>
      ))}
      <Sequence from={TITLE_DURATION + facts.length * FACT_DURATION} durationInFrames={60}>
        <OutroCard accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
