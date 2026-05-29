import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 150
const YEAR_DURATION = 150
const IMPACT_DURATION = 150

function TitleCard({ invention, inventor, accentColor }: { invention: string; inventor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)`, padding: '0 40px' }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Invention Story
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 60, fontWeight: 900, fontFamily: 'Georgia, serif', margin: '16px 0 0', lineHeight: 1.1 }}>
          {invention}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: '12px 0 0' }}>
          by {inventor}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function YearCard({ year, accentColor }: { year: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 8, stiffness: 100 } })
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.5, 1])
  const glow = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.4, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <div style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: `4px solid ${accentColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 60px ${accentColor}${Math.floor(glow * 30).toString(16).padStart(2, '0')}`,
        }}>
          <span style={{ color: accentColor, fontSize: 56, fontWeight: 900, fontFamily: 'system-ui, sans-serif' }}>{year}</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function ArtifactCard({ textColor, accentColor }: { textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 55 } })
  const opacity = interpolate(frame, [0, 25, 110, 150], [0, 1, 1, 0])
  const slideX = interpolate(enter, [0, 1], [20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateX(${slideX}px)`, padding: '0 60px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${accentColor}15, transparent)`,
          border: `1px solid ${accentColor}30`,
          borderRadius: 16,
          padding: '36px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 4,
            height: '100%',
            background: accentColor,
          }} />
          <div style={{ color: textColor, fontSize: 26, fontWeight: 300, fontFamily: 'Georgia, serif', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
            A revolutionary invention that changed the course of history
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function ImpactCard({ impact, accentColor, textColor }: { impact: string; accentColor: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [25, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, textAlign: 'center', padding: '0 60px', maxWidth: 900 }}>
        <span style={{ color: accentColor, fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 16 }}>
          Lasting Impact
        </span>
        <p style={{ color: textColor, fontSize: 36, fontWeight: 500, fontFamily: 'Georgia, serif', margin: '16px 0 0', lineHeight: 1.4 }}>
          {impact}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const InventionStorySchema = {
  invention: { type: 'text' as const, label: 'Invention Name', required: true },
  inventor: { type: 'text' as const, label: 'Inventor', required: true },
  year: { type: 'text' as const, label: 'Year', required: true },
  impact: { type: 'text' as const, label: 'Impact', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1c1108' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#d4a574' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#f5e6d3' },
}

export const Composition: React.FC<{
  invention: string
  inventor: string
  year: string
  impact: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ invention, inventor, year, impact, bgColor = '#1c1108', accentColor = '#d4a574', textColor = '#f5e6d3' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 600], [0, 360])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #2a1a0a 50%, ${bgColor} 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', border: `2px solid ${accentColor}08`, top: '5%', left: '20%', transform: `rotate(${swirl}deg)` }} />
      <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', border: `1px solid ${accentColor}06`, bottom: '5%', right: '10%', transform: `rotate(${-swirl}deg)` }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard invention={invention} inventor={inventor} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={YEAR_DURATION}>
        <YearCard year={year} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION + YEAR_DURATION} durationInFrames={IMPACT_DURATION}>
        <ArtifactCard textColor={textColor} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION + YEAR_DURATION + IMPACT_DURATION} durationInFrames={IMPACT_DURATION}>
        <ImpactCard impact={impact} accentColor={accentColor} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
