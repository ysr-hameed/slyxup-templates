import React from 'react'
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

interface TextElement {
  id: string
  content: string
  fontFamily?: string
  fontSize?: number
  fontWeight?: number
  color?: string
  textAlign?: 'left' | 'center' | 'right'
  animation: string
  x: number
  y: number
  width: number
  height: number
}

interface BlankProps {
  elements?: TextElement[]
  backgroundColor?: string
}

export const BlankCompositionView: React.FC<BlankProps> = ({
  elements = [],
  backgroundColor = '#1a1a2e',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {elements.map((el) => {
        const opacity = el.animation === 'fade'
          ? Math.min(1, frame / 15)
          : el.animation === 'slide-up'
            ? Math.min(1, (frame - 5) / 10)
            : el.animation === 'zoom'
              ? Math.min(1, frame / 20)
              : 1

        const translateY = el.animation === 'slide-up'
          ? 20 * (1 - Math.min(1, (frame - 5) / 10))
          : 0

        const scale = el.animation === 'zoom'
          ? 0.5 + 0.5 * Math.min(1, frame / 20)
          : 1

        return (
          <div
            key={el.id}
            style={{
              position: 'absolute',
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: `${el.width}%`,
              height: `${el.height}%`,
              fontFamily: el.fontFamily || 'system-ui',
              fontSize: el.fontSize || 48,
              fontWeight: el.fontWeight || 700,
              color: el.color || '#ffffff',
              textAlign: el.textAlign || 'center',
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {el.content}
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
