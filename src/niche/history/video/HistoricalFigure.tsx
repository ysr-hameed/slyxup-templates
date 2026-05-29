import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const LABEL_DURATION = 150
const BIO_DURATION = 750

function LabelCard({ name, accentColor }: { name: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Historical Figure
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 68, fontWeight: 900, fontFamily: 'Georgia, serif', margin: '16px 0 0', lineHeight: 1.1 }}>
          {name}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function BioCard({ bio, textColor, accentColor }: { bio: string; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 55 } })
  const opacity = interpolate(frame, [0, 30, 710, 750], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [35, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 60px', maxWidth: 960, textAlign: 'center' }}>
        <div style={{ borderTop: `1px solid ${accentColor}50`, borderBottom: `1px solid ${accentColor}50`, padding: '32px 20px' }}>
          <p style={{ color: textColor, fontSize: 36, fontWeight: 400, lineHeight: 1.5, fontFamily: 'Georgia, serif', margin: 0, fontStyle: 'italic' }}>
            {bio}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const HistoricalFigureSchema = {
  name: { type: 'text' as const, label: 'Name', required: true },
  bio: { type: 'text' as const, label: 'Biography', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1c1108' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#d4a574' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#f5e6d3' },
}

export const Composition: React.FC<{
  name: string
  bio: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ name, bio, bgColor = '#1c1108', accentColor = '#d4a574', textColor = '#f5e6d3' }) => {
  const frame = useCurrentFrame()
  const noise = interpolate(frame % 4, [0, 3], [0, 0.03])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #2a1a0a 50%, ${bgColor} 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: noise, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px', pointerEvents: 'none' }} />
      <Sequence from={0} durationInFrames={LABEL_DURATION}>
        <LabelCard name={name} accentColor={accentColor} />
      </Sequence>
      <Sequence from={LABEL_DURATION} durationInFrames={BIO_DURATION}>
        <BioCard bio={bio} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
