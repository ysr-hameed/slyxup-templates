import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const MYTH_DURATION = 150
const TRUTH_DURATION = 150
const EVIDENCE_DURATION = 150
const STAMP_DURATION = 150

function MythCard({ myth, accentColor }: { myth: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const slideX = interpolate(enter, [0, 1], [-20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateX(${slideX}px)`, textAlign: 'center', padding: '0 60px', maxWidth: 900 }}>
        <span style={{ color: '#ef4444', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 12 }}>
          MYTH
        </span>
        <div style={{
          background: 'rgba(239,68,68,0.08)',
          border: `1px solid #ef444440`,
          borderRadius: 16,
          padding: '32px 28px',
          marginTop: 12,
        }}>
          <p style={{ color: '#fca5a5', fontSize: 32, fontWeight: 600, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.3 }}>
            {myth}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function TruthCard({ truth, accentColor }: { truth: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const slideX = interpolate(enter, [0, 1], [20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateX(${slideX}px)`, textAlign: 'center', padding: '0 60px', maxWidth: 900 }}>
        <span style={{ color: '#22c55e', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 12 }}>
          FACT
        </span>
        <div style={{
          background: 'rgba(34,197,94,0.08)',
          border: `1px solid #22c55e40`,
          borderRadius: 16,
          padding: '32px 28px',
          marginTop: 12,
        }}>
          <p style={{ color: '#86efac', fontSize: 32, fontWeight: 600, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.3 }}>
            {truth}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function EvidenceCard({ evidence, source, textColor, accentColor }: { evidence: string; source: string; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 25, 110, 150], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 60px', maxWidth: 900, textAlign: 'center' }}>
        <span style={{ color: accentColor, fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 12 }}>
          Evidence
        </span>
        <div style={{
          background: `linear-gradient(135deg, ${accentColor}10, transparent)`,
          borderRadius: 16,
          padding: '28px 24px',
          marginTop: 12,
        }}>
          <p style={{ color: textColor, fontSize: 26, fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.5, margin: 0 }}>
            {evidence}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: '20px 0 0' }}>
            Source: {source}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function StampCard({ accentColor }: { accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 6, stiffness: 120 } })
  const opacity = interpolate(frame, [0, 15, 110, 150], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [1.5, 1])
  const rotate = interpolate(enter, [0, 1], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        width: 180,
        height: 180,
        borderRadius: '50%',
        border: `6px solid #22c55e`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ color: '#22c55e', fontSize: 24, fontWeight: 900, fontFamily: 'system-ui, sans-serif', letterSpacing: 2, textTransform: 'uppercase' }}>
          DEBUNKED
        </span>
      </div>
    </AbsoluteFill>
  )
}

export const MythBusterSchema = {
  myth: { type: 'text' as const, label: 'Myth', required: true },
  truth: { type: 'text' as const, label: 'Truth', required: true },
  evidence: { type: 'text' as const, label: 'Evidence', required: true },
  source: { type: 'text' as const, label: 'Source', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a0a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#22c55e' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#e2e8f0' },
}

export const Composition: React.FC<{
  myth: string
  truth: string
  evidence: string
  source: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ myth, truth, evidence, source, bgColor = '#0a0a0a', accentColor = '#22c55e', textColor = '#e2e8f0' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 600], [0, 360])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #1a0a0a 100%)` }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: `1px solid ${accentColor}08`, top: '20%', left: '30%', transform: `rotate(${swirl}deg)` }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: `1px solid ${accentColor}06`, bottom: '10%', right: '5%', transform: `rotate(${-swirl}deg)` }} />
      <Sequence from={0} durationInFrames={MYTH_DURATION}>
        <MythCard myth={myth} accentColor={accentColor} />
      </Sequence>
      <Sequence from={MYTH_DURATION} durationInFrames={TRUTH_DURATION}>
        <TruthCard truth={truth} accentColor={accentColor} />
      </Sequence>
      <Sequence from={MYTH_DURATION + TRUTH_DURATION} durationInFrames={EVIDENCE_DURATION}>
        <EvidenceCard evidence={evidence} source={source} textColor={textColor} accentColor={accentColor} />
      </Sequence>
      <Sequence from={MYTH_DURATION + TRUTH_DURATION + EVIDENCE_DURATION} durationInFrames={STAMP_DURATION}>
        <StampCard accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
