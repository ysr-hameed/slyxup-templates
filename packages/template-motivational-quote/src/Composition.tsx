import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion'

const GLOW_PURPLE = '#7c3aed'
const BG = 'linear-gradient(135deg, #1a0030 0%, #4a0080 50%, #1a0030 100%)'

function GlowBackground() {
  const frame = useCurrentFrame()
  const pulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.3, 0.6])
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 40%, ${GLOW_PURPLE}${Math.round(pulse * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
      }} />
    </AbsoluteFill>
  )
}

function QuoteText({ quote, color }: { quote: string; color: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = spring({ frame, fps, config: { damping: 16, stiffness: 90 } })
  const opacity = interpolate(frame, [0, 12], [0, 1])

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 60px', opacity,
      transform: `scale(${interpolate(progress, [0, 1], [0.92, 1])}) translateY(${interpolate(progress, [0, 1], [15, 0])}px)`,
    }}>
      <p style={{
        color, fontSize: 88, fontWeight: 800, lineHeight: 1.15,
        textAlign: 'center', fontFamily: 'Georgia, serif',
        textShadow: '0 4px 30px rgba(124,58,237,0.4)',
        margin: 0, maxWidth: 960,
      }}>
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

function AuthorText({ author }: { author: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [30, 50], [0, 1])
  const y = interpolate(frame, [30, 50], [8, 0])

  return (
    <div style={{
      position: 'absolute', bottom: 100, left: 0, right: 0,
      textAlign: 'center', opacity, transform: `translateY(${y}px)`,
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.75)', fontSize: 36,
        fontFamily: 'system-ui, sans-serif', letterSpacing: 3,
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
  contentX?: number; contentY?: number
}> = ({ quote, author, textColor = '#ffffff', contentX = 0, contentY = 0 }) => {
  return (
    <AbsoluteFill>
      <GlowBackground />
      <div style={{ transform: `translate(${contentX}px, ${contentY}px)`, width: '100%', height: '100%' }}>
        <Sequence from={0} durationInFrames={90}>
          <QuoteText quote={quote} color={textColor} />
        </Sequence>
        <Sequence from={30} durationInFrames={60}>
          <AuthorText author={author} />
        </Sequence>
      </div>
    </AbsoluteFill>
  )
}
