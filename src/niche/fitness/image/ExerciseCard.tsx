import React from 'react'
import { AbsoluteFill } from 'remotion'

export const ExerciseCardSchema = {
  exercise: { type: 'text' as const, label: 'Exercise Name', required: true },
  muscleGroup: { type: 'text' as const, label: 'Muscle Group', required: true },
  difficulty: { type: 'text' as const, label: 'Difficulty', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1a0a0a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f97316' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  exercise: string
  muscleGroup: string
  difficulty: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ exercise, muscleGroup, difficulty, bgColor = '#1a0a0a', accentColor = '#f97316', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #2a1510 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
      <div style={{ width: 100, height: 100, borderRadius: '50%', border: `3px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
        <span style={{ color: accentColor, fontSize: 40, fontWeight: 900, fontFamily: 'system-ui, sans-serif' }}>
          💪
        </span>
      </div>
      <h1 style={{ color: textColor, fontSize: 52, fontWeight: 900, fontFamily: 'system-ui, sans-serif', textAlign: 'center', margin: 0, lineHeight: 1.1 }}>{exercise}</h1>
      <div style={{ width: 60, height: 3, background: accentColor, margin: '24px 0', borderRadius: 2 }} />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontFamily: 'system-ui, sans-serif', margin: 0 }}>{muscleGroup}</p>
      <div style={{ marginTop: 24, padding: '10px 28px', border: `1px solid ${accentColor}40`, borderRadius: 24, background: `${accentColor}15` }}>
        <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{difficulty}</span>
      </div>
    </AbsoluteFill>
  )
}
