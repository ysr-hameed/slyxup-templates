import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const TITLE_DURATION = 150
const EVENT_DURATION = 750

function TitleCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 110, 150], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.85, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: accentColor, fontSize: 20, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Timeline
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 56, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2, padding: '0 40px' }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function EventCard({ events, textColor, accentColor }: { events: string[]; textColor: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 700 }}>
        <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 2, background: `${accentColor}40` }} />
        {events.map((evt, i) => {
          const evtStart = i * 125
          const localFrame = frame - evtStart
          const enter = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 14, stiffness: 70 } })
          const opacity = interpolate(Math.max(0, localFrame), [0, 15, 95, 125], [0, 1, 1, 0])
          const slideX = interpolate(enter, [0, 1], [-20, 0])

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28, opacity, transform: `translateX(${slideX}px)`, position: 'relative' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: accentColor, border: '3px solid #1c1108', flexShrink: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#000' }} />
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '14px 18px' }}>
                <p style={{ color: textColor, fontSize: 22, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.4 }}>{evt}</p>
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const TimelineSchema = {
  title: { type: 'text' as const, label: 'Timeline Title', required: true },
  events: { type: 'list' as const, label: 'Events (chronological)', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1c1108' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#d4a574' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#f5e6d3' },
}

export const Composition: React.FC<{
  title: string
  events: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, events, bgColor = '#1c1108', accentColor = '#d4a574', textColor = '#f5e6d3' }) => {
  const frame = useCurrentFrame()
  const vignette = interpolate(frame, [0, 900], [0.3, 0.5])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #2a1a0a 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignette}) 100%)`, pointerEvents: 'none' }} />
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={TITLE_DURATION} durationInFrames={EVENT_DURATION}>
        <EventCard events={events} textColor={textColor} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
