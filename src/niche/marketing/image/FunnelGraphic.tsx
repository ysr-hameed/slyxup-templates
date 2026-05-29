import React from 'react'
import { AbsoluteFill } from 'remotion'

export const FunnelGraphicSchema = {
  headline: { type: 'text' as const, label: 'Headline', required: true },
  stages: { type: 'list' as const, label: 'Funnel Stages', itemType: 'text', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#a855f7' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  headline: string
  stages: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ headline, stages, bgColor = '#0f0a1a', accentColor = '#a855f7', textColor = '#ffffff' }) => {
  const widths = [100, 80, 60, 40]

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #1a1025 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 60 }}>
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <h1 style={{ color: textColor, fontSize: 40, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: 0 }}>{headline}</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 600, gap: 4 }}>
        {stages.map((stage, i) => {
          const w = widths[Math.min(i, widths.length - 1)]
          return (
            <div key={i} style={{ width: `${w}%`, background: `linear-gradient(135deg, ${accentColor}${Math.round((1 - i * 0.15) * 100).toString(16).padStart(2, '0')} 0%, ${accentColor}30 100%)`, padding: '16px 24px', textAlign: 'center', borderRadius: 8 }}>
              <span style={{ color: i === 0 ? '#000' : textColor, fontSize: 18, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>{stage}</span>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}
