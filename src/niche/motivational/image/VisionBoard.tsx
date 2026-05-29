import React from 'react'
import { AbsoluteFill } from 'remotion'

export const VisionBoardSchema = {
  goal: { type: 'text' as const, label: 'Main Goal', required: true },
  steps: { type: 'list' as const, label: 'Steps', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f0f23' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#818cf8' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  goal: string
  steps: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ goal, steps, bgColor = '#0f0f23', accentColor = '#818cf8', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${bgColor} 0%, #1a1a3e 100%)`,
      display: 'flex',
      flexDirection: 'column',
      padding: 60,
    }}>
      <div style={{ borderLeft: `4px solid ${accentColor}`, paddingLeft: 20, marginBottom: 48 }}>
        <span style={{ color: accentColor, fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          My Vision
        </span>
        <h1 style={{ color: textColor, fontSize: 52, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '8px 0 0', lineHeight: 1.2 }}>
          {goal}
        </h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#000', fontSize: 16, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{i + 1}</span>
            </div>
            <p style={{ color: textColor, fontSize: 22, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.4 }}>{step}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
