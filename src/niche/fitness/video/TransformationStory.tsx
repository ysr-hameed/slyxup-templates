import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const INTRO_DURATION = 120
const TRANSFORM_DURATION = 360
const RESULT_DURATION = 120

function IntroCard({ personName, accentColor }: { personName: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 16, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Transformation Story
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 72, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1 }}>
          {personName}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, fontWeight: 500, fontFamily: 'system-ui, sans-serif', marginTop: 12 }}>
          The journey
        </p>
      </div>
    </AbsoluteFill>
  )
}

function TransformCard({ before, after, duration, accentColor }: {
  before: string; after: string; duration: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 20, 330, 360], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [25, 0])

  const beforeNum = parseFloat(before.replace(/[^0-9.]/g, '')) || 0
  const afterNum = parseFloat(after.replace(/[^0-9.]/g, '')) || 0
  const progress = interpolate(frame, [40, 300], [0, 1])
  const displayBefore = interpolate(frame, [40, 160], [0, beforeNum])
  const displayAfter = interpolate(frame, [160, 300], [0, afterNum])
  const prefix = before.startsWith('$') ? '$' : before.endsWith('kg') ? '' : ''
  const suffix = before.endsWith('kg') ? ' kg' : before.endsWith('lbs') ? ' lbs' : ''

  const diff = afterNum - beforeNum
  const pctChange = beforeNum > 0 ? ((diff / beforeNum) * 100) : 0
  const isImprovement = diff < 0

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, width: '100%', maxWidth: 900, padding: '0 60px' }}>
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginBottom: 40 }}>
          <div style={{
            flex: 1, textAlign: 'center',
            padding: '24px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
              Before
            </span>
            <p style={{
              color: '#94a3b8', fontSize: 48, fontWeight: 900,
              fontFamily: 'system-ui, sans-serif', margin: '12px 0 0', lineHeight: 1,
            }}>
              {prefix}{Math.round(displayBefore)}{suffix}
            </p>
          </div>
          <div style={{
            flex: 1, textAlign: 'center',
            padding: '24px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: `1px solid ${accentColor}22`,
          }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
              After
            </span>
            <p style={{
              color: accentColor, fontSize: 48, fontWeight: 900,
              fontFamily: 'system-ui, sans-serif', margin: '12px 0 0', lineHeight: 1,
            }}>
              {prefix}{Math.round(displayAfter)}{suffix}
            </p>
          </div>
        </div>
        <div style={{ position: 'relative', height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, margin: '0 0 24px' }}>
          <div style={{
            height: '100%', width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${accentColor}44, ${accentColor})`,
            borderRadius: 3, transition: 'width 0.1s',
          }} />
          <div style={{
            position: 'absolute', top: '50%',
            left: `${progress * 100}%`,
            width: 16, height: 16,
            borderRadius: '50%',
            background: accentColor,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 12px ${accentColor}`,
            opacity: progress > 0.05 ? 1 : 0,
          }} />
        </div>
        <div style={{ textAlign: 'center', opacity: interpolate(progress, [0.5, 1], [0, 1]) }}>
          <span style={{
            color: isImprovement ? '#22c55e' : accentColor,
            fontSize: 24, fontWeight: 800,
            fontFamily: 'system-ui, sans-serif',
          }}>
            {isImprovement ? '-' : '+'}{Math.abs(pctChange).toFixed(1)}% change
          </span>
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 500, fontFamily: 'system-ui, sans-serif', marginTop: 8 }}>
          Duration: {duration}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function ResultCard({ personName, after, accentColor }: {
  personName: string; after: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 8, stiffness: 50 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0, 1.1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Final Result
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 64, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 8px', lineHeight: 1 }}>
          {personName}
        </h1>
        <p style={{
          color: accentColor, fontSize: 56, fontWeight: 900,
          fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1,
        }}>
          {after}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, fontWeight: 500, fontFamily: 'system-ui, sans-serif', marginTop: 12 }}>
          Incredible transformation
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const TransformationStorySchema = {
  personName: { type: 'text' as const, label: 'Person Name', required: true },
  before: { type: 'text' as const, label: 'Before Value', required: true },
  after: { type: 'text' as const, label: 'After Value', required: true },
  duration: { type: 'text' as const, label: 'Duration', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a1a14' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#22c55e' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  personName: string; before: string; after: string; duration: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ personName, before, after, duration, bgColor = '#0a1a14', accentColor = '#22c55e', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const shimmer = interpolate(Math.sin(frame * 0.015), [-1, 1], [0.05, 0.15])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #122a1e 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${accentColor}${Math.round(shimmer * 100).toString(16).padStart(2, '0')} 0%, transparent 60%)` }} />
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroCard personName={personName} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION} durationInFrames={TRANSFORM_DURATION}>
        <TransformCard before={before} after={after} duration={duration} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION + TRANSFORM_DURATION} durationInFrames={RESULT_DURATION}>
        <ResultCard personName={personName} after={after} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
