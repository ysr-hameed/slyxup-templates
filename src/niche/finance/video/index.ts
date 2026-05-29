import { registerTemplate } from '@slyxup/templates-core'
import type { TemplateManifest } from '@slyxup/templates-core'
import { Composition } from './Composition'

const manifest: TemplateManifest = {
  id: 'finance-tip',
  slug: 'finance-tip',
  name: 'Finance Tip',
  version: '1.0.0',
  description: 'Animated finance tip with title and stat for investing/savings content',
  category: 'video',
  platform: 'generic',
  format: 'video',
  dimensions: { width: 1080, height: 1920 },
  durationInFrames: 900,
  fps: 30,
  schema: {
    title: { type: 'text', label: 'Title', required: true },
    tip: { type: 'text', label: 'Tip', required: true },
    stat: { type: 'text', label: 'Stat/Number', required: false },
    bgColor: { type: 'color', label: 'Background Color', default: '#0a1628' },
    accentColor: { type: 'color', label: 'Accent Color', default: '#10b981' },
    textColor: { type: 'color', label: 'Text Color', default: '#ffffff' },
  },
  defaultProps: {
    title: 'Investing Tip',
    tip: 'Start investing early to take advantage of compound interest',
    stat: '15% avg annual return',
    bgColor: '#0a1628',
    accentColor: '#10b981',
    textColor: '#ffffff',
  },
  tags: ['finance', 'investing', 'savings', 'wealth', 'animated'],
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
export { FinanceTipSchema } from './Composition'
