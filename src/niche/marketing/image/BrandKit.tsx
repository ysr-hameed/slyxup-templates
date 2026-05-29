import React from 'react'
import { AbsoluteFill } from 'remotion'

export const BrandKitSchema = {
  brandName: { type: 'text' as const, label: 'Brand Name', required: true },
  colors: { type: 'list' as const, label: 'Color Palette (hex codes)', itemType: 'text' as const, required: true },
  fonts: { type: 'text' as const, label: 'Font Family', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0f0a1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#a855f7' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  brandName: string
  colors: string[]
  fonts: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ brandName, colors, fonts, bgColor = '#0f0a1a', accentColor = '#a855f7', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #1a1025 100%)`, display: 'flex', flexDirection: 'column', padding: 60 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span style={{ color: accentColor, fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Brand Kit
        </span>
        <h1 style={{ color: textColor, fontSize: 48, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '8px 0 0' }}>{brandName}</h1>
      </div>
      <div style={{ marginBottom: 32 }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginBottom: 12, display: 'block' }}>
          Colors
        </span>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {colors.map((c, i) => (
            <div key={i} style={{ width: 64, height: 64, borderRadius: 12, background: c, border: '2px solid rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      </div>
      <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', display: 'block', marginBottom: 8 }}>
          Typography
        </span>
        <span style={{ color: textColor, fontSize: 28, fontWeight: 400, fontFamily: fonts || 'system-ui, sans-serif', margin: 0 }}>
          {fonts || 'Primary Font'}
        </span>
      </div>
    </AbsoluteFill>
  )
}
