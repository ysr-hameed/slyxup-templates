import React from 'react'
import { AbsoluteFill } from 'remotion'

export const DidYouKnowSchema = {
  fact: { type: 'text' as const, label: 'Historical Fact', required: true },
  year: { type: 'text' as const, label: 'Year', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1c1108' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#d4a574' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#f5e6d3' },
}

export const Composition: React.FC<{
  fact: string
  year: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ fact, year, bgColor = '#1c1108', accentColor = '#d4a574', textColor = '#f5e6d3' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #2a1a0a 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
      <span style={{ color: accentColor, fontSize: 16, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 16 }}>
        Did You Know?
      </span>
      <p style={{ color: textColor, fontSize: 100, fontWeight: 900, fontFamily: 'Georgia, serif', margin: 0, lineHeight: 1, textShadow: `0 2px 30px ${accentColor}30` }}>
        {year}
      </p>
      <div style={{ width: 60, height: 2, background: accentColor, margin: '32px 0', borderRadius: 1 }} />
      <p style={{ color: textColor, fontSize: 30, fontWeight: 400, lineHeight: 1.5, textAlign: 'center', fontFamily: 'Georgia, serif', margin: 0, fontStyle: 'italic', maxWidth: 800 }}>
        &ldquo;{fact}&rdquo;
      </p>
    </AbsoluteFill>
  )
}
