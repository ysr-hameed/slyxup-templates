import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 60
const FACT_DURATION = 90
const BG = 'linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e)'

function TitleCard({ title }: { title: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 40, 60], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.8, 1])

  return (
    <AbsoluteFill style={{ background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{
        color: '#ffffff',
        fontSize: 72,
        fontWeight: 800,
        fontFamily: 'system-ui, sans-serif',
        opacity,
        transform: `scale(${scale})`,
        textAlign: 'center',
        padding: 40,
      }}>
        {title}
      </h1>
    </AbsoluteFill>
  )
}

function FactCard({ fact, index }: { fact: string; index: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 100 } })
  const opacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [60, 0])

  return (
    <AbsoluteFill style={{ background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity,
        transform: `translateY(${slideY}px)`,
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 3,
          fontFamily: 'system-ui, sans-serif',
          textTransform: 'uppercase',
        }}>
          Fact {index + 1}
        </span>
      </div>
      <div style={{
        padding: '0 60px',
        opacity,
        transform: `translateY(${slideY}px)`,
      }}>
        <p style={{
          color: '#ffffff',
          fontSize: 40,
          fontWeight: 500,
          lineHeight: 1.4,
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          margin: 0,
        }}>
          {fact}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const AiFactsSchema = {
  title: { type: 'text' as const, label: 'Title', required: false },
  facts: { type: 'list' as const, label: 'Facts', itemType: 'text' as const, required: true },
}

export const Composition: React.FC<{
  title?: string
  facts: string[]
}> = ({ title, facts }) => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      {title ? (
        <Sequence from={0} durationInFrames={TITLE_DURATION} name="Title">
          <TitleCard title={title} />
        </Sequence>
      ) : null}
      {facts.map((fact, i) => (
        <Sequence
          key={i}
          from={title ? TITLE_DURATION + i * FACT_DURATION : i * FACT_DURATION}
          durationInFrames={FACT_DURATION}
        >
          <FactCard fact={fact} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}
