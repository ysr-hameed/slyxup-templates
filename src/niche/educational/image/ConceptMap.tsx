import React from 'react'
import { AbsoluteFill } from 'remotion'

export const ConceptMapSchema = {
  topic: { type: 'text' as const, label: 'Main Topic', required: true },
  subtopics: { type: 'list' as const, label: 'Subtopics', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#06b6d4' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  topic: string
  subtopics: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ topic, subtopics, bgColor = '#0a0a1a', accentColor = '#06b6d4', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #0a1628 100%)`, display: 'flex', flexDirection: 'column', padding: 60 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ color: textColor, fontSize: 40, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: 0 }}>{topic}</h1>
      </div>
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: 2, height: '80%', background: `${accentColor}30`, left: '50%', top: '10%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 600 }}>
          {subtopics.map((st, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: accentColor, transform: 'rotate(45deg)', flexShrink: 0 }} />
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px 20px', flex: 1 }}>
                <span style={{ color: textColor, fontSize: 22, fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>{st}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}
