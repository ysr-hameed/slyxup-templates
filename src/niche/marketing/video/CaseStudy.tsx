import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 150
const METRIC_DURATION = 150
const QUOTE_DURATION = 150
const RESULT_DURATION = 150

function TitleCard({ clientName, accentColor }: { clientName: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 40px' }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Case Study
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 56, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2 }}>
          {clientName}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function MetricCard({ metric, accentColor }: { metric: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 10, stiffness: 80 } })
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.3, 1])

  const counter = Math.min(100, Math.floor(interpolate(frame, [0, 100], [0, 96])))

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <p style={{ color: accentColor, fontSize: 96, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1 }}>
          {counter}%
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: '8px 0 0' }}>
          {metric}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function QuoteCard({ challenge, textColor, accentColor }: { challenge: string; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 25, 110, 150], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, padding: '0 60px', maxWidth: 960, textAlign: 'center' }}>
        <div style={{ color: accentColor, fontSize: 64, fontFamily: 'Georgia, serif', lineHeight: 0.5, marginBottom: 8 }}>"</div>
        <p style={{ color: textColor, fontSize: 32, fontWeight: 400, lineHeight: 1.5, fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: 0 }}>
          {challenge}
        </p>
      </div>
    </AbsoluteFill>
  )
}

function ResultCard({ result, accentColor }: { result: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const pulse = spring({ frame, fps: 30, config: { damping: 8, stiffness: 90 } })

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        opacity,
        transform: `scale(${pulse})`,
        textAlign: 'center',
        padding: '0 40px',
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${accentColor}20, transparent)`,
          border: `1px solid ${accentColor}40`,
          borderRadius: 20,
          padding: '40px 36px',
          maxWidth: 700,
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 12 }}>
            Key Result
          </span>
          <p style={{ color: accentColor, fontSize: 36, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.3 }}>
            {result}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const CaseStudySchema = {
  clientName: { type: 'text' as const, label: 'Client Name', required: true },
  challenge: { type: 'text' as const, label: 'Challenge', required: true },
  result: { type: 'text' as const, label: 'Result', required: true },
  metric: { type: 'text' as const, label: 'Metric Label', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0f1e' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#22c55e' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  clientName: string
  challenge: string
  result: string
  metric: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ clientName, challenge, result, metric, bgColor = '#0a0f1e', accentColor = '#22c55e', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const swirl = interpolate(frame, [0, 600], [0, 360])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #0d1a0d 100%)` }}>
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', border: `1px solid ${accentColor}10`, top: '20%', right: '-5%', transform: `rotate(${swirl}deg)` }} />
      <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', border: `1px solid ${accentColor}08`, bottom: '10%', left: '5%', transform: `rotate(${-swirl}deg)` }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard clientName={clientName} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={METRIC_DURATION}>
        <MetricCard metric={metric} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION + METRIC_DURATION} durationInFrames={QUOTE_DURATION}>
        <QuoteCard challenge={challenge} textColor={textColor} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION + METRIC_DURATION + QUOTE_DURATION} durationInFrames={RESULT_DURATION}>
        <ResultCard result={result} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
