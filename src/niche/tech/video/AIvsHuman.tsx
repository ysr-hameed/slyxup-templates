import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const INTRO_DURATION = 120
const COMPARE_DURATION = 360
const RESULT_DURATION = 120

function IntroCard({ task, accentColor }: { task: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(frame, [0, 20], [0.8, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          AI vs Human
        </span>
        <h1 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1.2 }}>
          {task}
        </h1>
      </div>
    </AbsoluteFill>
  )
}

function ComparisonCard({ aiScore, humanScore, accentColor }: {
  aiScore: string; humanScore: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 20, 330, 360], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [30, 0])

  const aiNum = parseFloat(aiScore) || 0
  const humanNum = parseFloat(humanScore) || 0
  const aiBar = interpolate(frame, [40, 280], [0, aiNum])
  const humanBar = interpolate(frame, [40, 280], [0, humanNum])
  const maxScore = Math.max(aiNum, humanNum, 100)
  const aiPercent = (aiNum / maxScore) * 100
  const humanPercent = (humanNum / maxScore) * 100

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, width: '100%', maxWidth: 900, padding: '0 60px' }}>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              width: '100%', height: 8,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 4, marginBottom: 12,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${Math.min(aiBar / maxScore * 100, 100)}%`,
                background: `linear-gradient(90deg, #6366f1, ${accentColor})`,
                borderRadius: 4, transition: 'width 0.1s',
              }} />
            </div>
            <p style={{
              color: accentColor, fontSize: 40, fontWeight: 900,
              fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1,
            }}>
              {Math.round(aiBar).toLocaleString()}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 600, fontFamily: 'system-ui, sans-serif', marginTop: 4 }}>
              AI
            </p>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              width: '100%', height: 8,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 4, marginBottom: 12,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${Math.min(humanBar / maxScore * 100, 100)}%`,
                background: `linear-gradient(90deg, ${accentColor}, #f59e0b)`,
                borderRadius: 4, transition: 'width 0.1s',
              }} />
            </div>
            <p style={{
              color: '#f59e0b', fontSize: 40, fontWeight: 900,
              fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1,
            }}>
              {Math.round(humanBar).toLocaleString()}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 600, fontFamily: 'system-ui, sans-serif', marginTop: 4 }}>
              Human
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: accentColor, animation: 'pulse 1s infinite',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>
              {aiNum > humanNum ? 'AI leads in this task' : humanNum > aiNum ? 'Human leads in this task' : 'Tied'}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function ResultCard({ aiScore, humanScore, winner, accentColor }: {
  aiScore: string; humanScore: string; winner: string; accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 10, stiffness: 55 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.3, 1])

  const isAI = winner.toLowerCase() === 'ai'

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{
          color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700,
          letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif',
        }}>
          Winner
        </span>
        <h1 style={{
          color: isAI ? accentColor : '#f59e0b', fontSize: 80, fontWeight: 900,
          fontFamily: 'system-ui, sans-serif', margin: '16px 0', lineHeight: 1,
          textShadow: isAI ? `0 0 30px ${accentColor}44` : '0 0 30px #f59e0b44',
        }}>
          {winner}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>
          {isAI ? `${aiScore} vs ${humanScore}` : `${humanScore} vs ${aiScore}`}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const AIvsHumanSchema = {
  task: { type: 'text' as const, label: 'Task', required: true },
  aiScore: { type: 'text' as const, label: 'AI Score', required: true },
  humanScore: { type: 'text' as const, label: 'Human Score', required: true },
  winner: { type: 'text' as const, label: 'Winner (AI or Human)', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#6366f1' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  task: string; aiScore: string; humanScore: string; winner: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ task, aiScore, humanScore, winner, bgColor = '#0a0a1a', accentColor = '#6366f1', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const glow = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.06, 0.15])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #15152e 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 50%, ${accentColor}${Math.round(glow * 100).toString(16).padStart(2, '0')} 0%, transparent 50%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 50%, #f59e0b${Math.round(glow * 100).toString(16).padStart(2, '0')} 0%, transparent 50%)` }} />
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroCard task={task} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION} durationInFrames={COMPARE_DURATION}>
        <ComparisonCard aiScore={aiScore} humanScore={humanScore} accentColor={accentColor} />
      </Sequence>
      <Sequence from={INTRO_DURATION + COMPARE_DURATION} durationInFrames={RESULT_DURATION}>
        <ResultCard aiScore={aiScore} humanScore={humanScore} winner={winner} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
