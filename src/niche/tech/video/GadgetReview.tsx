import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const NAME_DURATION = 150
const FEATURES_DURATION = 750

function NameCard({ name, tagline, accentColor }: { name: string; tagline: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Gadget Review
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 64, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 8px', lineHeight: 1.1 }}>
          {name}
        </h1>
        <p style={{ color: accentColor, fontSize: 24, fontWeight: 500, fontFamily: 'system-ui, sans-serif', margin: 0, opacity: 0.8 }}>
          {tagline}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function FeaturesCard({ features, accentColor, textColor }: { features: string[]; accentColor: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
      <div style={{ width: '100%', maxWidth: 800 }}>
        {features.map((feat, i) => {
          const featStart = i * 150
          const localFrame = frame - featStart
          const enter = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 12, stiffness: 80 } })
          const opacity = interpolate(Math.max(0, localFrame), [0, 20, 120, 150], [0, 1, 1, 0])
          const slideX = interpolate(enter, [0, 1], [-30, 0])

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, opacity, transform: `translateX(${slideX}px)` }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
              <span style={{ color: textColor, fontSize: 26, fontWeight: 400, fontFamily: 'system-ui, sans-serif', lineHeight: 1.4 }}>{feat}</span>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const GadgetReviewSchema = {
  name: { type: 'text' as const, label: 'Product Name', required: true },
  tagline: { type: 'text' as const, label: 'Tagline', required: true },
  features: { type: 'list' as const, label: 'Features', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0d1117' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f97316' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  name: string
  tagline: string
  features: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ name, tagline, features, bgColor = '#0d1117', accentColor = '#f97316', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #161b22 100%)` }}>
      <Sequence from={0} durationInFrames={NAME_DURATION}>
        <NameCard name={name} tagline={tagline} accentColor={accentColor} />
      </Sequence>
      <Sequence from={NAME_DURATION} durationInFrames={FEATURES_DURATION}>
        <FeaturesCard features={features} accentColor={accentColor} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
