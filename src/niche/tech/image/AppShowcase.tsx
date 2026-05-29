import React from 'react'
import { AbsoluteFill } from 'remotion'

export const AppShowcaseSchema = {
  appName: { type: 'text' as const, label: 'App Name', required: true },
  tagline: { type: 'text' as const, label: 'Tagline', required: true },
  features: { type: 'list' as const, label: 'Key Features', itemType: 'text', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0d1117' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#8b5cf6' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  appName: string
  tagline: string
  features: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ appName, tagline, features, bgColor = '#0d1117', accentColor = '#8b5cf6', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #1a1a3e 100%)`, display: 'flex', flexDirection: 'column', padding: 60 }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ color: accentColor, fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Featured App
        </span>
        <h1 style={{ color: textColor, fontSize: 52, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '8px 0 4px' }}>
          {appName}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontFamily: 'system-ui, sans-serif', margin: 0 }}>{tagline}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {features.map((feat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#000', fontSize: 18, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{i + 1}</span>
            </div>
            <span style={{ color: textColor, fontSize: 22, fontFamily: 'system-ui, sans-serif', lineHeight: 1.3 }}>{feat}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
