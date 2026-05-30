import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const ACCENT = '#3b82f6'
const TITLE_DURATION = 45
const FACT_DURATION = 75
const BG = 'linear-gradient(135deg, #000814 0%, #001d3d 50%, #000814 100%)'

function GridBackground() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `radial-gradient(${ACCENT}15 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      opacity: 0.5,
    }} />
  )
}

function TitleCard({ title }: { title: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 15, 30, 45], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 15], [0.8, 1])
  return (
    <AbsoluteFill style={{ background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: '#ffffff', fontSize: 88, fontWeight: 800, fontFamily: 'system-ui, sans-serif', opacity, transform: `scale(${scale})`, textAlign: 'center', padding: 40 }}>
        {title}
      </h1>
    </AbsoluteFill>
  )
}

function FactCard({ fact, index }: { fact: string; index: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 100 } })
  const opacity = interpolate(frame, [0, 10, 60, 75], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [40, 0])
  return (
    <AbsoluteFill style={{ background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', top: 80, left: 60,
        background: ACCENT, color: '#000', fontSize: 14, fontWeight: 700,
        padding: '6px 16px', borderRadius: 20, fontFamily: 'system-ui, sans-serif',
      }}>
        FACT {index + 1}
      </div>
      <div style={{ padding: '0 60px', opacity, transform: `translateY(${slideY}px)` }}>
        <p style={{ color: '#ffffff', fontSize: 52, fontWeight: 500, lineHeight: 1.4, textAlign: 'center', fontFamily: 'Georgia, serif', margin: 0 }}>
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
  title?: string; facts: string[]
}> = ({ title, facts }) => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <GridBackground />
      {title ? (
        <Sequence from={0} durationInFrames={TITLE_DURATION}>
          <TitleCard title={title} />
        </Sequence>
      ) : null}
      {facts.map((fact, i) => (
        <Sequence key={i} from={title ? TITLE_DURATION + i * FACT_DURATION : i * FACT_DURATION} durationInFrames={FACT_DURATION}>
          <FactCard fact={fact} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}
