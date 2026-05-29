import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const INTRO_DURATION = 120
const CODE_DURATION = 360
const TIP_DURATION = 120

function IntroCard({ title, accentColor }: { title: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-20, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Dev Life Hack
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 64, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.1 }}>
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function CodingCard({ tip, code, lang, accentColor, textColor }: {
  tip: string; code: string; lang?: string; accentColor: string; textColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 20, 330, 360], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [20, 0])

  const typeChars = Math.min(Math.floor(interpolate(frame, [20, 300], [0, code.length])), code.length)
  const cursorBlink = interpolate(Math.sin(frame * 0.12), [-1, 1], [0, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, width: '100%', maxWidth: 880, padding: '0 60px' }}>
        <p style={{
          color: textColor, fontSize: 28, fontWeight: 500,
          fontFamily: 'system-ui, sans-serif', margin: '0 0 24px',
          textAlign: 'center', lineHeight: 1.4,
        }}>
          {tip}
        </p>
        <div style={{
          background: '#0d1117',
          borderRadius: 12,
          border: `1px solid ${accentColor}22`,
          overflow: 'hidden',
          boxShadow: `0 0 40px ${accentColor}11`,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 20px', borderBottom: `1px solid ${accentColor}22`,
          }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginLeft: 12, fontFamily: 'system-ui, sans-serif' }}>
              {lang || 'terminal'} — ~/dev/hack
            </span>
          </div>
          <div style={{ padding: '20px 24px', minHeight: 200 }}>
            <pre style={{
              color: '#e6edf3', fontSize: 20, fontFamily: '"JetBrains Mono", monospace',
              lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              <span style={{ color: accentColor, opacity: 0.5 }}>$ </span>
              {code.slice(0, typeChars).split('').map((char, i) => (
                <span key={i} style={{
                  color: char === '{' || char === '}' || char === '(' || char === ')' ? accentColor :
                    char === "'" || char === '"' ? '#a5d6ff' :
                    char === '=' || char === '>' || char === '<' ? '#ffa657' :
                    undefined,
                  textShadow: char === '{' || char === '}' ? `0 0 8px ${accentColor}44` : undefined,
                }}>{char}</span>
              ))}
              {typeChars < code.length && (
                <span style={{
                  display: 'inline-block', width: 10, height: 22,
                  background: accentColor,
                  opacity: cursorBlink,
                  verticalAlign: 'text-bottom',
                  marginLeft: 1,
                }} />
              )}
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function TipCard({ tip, accentColor }: { tip: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 65 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.5, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})`, padding: '0 60px', maxWidth: 960 }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Pro Tip
        </span>
        <p style={{ color: '#ffffff', fontSize: 40, fontWeight: 500, fontFamily: 'Georgia, serif', margin: '16px 0 0', lineHeight: 1.3 }}>
          {tip}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const DevLifeHackSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  tip: { type: 'text' as const, label: 'Life Hack Tip', required: true },
  code: { type: 'text' as const, label: 'Code Snippet', required: true },
  lang: { type: 'text' as const, label: 'Language', required: false },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0d1117' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#58a6ff' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#e6edf3' },
}

export const Composition: React.FC<{
  title: string; tip: string; code: string; lang?: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ title, tip, code, lang, bgColor = '#0d1117', accentColor = '#58a6ff', textColor = '#e6edf3' }) => {
  const frame = useCurrentFrame()
  const gridOpacity = interpolate(Math.sin(frame * 0.008), [-1, 1], [0.03, 0.07])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #161b22 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, opacity: gridOpacity }}>
        {Array.from({ length: 6 }).map((_, r) => (
          <div key={r} style={{ borderTop: '1px solid #30363d', height: `${100/6}%` }} />
        ))}
        {Array.from({ length: 4 }).map((_, c) => (
          <div key={c} style={{ position: 'absolute', left: `${c * 25}%`, top: 0, bottom: 0, borderLeft: '1px solid #30363d' }} />
        ))}
      </div>
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroCard title={title} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION} durationInFrames={CODE_DURATION}>
        <CodingCard tip={tip} code={code} lang={lang} accentColor={accentColor} textColor={textColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION + CODE_DURATION} durationInFrames={TIP_DURATION}>
        <TipCard tip={tip} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
