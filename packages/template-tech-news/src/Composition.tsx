import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const ACCENT = '#58a6ff'
const BG = 'linear-gradient(135deg, #0a0e1a 0%, #161b22 50%, #0a0e1a 100%)'
const HEADLINE_DURATION = 120
const SUMMARY_DURATION = 480

function CodeBackground() {
  const frame = useCurrentFrame()
  const scroll = interpolate(frame, [0, 600], [0, -300])
  const lines = [
    '{ "trend": "AI", "impact": "high" }',
    'const future = await predict();',
    '<Transformer model={gpt} />',
    'npm install @ai/sdk@latest',
    'git commit -m "update"',
    'SELECT * FROM innovations;',
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.1, transform: `translateY(${scroll}px)` }}>
      {[...lines, ...lines].map((line, i) => (
        <p key={i} style={{ color: ACCENT, fontSize: 18, fontFamily: '"JetBrains Mono", monospace', margin: '20px 40px', whiteSpace: 'nowrap' }}>
          {line}
        </p>
      ))}
    </div>
  )
}

function HeaderTag() {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 10], [0, 1])
  return (
    <div style={{ position: 'absolute', top: 60, left: 60, opacity, display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ background: ACCENT, color: '#000', fontSize: 14, fontWeight: 700, padding: '6px 16px', borderRadius: 6, fontFamily: 'system-ui, sans-serif' }}>
        BREAKING
      </span>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontFamily: 'system-ui, sans-serif' }}>
        Tech News
      </span>
    </div>
  )
}

function HeadlineCard({ headline }: { headline: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 100 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)`, padding: '0 60px' }}>
        <h1 style={{ color: '#ffffff', fontSize: 80, fontWeight: 800, fontFamily: 'system-ui, sans-serif', lineHeight: 1.15, margin: 0 }}>
          {headline}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function SummaryCard({ summary, source }: { summary: string; source?: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 15, 450, 480], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [20, 0])
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 60px', maxWidth: 960, textAlign: 'center' }}>
        <p style={{ color: '#ffffff', fontSize: 48, fontWeight: 400, lineHeight: 1.5, fontFamily: 'Georgia, serif', margin: 0 }}>
          {summary}
        </p>
        {source ? (
          <span style={{ display: 'inline-block', marginTop: 40, padding: '8px 20px', background: 'rgba(255,255,255,0.06)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
            <span style={{ color: ACCENT, fontSize: 18, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
              — {source}
            </span>
          </span>
        ) : null}
      </div>
    </AbsoluteFill>
  )
}

export const TechNewsSchema = {
  headline: { type: 'text' as const, label: 'Headline', required: true },
  summary: { type: 'text' as const, label: 'Summary', required: true },
  source: { type: 'text' as const, label: 'Source', required: false },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0d1117' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#58a6ff' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  headline: string; summary: string; source?: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ headline, summary, source, bgColor = '#0d1117', accentColor = '#58a6ff', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #161b22 50%, ${bgColor} 100%)` }}>
      <CodeBackground />
      <Sequence from={0} durationInFrames={HEADLINE_DURATION}>
        <AbsoluteFill>
          <HeaderTag />
          <HeadlineCard headline={headline} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={HEADLINE_DURATION} durationInFrames={SUMMARY_DURATION}>
        <SummaryCard summary={summary} source={source} />
      </Sequence>
    </AbsoluteFill>
  )
}
