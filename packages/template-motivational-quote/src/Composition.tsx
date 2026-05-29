import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion'

const GRADIENT_COLORS = ['#0f0c29', '#302b63', '#24243e']

function Background() {
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${GRADIENT_COLORS.join(', ')})`,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05) 0%, transparent 60%)',
      }} />
    </AbsoluteFill>
  )
}

function QuoteText({ quote, color }: { quote: string; color: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = spring({ frame, fps, config: { damping: 14, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20], [0, 1])

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 60px',
      opacity,
      transform: `scale(${interpolate(progress, [0, 1], [0.9, 1])}) translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
    }}>
      <p style={{
        color,
        fontSize: 56,
        fontWeight: 700,
        lineHeight: 1.3,
        textAlign: 'center',
        fontFamily: 'Georgia, "Times New Roman", serif',
        textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        margin: 0,
      }}>
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

function AuthorText({ author }: { author: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [60, 90], [0, 1])
  const y = interpolate(frame, [60, 90], [10, 0])

  return (
    <div style={{
      position: 'absolute',
      bottom: 120,
      left: 0,
      right: 0,
      textAlign: 'center',
      opacity,
      transform: `translateY(${y}px)`,
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: 28,
        fontFamily: 'system-ui, sans-serif',
        letterSpacing: 2,
        margin: 0,
      }}>
        — {author}
      </p>
    </div>
  )
}

export const MotivationalSchema = {
  quote: { type: 'text' as const, label: 'Quote', required: true },
  author: { type: 'text' as const, label: 'Author', required: true },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  quote: string
  author: string
  textColor?: string
}> = ({ quote, author, textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={0} durationInFrames={150}>
        <QuoteText quote={quote} color={textColor} />
      </Sequence>
      <Sequence from={60} durationInFrames={90}>
        <AuthorText author={author} />
      </Sequence>
    </AbsoluteFill>
  )
}
