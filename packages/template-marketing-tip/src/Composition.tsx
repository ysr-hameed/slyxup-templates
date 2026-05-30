import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const ACCENT = '#a855f7'
const BG = '#0f0a1a'

function HookCard({ hook }: { hook: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scale = spring({ frame, fps, config: { damping: 10, stiffness: 100 } })
  const opacity = interpolate(frame, [0, 12, 60, 90], [0, 1, 1, 0])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <p style={{ color: ACCENT, fontSize: 24, fontWeight: 600, fontFamily: 'system-ui, sans-serif', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          Marketing Tip
        </p>
        <h1 style={{ color: '#ffffff', fontSize: 72, fontWeight: 800, fontFamily: 'system-ui, sans-serif', lineHeight: 1.15, margin: 0 }}>
          {hook}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function ResultCard({ result }: { result: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 12, 50, 80], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 12], [0.4, 1])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <p style={{ color: ACCENT, fontSize: 112, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1, textShadow: `0 0 50px ${ACCENT}50` }}>
          {result}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tip }: { tip: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 15, 380, 420], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [20, 0])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 40px', maxWidth: 960 }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '40px 36px', backdropFilter: 'blur(8px)',
        }}>
          <p style={{ color: '#ffffff', fontSize: 44, fontWeight: 450, lineHeight: 1.5, fontFamily: 'Georgia, serif', margin: 0 }}>
            {tip}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const MarketingTipSchema = {
  hook: { type: 'text' as const, label: 'Hook', required: true },
  tip: { type: 'text' as const, label: 'Tip', required: true },
  result: { type: 'text' as const, label: 'Expected Result', required: false },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#a855f7' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  hook: string; tip: string; result?: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ hook, tip, result, bgColor = '#0f0a1a', accentColor = '#a855f7', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 600], [0, 360])
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #1a0030 50%, ${bgColor} 100%)` }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', border: `2px solid ${accentColor}15`, top: '10%', left: '20%', transform: `rotate(${swirl}deg)` }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', border: `1px solid ${accentColor}10`, bottom: '15%', right: '15%', transform: `rotate(${-swirl}deg)` }} />
      <Sequence from={0} durationInFrames={90}>
        <HookCard hook={hook} />
      </Sequence>
      {result ? (
        <Sequence from={90} durationInFrames={80}>
          <ResultCard result={result} />
        </Sequence>
      ) : null}
      <Sequence from={90 + (result ? 80 : 0)} durationInFrames={420}>
        <TipCard tip={tip} />
      </Sequence>
    </AbsoluteFill>
  )
}
