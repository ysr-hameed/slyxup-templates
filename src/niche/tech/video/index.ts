import { registerTemplate } from '@slyxup/templates-core'
import type { TemplateManifest } from '@slyxup/templates-core'
import { Composition } from './Composition'

const manifest: TemplateManifest = {
  id: 'tech-news',
  slug: 'tech-news',
  name: 'Tech News',
  version: '1.0.0',
  description: 'Tech news headline with animated code/grid background',
  category: 'video',
  platform: 'generic',
  format: 'video',
  dimensions: { width: 1080, height: 1920 },
  durationInFrames: 900,
  fps: 30,
  schema: {
    headline: { type: 'text', label: 'Headline', required: true },
    summary: { type: 'text', label: 'Summary', required: true },
    source: { type: 'text', label: 'Source', required: false },
    bgColor: { type: 'color', label: 'Background Color', default: '#0d1117' },
    accentColor: { type: 'color', label: 'Accent Color', default: '#58a6ff' },
    textColor: { type: 'color', label: 'Text Color', default: '#ffffff' },
  },
  defaultProps: {
    headline: 'AI Breakthrough in 2024',
    summary: 'New model achieves human-level reasoning on complex benchmarks',
    source: 'TechCrunch',
    bgColor: '#0d1117',
    accentColor: '#58a6ff',
    textColor: '#ffffff',
  },
  tags: ['tech', 'news', 'coding', 'ai', 'animated'],
  premium: false,
  entry: './dist/index.js',
}

registerTemplate(manifest.id, async () => ({
  manifest,
  schema: manifest.schema,
  defaultProps: manifest.defaultProps,
  renderConfig: { fps: manifest.fps, durationInFrames: manifest.durationInFrames, width: manifest.dimensions.width, height: manifest.dimensions.height },
  Composition,
}))

export { Composition, manifest }
export { TechNewsSchema } from './Composition'
