import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const HOOK_DURATION = 150
const RESULT_DURATION = 90
const TIP_DURATION = 660

function HookCard({ hook, accentColor }: { hook: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scale = spring({ frame, fps, config: { damping: 8, stiffness: 100 } })
  const opacity = interpolate(frame, [0, 15, 110, 150], [0, 1, 1, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
        padding: '0 40px',
      }}>
        <p style={{
          color: accentColor,
          fontSize: 28,
          fontWeight: 600,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Marketing Tip
        </p>
        <h1 style={{
          color: '#ffffff',
          fontSize: 56,
          fontWeight: 800,
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.2,
          margin: 0,
        }}>
          {hook}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function ResultCard({ result, accentColor }: { result: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 15, 60, 90], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 15], [0.5, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}>
        <p style={{
          color: accentColor,
          fontSize: 80,
          fontWeight: 900,
          fontFamily: 'system-ui, sans-serif',
          margin: 0,
          lineHeight: 1,
        }}>
          {result}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tip, textColor }: { tip: string; textColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 25, 620, 660], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity,
        transform: `translateY(${slideY}px)`,
        padding: '40px',
        maxWidth: 960,
        textAlign: 'center',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '48px 40px',
        }}>
          <p style={{
            color: textColor,
            fontSize: 38,
            fontWeight: 450,
            lineHeight: 1.5,
            fontFamily: 'Georgia, serif',
            margin: 0,
          }}>
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
  hook: string
  tip: string
  result?: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ hook, tip, result, bgColor = '#0f0a1a', accentColor = '#a855f7', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 900], [0, 360])

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        border: `2px solid ${accentColor}10`,
        top: '10%',
        left: '30%',
        transform: `rotate(${swirl}deg)`,
      }} />
      <div style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: `1px solid ${accentColor}08`,
        bottom: '15%',
        right: '20%',
        transform: `rotate(${-swirl}deg)`,
      }} />
      <Sequence from={0} durationInFrames={HOOK_DURATION}>
        <HookCard hook={hook} accentColor={accentColor} />
      </Sequence>
      {result ? (
        <Sequence from={HOOK_DURATION} durationInFrames={RESULT_DURATION}>
          <ResultCard result={result} accentColor={accentColor} />
        </Sequence>
      ) : null}
      <Sequence
        from={HOOK_DURATION + (result ? RESULT_DURATION : 0)}
        durationInFrames={TIP_DURATION}
      >
        <TipCard tip={tip} textColor={textColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
