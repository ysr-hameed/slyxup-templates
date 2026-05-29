import { registerTemplate } from '@slyxup/templates-core'
import type { TemplateManifest } from '@slyxup/templates-core'
import { Composition } from './Composition'

const manifest: TemplateManifest = {
  id: 'marketing-tip',
  slug: 'marketing-tip',
  name: 'Marketing Tip',
  version: '1.0.0',
  description: 'Business/marketing tip with clean card layout and brand accent',
  category: 'video',
  platform: 'generic',
  format: 'video',
  dimensions: { width: 1080, height: 1920 },
  durationInFrames: 900,
  fps: 30,
  schema: {
    hook: { type: 'text', label: 'Hook', required: true },
    tip: { type: 'text', label: 'Tip', required: true },
    result: { type: 'text', label: 'Expected Result', required: false },
    bgColor: { type: 'color', label: 'Background Color', default: '#0f0a1a' },
    accentColor: { type: 'color', label: 'Accent Color', default: '#a855f7' },
    textColor: { type: 'color', label: 'Text Color', default: '#ffffff' },
  },
  defaultProps: {
    hook: 'Stop guessing. Start growing.',
    tip: 'Use A/B testing on your ad creatives — test one variable at a time for statistically significant results',
    result: '↑ 40% higher conversion',
    bgColor: '#0f0a1a',
    accentColor: '#a855f7',
    textColor: '#ffffff',
  },
  tags: ['marketing', 'business', 'growth', 'social-media', 'animated'],
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
export { MarketingTipSchema } from './Composition'
