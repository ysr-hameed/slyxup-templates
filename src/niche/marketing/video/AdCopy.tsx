import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const HOOK_DURATION = 150
const COPY_DURATION = 750

function HookCard({ headline, accentColor }: { headline: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scale = spring({ frame, fps, config: { damping: 8, stiffness: 100 } })
  const opacity = interpolate(frame, [0, 15, 110, 150], [0, 1, 1, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 12 }}>
          Ad Copy
        </span>
        <h1 style={{ color: accentColor, fontSize: 48, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '12px 0 0', lineHeight: 1.2 }}>
          {headline}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function CopyCard({ body, cta, textColor, accentColor }: { body: string; cta: string; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 25, 710, 750], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 50px', maxWidth: 960, textAlign: 'center' }}>
        <p style={{ color: textColor, fontSize: 38, fontWeight: 400, lineHeight: 1.5, fontFamily: 'Georgia, serif', margin: 0 }}>
          {body}
        </p>
        <div style={{ marginTop: 48, padding: '16px 40px', background: accentColor, borderRadius: 8, display: 'inline-block' }}>
          <span style={{ color: '#000', fontSize: 24, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{cta}</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const AdCopySchema = {
  headline: { type: 'text' as const, label: 'Headline', required: true },
  body: { type: 'text' as const, label: 'Body Copy', required: true },
  cta: { type: 'text' as const, label: 'Call to Action', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f59e0b' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  headline: string
  body: string
  cta: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ headline, body, cta, bgColor = '#0f0a1a', accentColor = '#f59e0b', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <Sequence from={0} durationInFrames={HOOK_DURATION}>
        <HookCard headline={headline} accentColor={accentColor} />
      </Sequence>
      <Sequence from={HOOK_DURATION} durationInFrames={COPY_DURATION}>
        <CopyCard body={body} cta={cta} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
