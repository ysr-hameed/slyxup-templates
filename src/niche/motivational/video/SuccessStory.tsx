import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const LABEL_DURATION = 90
const STORY_DURATION = 210

function LabelCard({ label, accentColor }: { label: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 60, 90], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.7, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: accentColor, fontSize: 24, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Success Story
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 80, fontWeight: 900, fontFamily: 'Georgia, serif', margin: '20px 0 0', lineHeight: 1 }}>
          {label}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function StoryCard({ story, textColor }: { story: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 25, 180, 210], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [35, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 50px', maxWidth: 980, textAlign: 'center' }}>
        <div style={{ borderLeft: `4px solid ${textColor}40`, padding: '24px 32px' }}>
          <p style={{ color: textColor, fontSize: 40, fontWeight: 400, lineHeight: 1.5, fontFamily: 'Georgia, serif', margin: 0, fontStyle: 'italic' }}>
            &ldquo;{story}&rdquo;
          </p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const SuccessStorySchema = {
  label: { type: 'text' as const, label: 'Title/Label', required: true },
  story: { type: 'text' as const, label: 'Story', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#22c55e' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  label: string
  story: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ label, story, bgColor = '#0a0a1a', accentColor = '#22c55e', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const shimmer = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.05, 0.15])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #1a1a2e 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 30%, ${accentColor}${Math.round(shimmer * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)` }} />
      <Sequence from={0} durationInFrames={LABEL_DURATION}>
        <LabelCard label={label} accentColor={accentColor} />
      </Sequence>
      <Sequence from={LABEL_DURATION} durationInFrames={STORY_DURATION}>
        <StoryCard story={story} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
