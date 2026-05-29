import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const HEADLINE_DURATION = 210
const SUMMARY_DURATION = 690

function HeaderTag({ accentColor }: { accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 15], [0, 1])
  const slideY = interpolate(frame, [0, 15], [-10, 0])

  return (
    <div style={{
      position: 'absolute',
      top: 80,
      left: 60,
      opacity,
      transform: `translateY(${slideY}px)`,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      <span style={{
        background: accentColor,
        color: '#000',
        fontSize: 14,
        fontWeight: 700,
        padding: '6px 14px',
        borderRadius: 4,
        fontFamily: 'system-ui, sans-serif',
      }}>
        BREAKING
      </span>
      <span style={{
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
        fontFamily: 'system-ui, sans-serif',
      }}>
        Tech News
      </span>
    </div>
  )
}

function HeadlineCard({ headline, accentColor }: { headline: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 80 } })
  const opacity = interpolate(frame, [0, 20, 180, 210], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [40, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)`, padding: '0 60px' }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: 60,
          fontWeight: 800,
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.2,
          margin: 0,
        }}>
          {headline}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function SummaryCard({ summary, source, textColor, accentColor }: {
  summary: string; source?: string; textColor: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 25, 660, 690], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [25, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity,
        transform: `translateY(${slideY}px)`,
        padding: '0 60px',
        maxWidth: 960,
        textAlign: 'center',
      }}>
        <p style={{
          color: textColor,
          fontSize: 40,
          fontWeight: 400,
          lineHeight: 1.5,
          fontFamily: 'Georgia, serif',
          margin: 0,
        }}>
          {summary}
        </p>
        {source ? (
          <p style={{
            color: accentColor,
            fontSize: 20,
            fontWeight: 600,
            marginTop: 40,
            fontFamily: 'system-ui, sans-serif',
          }}>
            — {source}
          </p>
        ) : null}
      </div>
    </AbsoluteFill>
  )
}

function CodeBackground({ accentColor }: { accentColor: string }) {
  const frame = useCurrentFrame()
  const scroll = interpolate(frame, [0, 900], [0, -200])

  const lines = [
    '{ "trend": "AI", "impact": "high" }',
    'const future = await predict();',
    '<Transformer model={gpt} />',
    'print(f"hello, world {version}")',
    'npm install @ai/sdk@latest',
    '>>> tensor.shape = (768, 768)',
    'git commit -m "update model"',
    'SELECT * FROM innovations;',
    'docker run --gpus all',
  ]

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      opacity: 0.08,
      transform: `translateY(${scroll}px)`,
    }}>
      {lines.map((line, i) => (
        <p key={i} style={{
          color: accentColor,
          fontSize: 18,
          fontFamily: '"JetBrains Mono", monospace',
          margin: '16px 40px',
          whiteSpace: 'nowrap',
          opacity: interpolate(frame, [0, 900], [0.3, 0.8]),
        }}>
          {line}
        </p>
      ))}
      {lines.map((line, i) => (
        <p key={`b-${i}`} style={{
          color: accentColor,
          fontSize: 18,
          fontFamily: '"JetBrains Mono", monospace',
          margin: '16px 40px',
          whiteSpace: 'nowrap',
          opacity: 0.5,
        }}>
          {line}
        </p>
      ))}
    </div>
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
  headline: string
  summary: string
  source?: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ headline, summary, source, bgColor = '#0d1117', accentColor = '#58a6ff', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <CodeBackground accentColor={accentColor} />
      <Sequence from={0} durationInFrames={HEADLINE_DURATION}>
        <AbsoluteFill>
          <HeaderTag accentColor={accentColor} />
          <HeadlineCard headline={headline} accentColor={accentColor} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={HEADLINE_DURATION} durationInFrames={SUMMARY_DURATION}>
        <SummaryCard summary={summary} source={source} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
