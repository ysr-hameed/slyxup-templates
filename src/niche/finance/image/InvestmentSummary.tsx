import React from 'react'
import { AbsoluteFill } from 'remotion'

export const InvestmentSummarySchema = {
  title: { type: 'text' as const, label: 'Title', required: true },
  returns: { type: 'text' as const, label: 'Returns (e.g. +18.5%)', required: true },
  breakdown: { type: 'list' as const, label: 'Breakdown items', itemType: 'text', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0a1628' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f59e0b' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  title: string
  returns: string
  breakdown: string[]
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ title, returns, breakdown, bgColor = '#0a1628', accentColor = '#f59e0b', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #151a2e 100%)`, display: 'flex', flexDirection: 'column', padding: 60 }}>
      <div style={{ marginBottom: 40 }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Investment Summary
        </span>
        <h1 style={{ color: textColor, fontSize: 40, fontWeight: 800, fontFamily: 'system-ui, sans-serif', margin: '8px 0 0' }}>
          {title}
        </h1>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 32, marginBottom: 32 }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontFamily: 'system-ui, sans-serif' }}>Total Return</span>
        <p style={{ color: accentColor, fontSize: 56, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '4px 0 0' }}>{returns}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {breakdown.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
            <span style={{ color: textColor, fontSize: 18, fontFamily: 'system-ui, sans-serif' }}>{item.split(':')[0]}</span>
            <span style={{ color: accentColor, fontSize: 18, fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>{item.split(':')[1]}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
