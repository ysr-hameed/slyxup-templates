import React from 'react'
import { AbsoluteFill } from 'remotion'

export const FlashCardSchema = {
  term: { type: 'text' as const, label: 'Term/Concept', required: true },
  definition: { type: 'text' as const, label: 'Definition', required: true },
  category: { type: 'text' as const, label: 'Category', required: false },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#6366f1' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  term: string
  definition: string
  category?: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ term, definition, category, bgColor = '#0a0a1a', accentColor = '#6366f1', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accentColor}30`, borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 800 }}>
        {category && (
          <span style={{ color: accentColor, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 12, display: 'block' }}>
            {category}
          </span>
        )}
        <h1 style={{ color: textColor, fontSize: 40, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '0 0 24', lineHeight: 1.2 }}>
          {term}
        </h1>
        <div style={{ width: '100%', height: 1, background: `${accentColor}20`, marginBottom: 24 }} />
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 26, fontWeight: 400, lineHeight: 1.5, fontFamily: 'system-ui, sans-serif', margin: 0 }}>
          {definition}
        </p>
      </div>
    </AbsoluteFill>
  )
}
