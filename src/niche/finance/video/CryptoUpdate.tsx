import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion'

const HEADER_DURATION = 90
const TICKER_DURATION = 240
const DETAIL_DURATION = 120

function CandleBar({ height, color, delay, frame }: { height: number; color: string; delay: number; frame: number }) {
  const grow = interpolate(Math.max(0, frame - delay), [0, 30], [0, height])
  return (
    <div style={{
      width: 20, height,
      background: color,
      borderRadius: '2px 2px 0 0',
      opacity: frame > delay ? 1 : 0,
      transform: `scaleY(${height > 0 ? grow / height : 0})`,
      transformOrigin: 'bottom',
    }} />
  )
}

function HeaderCard({ coinName, accentColor }: { coinName: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 20, 60, 90], [0, 1, 1, 0])
  const slideY = interpolate(frame, [0, 20], [-15, 0])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `translateY(${slideY}px)` }}>
        <span style={{ color: accentColor, fontSize: 80, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1 }}>
          {coinName}
        </span>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', marginTop: 12 }}>
          Live Price
        </p>
      </div>
    </AbsoluteFill>
  )
}

function TickerCard({ price, change24h, accentColor }: { price: string; change24h: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 70 } })
  const opacity = interpolate(frame, [0, 20, 210, 240], [0, 1, 1, 0])
  const slideY = interpolate(enter, [0, 1], [25, 0])
  const isPositive = !change24h.startsWith('-')
  const changeColor = isPositive ? '#22c55e' : '#ef4444'
  const priceFlash = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.8, 1])

  const candleCount = 12
  const candles = Array.from({ length: candleCount }).map((_, i) => {
    const h = 20 + Math.random() * 120 + Math.sin(i * 1.5 + frame * 0.02) * 40
    const positive = Math.random() > 0.4
    return { height: h, color: positive ? '#22c55e' : '#ef4444', delay: 40 + i * 15 }
  })

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, transform: `translateY(${slideY}px)`, width: '100%', padding: '0 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{
            color: '#ffffff', fontSize: 72, fontWeight: 900,
            fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1,
            opacity: priceFlash,
          }}>
            ${price}
          </p>
          <p style={{
            color: changeColor, fontSize: 32, fontWeight: 700,
            fontFamily: 'system-ui, sans-serif', margin: '8px 0 0',
          }}>
            {change24h}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 600, fontFamily: 'system-ui, sans-serif', marginTop: 4 }}>
            24h Change
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 8, height: 160 }}>
          {candles.map((c, i) => (
            <CandleBar key={i} height={Math.abs(c.height)} color={c.color} delay={c.delay} frame={frame} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}

function DetailCard({ marketCap, accentColor }: { marketCap: string; accentColor: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 60 } })
  const opacity = interpolate(frame, [0, 15, 90, 120], [0, 1, 1, 0])
  const scale = interpolate(enter, [0, 1], [0.6, 1])

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Market Cap
        </span>
        <p style={{ color: accentColor, fontSize: 64, fontWeight: 900, fontFamily: 'system-ui, sans-serif', margin: '16px 0 0', lineHeight: 1 }}>
          ${marketCap}
        </p>
      </div>
    </AbsoluteFill>
  )
}

export const CryptoUpdateSchema = {
  coinName: { type: 'text' as const, label: 'Coin Name', required: true },
  price: { type: 'text' as const, label: 'Price', required: true },
  change24h: { type: 'text' as const, label: '24h Change', required: true },
  marketCap: { type: 'text' as const, label: 'Market Cap', required: true },
  bgColor: { type: 'color' as const, label: 'Background Color', default: '#0b0f1a' },
  accentColor: { type: 'color' as const, label: 'Accent Color', default: '#f7931a' },
  textColor: { type: 'color' as const, label: 'Text Color', default: '#ffffff' },
}

export const Composition: React.FC<{
  coinName: string; price: string; change24h: string; marketCap: string
  bgColor?: string; accentColor?: string; textColor?: string
}> = ({ coinName, price, change24h, marketCap, bgColor = '#0b0f1a', accentColor = '#f7931a', textColor = '#ffffff' }) => {
  const frame = useCurrentFrame()
  const scanline = interpolate(frame % 4, [0, 3], [0, 3])

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${bgColor} 0%, #141c2b 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, #ffffff 2px, #ffffff 4px)` }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, transform: `translateY(${scanline}px)` }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ position: 'absolute', left: `${(i * 91 + 40) % 100}%`, top: `${(i * 173 + 20) % 100}%`, color: accentColor, fontSize: 10, fontFamily: '"JetBrains Mono", monospace', opacity: 0.2 + Math.sin(frame * 0.01 + i) * 0.1 }}>
            {Math.random().toString(16).slice(2, 10)}
          </span>
        ))}
      </div>
      <Sequence from={0} durationInFrames={HEADER_DURATION}>
        <HeaderCard coinName={coinName} accentColor={accentColor} />
      </Sequence>
      <Sequence from={HEADER_DURATION} durationInFrames={TICKER_DURATION}>
        <TickerCard price={price} change24h={change24h} accentColor={accentColor} />
      </Sequence>
      <Sequence from={HEADER_DURATION + TICKER_DURATION} durationInFrames={DETAIL_DURATION}>
        <DetailCard marketCap={marketCap} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  )
}
