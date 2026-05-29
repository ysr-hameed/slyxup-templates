import React from 'react'
import { AbsoluteFill } from 'remotion'

export const TechSpecsCardSchema = {
  product: { type: 'text' as const, label: 'Product Name', required: true },
  specs: { type: 'list' as const, label: 'Specs (format: Name:Value)', itemType: 'text' as const, required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0d1117' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#58a6ff' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#c9d1d9' },
}

export const Composition: React.FC<{
  product: string
  specs: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ product, specs, bgColor = '#0d1117', accentColor = '#58a6ff', textColor = '#c9d1d9' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #161b22 100%)`, display: 'flex', flexDirection: 'column', padding: 60 }}>
      <div style={{ marginBottom: 40 }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Tech Specs
        </span>
        <h1 style={{ color: textColor, fontSize: 44, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '8px 0 0' }}>
          {product}
        </h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden' }}>
        {specs.map((spec, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, fontFamily: 'system-ui, sans-serif' }}>{spec.split(':')[0]}</span>
            <span style={{ color: textColor, fontSize: 20, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>{spec.split(':')[1]}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
