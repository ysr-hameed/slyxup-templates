import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 150
const PILLAR_DURATION = 150
const RESULT_DURATION = 150

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)`, padding: '0 40px' }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Content Strategy
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 56, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2 }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function PillarCard({ pillar, index, accentColor, textColor }: { pillar: string; index: number; accentColor: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const slideX = interpolate(enter, [0, 1], [index === 0 ? -30 : index === 2 ? 30 : 0, 0])
  const scale = interpolate(enter, [0, 1], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        alignItems: 'center',
      }}>
        <div style={{
          opacity,
          transform: `translateX(${slideX}px) scale(${scale})`,
          background: index === 1 ? accentColor : 'rgba(255,255,255,0.05)',
          border: `1px solid ${index === 1 ? 'transparent' : `${accentColor}30`}`,
          borderRadius: 16,
          padding: '28px 24px',
          textAlign: 'center',
          flex: 1,
          maxWidth: 240,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: index === 1 ? 'rgba(0,0,0,0.2)' : `${accentColor}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <span style={{ color: index === 1 ? '#000' : accentColor, fontSize: 16, fontWeight: 800, fontFamily: 'system-ui, sans-serif' }}>{index + 1}</span>
          </div>
          <p style={{ color: index === 1 ? '#000' : textColor, fontSize: 18, fontWeight: 600, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.3 }}>{pillar}</p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function NodeConnection({ textColor }: { textColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 30, 110, 150], [0, 1, 1, 0])
  const pulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.3, 0.8])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, padding: '0 60px' }}>
        <p style={{ color: textColor, fontSize: 28, fontWeight: 300, fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: '0 0 24px', lineHeight: 1.4 }}>
          Connected pillars drive results
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: textColor,
              opacity: pulse,
            }} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const ContentStrategySchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  pillar1: { type: 'text' as const, label: 'Pillar 1', required: true },
  pillar2: { type: 'text' as const, label: 'Pillar 2', required: true },
  pillar3: { type: 'text' as const, label: 'Pillar 3', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#a855f7' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  pillar1: string
  pillar2: string
  pillar3: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, pillar1, pillar2, pillar3, bgColor = '#0f0a1a', accentColor = '#a855f7', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 600], [0, 360])
  const pillars = [pillar1, pillar2, pillar3]

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #1a1a2e 100%)` }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: `1px solid ${accentColor}08`, top: '15%', left: '25%', transform: `rotate(${swirl}deg)` }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: `1px solid ${accentColor}06`, bottom: '10%', right: '15%', transform: `rotate(${-swirl}deg)` }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={TITLE_DURATION}>
        <NodeConnection textColor={textColor} />
      </Sequence>
      {pillars.map((pillar, i) => (
        <Sequence
          key={i}
          from={TITLE_DURATION + TITLE_DURATION + i * PILLAR_DURATION}
          durationInFrames={PILLAR_DURATION}
        >
          <PillarCard pillar={pillar} index={i} accentColor={accentColor} textColor={textColor} />
        </Sequence>
      ))}
      <Sequence from={TITLE_DURATION + TITLE_DURATION + PILLAR_DURATION * 3} durationInFrames={RESULT_DURATION}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '0 60px' }}>
            <span style={{ color: accentColor, fontSize: 20, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
              Ready to Execute
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}
