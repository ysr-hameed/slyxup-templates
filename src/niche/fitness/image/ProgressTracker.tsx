import React from 'react'
import { AbsoluteFill } from 'remotion'

export const ProgressTrackerSchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  metric: { type: 'text' as const, label: 'Metric/Value', required: true },
  milestones: { type: 'list' as const, label: 'Milestones', itemType: 'text', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1a0a0a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#22c55e' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  metric: string
  milestones: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, metric, milestones, bgColor = '#1a0a0a', accentColor = '#22c55e', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #0f1a0a 100%)`, display: 'flex', flexDirection: 'column', padding: 60 }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Progress
        </span>
        <h1 style={{ color: textColor, fontSize: 40, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '8px 0 0' }}>{title}</h1>
      </div>
      <div style={{ background: `${accentColor}15`, borderRadius: 16, padding: 32, textAlign: 'center', marginBottom: 32, border: `1px solid ${accentColor}30` }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontFamily: 'system-ui, sans-serif' }}>Current</span>
        <p style={{ color: accentColor, fontSize: 64, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '4px 0 0' }}>{metric}</p>
      </div>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 16 }}>
        Milestones
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {milestones.map((ms, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor }} />
            </div>
            <span style={{ color: textColor, fontSize: 20, fontFamily: 'system-ui, sans-serif' }}>{ms}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
