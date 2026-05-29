import React from 'react'
import { AbsoluteFill } from 'remotion'

export const QuotePosterSchema = {
  quote: { type: 'text' as const, label: 'Quote', required: true },
  author: { type: 'text' as const, label: 'Author', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#1a1a2e' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#e94560' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  quote: string
  author: string
  bgColor?: string
  accentColor?: string
  textColor?: string
}> = ({ quote, author, bgColor = '#1a1a2e', accentColor = '#e94560', textColor = '#ffffff' }) => {
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${bgColor} 0%, #16213e 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 60,
    }}>
      <div style={{ width: 80, height: 4, background: accentColor, marginBottom: 40, borderRadius: 2 }} />
      <p style={{ color: textColor, fontSize: 44, fontWeight: 700, lineHeight: 1.3, textAlign: 'center', fontFamily: 'Georgia, serif', margin: 0 }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ width: 60, height: 2, background: accentColor, marginTop: 32, marginBottom: 20, borderRadius: 1 }} />
      <p style={{ color: accentColor, fontSize: 22, fontWeight: 600, textAlign: 'center', fontFamily: 'system-ui, sans-serif', letterSpacing: 2, margin: 0 }}>
        — {author}
      </p>
    </AbsoluteFill>
  )
}
