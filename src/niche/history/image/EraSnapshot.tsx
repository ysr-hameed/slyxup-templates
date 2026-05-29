import React from 'react'
import { AbsoluteFill } from 'remotion'

export const EraSnapshotSchema = {
  era: { type: 'text' as const, label: 'Era Name', required: true },
  period: { type: 'text' as const, label: 'Time Period', required: true },
  highlights: { type: 'list' as const, label: 'Key Highlights', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1c1108' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#d4a574' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#f5e6d3' },
}

export const Composition: React.FC<{
  era: string
  period: string
  highlights: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ era, period, highlights, bgColor = '#1c1108', accentColor = '#d4a574', textColor = '#f5e6d3' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #2a1a0a 100%)`, display: 'flex', flexDirection: 'column', padding: 60 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ color: accentColor, fontSize: 14, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          {period}
        </span>
        <h1 style={{ color: textColor, fontSize: 52, fontWeight: 900, fontFamily: 'Georgia, serif', margin: '8px 0 0' }}>
          {era}
        </h1>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
        {highlights.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, borderLeft: `2px solid ${accentColor}`, paddingLeft: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
            <p style={{ color: textColor, fontSize: 22, fontWeight: 400, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.4 }}>{h}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
