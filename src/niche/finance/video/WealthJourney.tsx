import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const INTRO_DURATION = 120
const TIMELINE_DURATION = 360
const RESULT_DURATION = 120

function IntroCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.7, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: accentColor, fontSize: 16, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Wealth Journey
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 68, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.1 }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function TimelineCard({ startAmount, endAmount, milestone, accentColor, textColor }: {
  startAmount: string; endAmount: string; milestone: string; accentColor: string; textColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 20, 330, 360], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  const startNum = parseFloat(startAmount.replace(/[^0-9.]/g, '')) || 0
  const endNum = parseFloat(endAmount.replace(/[^0-9.]/g, '')) || 100000
  const milestoneNum = parseFloat(milestone.replace(/[^0-9.]/g, '')) || (endNum / 2)
  const prefix = startAmount.startsWith('$') ? '$' : ''
  const suffix = startAmount.endsWith('K') || startAmount.endsWith('M') ? startAmount.slice(-1) : ''

  const progress = interpolate(frame, [20, 320], [0, 1])
  const currentVal = interpolate(frame, [20, 320], [startNum, endNum])
  const milestonepos = (milestoneNum - startNum) / (endNum - startNum)

  const milestoneReached = spring({
    frame: Math.max(0, frame - 20 - milestonepos * 300),
    fps, config: { damping: 8, stiffness: 100 },
  })

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, width: '100%', maxWidth: 900, padding: '0 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, fontWeight: 600, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
            Start
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, fontWeight: 600, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
            Today
          </p>
        </div>
        <div style={{ position: 'relative', height: 80, display: 'flex', alignItems: 'center' }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 8,
            background: 'rgba(255,255,255,0.1)', borderRadius: 4,
          }}>
            <div style={{
              height: '100%', width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${accentColor}44, ${accentColor})`,
              borderRadius: 4, transition: 'width 0.1s',
            }} />
          </div>
          {frame > 20 + milestonepos * 300 && (
            <div style={{
              position: 'absolute', left: `${milestonepos * 100}%`,
              transform: `translateX(-50%) scale(${milestoneReached})`,
              top: -30, textAlign: 'center',
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                background: accentColor, margin: '0 auto',
                boxShadow: `0 0 20px ${accentColor}`,
              }} />
              <p style={{
                color: accentColor, fontSize: 14, fontWeight: 700,
                fontFamily: 'system-ui, sans-serif', margin: '4px 0 0',
                whiteSpace: 'nowrap',
              }}>
                {prefix}{milestoneNum.toLocaleString()}{suffix}
              </p>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 40 }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ color: textColor, fontSize: 16, fontWeight: 500, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
              Starting
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 28, fontWeight: 700, fontFamily: 'system-ui, sans-serif', margin: '4px 0 0' }}>
              {startAmount}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: accentColor, fontSize: 16, fontWeight: 600, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
              Current
            </p>
            <p style={{ color: accentColor, fontSize: 44, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '4px 0 0', lineHeight: 1 }}>
              {prefix}{Math.round(currentVal).toLocaleString()}{suffix}
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function ResultCard({ endAmount, accentColor }: { endAmount: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 10, stiffness: 55 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.5, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Total Wealth
        </span>
        <p style={{ color: accentColor, fontSize: 80, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1 }}>
          {endAmount}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, fontWeight: 500, fontFamily: 'system-ui, sans-serif', marginTop: 12 }}>
          Keep growing
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const WealthJourneySchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  startAmount: { type: 'text' as const, label: 'Start Amount', required: true },
  endAmount: { type: 'text' as const, label: 'End Amount', required: true },
  milestone: { type: 'text' as const, label: 'Milestone Amount', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a1628' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f59e0b' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string; startAmount: string; endAmount: string; milestone: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ title, startAmount, endAmount, milestone, bgColor = '#0a1628', accentColor = '#f59e0b', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const gridOpacity = interpolate(Math.sin(frame * 0.01), [-1, 1], [0.02, 0.06])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #0d1f3c 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, opacity: gridOpacity }}>
        {Array.from({ length: 8 }).map((_, r) => (
          <div key={r} style={{ borderTop: '1px solid #ffffff', height: '12.5%' }} />
        ))}
        {Array.from({ length: 5 }).map((_, c) => (
          <div key={c} style={{ position: 'absolute', left: `${c * 25}%`, top: 0, bottom: 0, borderLeft: '1px solid #ffffff' }} />
        ))}
      </div>
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION} durationInFrames={TIMELINE_DURATION}>
        <TimelineCard startAmount={startAmount} endAmount={endAmount} milestone={milestone} accentColor={accentColor} textColor={textColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION + TIMELINE_DURATION} durationInFrames={RESULT_DURATION}>
        <ResultCard endAmount={endAmount} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
