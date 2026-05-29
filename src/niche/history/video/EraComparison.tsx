import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 120
const COMPARE_DURATION = 330

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Era Comparison
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 52, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2 }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function ComparisonBars({ era1, era2, feature1, feature2, textColor, accentColor }: {
  era1: string; era2: string; feature1: string; feature2: string
  textColor: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter1 = spring({ frame, fps, config: { damping: 12, stiffness: 70 } })
  const bar1 = interpolate(enter1, [0, 1], [0, 1])
  const bar2 = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 70 } })
  const bar2W = interpolate(bar2, [0, 1], [0, 0.7])
  const opacity = interpolate(frame, [0, 25, 290, 330], [0, 1, 1, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 50px' }}>
      <div style={{ width: '100%', maxWidth: 800, opacity }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
          <span style={{ color: accentColor, fontSize: 28, fontWeight: 800, fontFamily: 'system-ui, sans-serif' }}>{era1}</span>
          <span style={{ color: textColor, fontSize: 28, fontWeight: 800, fontFamily: 'system-ui, sans-serif' }}>{era2}</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', margin: '0 0 8px' }}>{feature1}</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ flex: bar1, height: 28, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`, borderRadius: 14, transition: 'flex 0.3s' }} />
            <div style={{ flex: bar2W, height: 28, background: `linear-gradient(90deg, ${textColor}, ${textColor}60)`, borderRadius: 14 }} />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', margin: '0 0 8px' }}>{feature2}</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ flex: bar2W, height: 28, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`, borderRadius: 14 }} />
            <div style={{ flex: bar1, height: 28, background: `linear-gradient(90deg, ${textColor}, ${textColor}60)`, borderRadius: 14 }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function EraLabels({ era1, era2, accentColor, textColor }: { era1: string; era2: string; accentColor: string; textColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, display: 'flex', gap: 60, alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: accentColor, margin: '0 auto 12px' }} />
          <span style={{ color: accentColor, fontSize: 20, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{era1}</span>
        </div>
        <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: textColor, margin: '0 auto 12px' }} />
          <span style={{ color: textColor, fontSize: 20, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{era2}</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const EraComparisonSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  era1: { type: 'text' as const, label: 'Era 1', required: true },
  era2: { type: 'text' as const, label: 'Era 2', required: true },
  feature1: { type: 'text' as const, label: 'Feature 1', required: true },
  feature2: { type: 'text' as const, label: 'Feature 2', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f59e0b' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#94a3b8' },
}

export const Composition: React.FC<{
  title: string
  era1: string
  era2: string
  feature1: string
  feature2: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, era1, era2, feature1, feature2, bgColor = '#0a0a1a', accentColor = '#f59e0b', textColor = '#94a3b8' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 450], [0, 360])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #1a1a2e 100%)` }}>
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', border: `1px solid ${accentColor}08`, top: '10%', right: '10%', transform: `rotate(${swirl}deg)` }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={60}>
        <EraLabels era1={era1} era2={era2} accentColor={accentColor} textColor={textColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION + 60} durationInFrames={COMPARE_DURATION}>
        <ComparisonBars era1={era1} era2={era2} feature1={feature1} feature2={feature2} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
