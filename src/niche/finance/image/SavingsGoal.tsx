import React from 'react'
import { AbsoluteFill } from 'remotion'

export const SavingsGoalSchema = {
  goal: { type: 'text' as const, label: 'Savings Goal', required: true },
  amount: { type: 'text' as const, label: 'Target Amount', required: true },
  progress: { type: 'text' as const, label: 'Progress (e.g. 65%)', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a1628' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#10b981' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  goal: string
  amount: string
  progress: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ goal, amount, progress, bgColor = '#0a1628', accentColor = '#10b981', textColor = '#ffffff' }) => {
  const progNum = Math.min(100, Math.max(0, parseInt(progress) || 0))

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #0f1f2e 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
      <span style={{ color: accentColor, fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 12 }}>
        Savings Goal
      </span>
      <h1 style={{ color: textColor, fontSize: 48, fontWeight: 800, fontFamily: 'system-ui, sans-serif', textAlign: 'center', margin: '0 0 40', lineHeight: 1.2 }}>
        {goal}
      </h1>
      <div style={{ width: 200, height: 200, borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
        <svg width={220} height={220} viewBox="0 0 220 220" style={{ position: 'absolute' }}>
          <circle cx={110} cy={110} r={100} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={10} />
          <circle cx={110} cy={110} r={100} fill="none" stroke={accentColor} strokeWidth={10} strokeDasharray={2 * Math.PI * 100} strokeDashoffset={2 * Math.PI * 100 * (1 - progNum / 100)} strokeLinecap="round" transform="rotate(-90 110 110)" />
        </svg>
        <span style={{ color: accentColor, fontSize: 40, fontWeight: 900, fontFamily: 'system-ui, sans-serif' }}>{progress}</span>
      </div>
      <p style={{ color: textColor, fontSize: 36, fontWeight: 700, fontFamily: 'system-ui, sans-serif', margin: 0 }}>{amount}</p>
    </AbsoluteFill>
  )
}
