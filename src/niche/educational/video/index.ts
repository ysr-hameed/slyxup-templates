import { registerTemplate } from '@slyxup/templates-core'
import type { TemplateManifest } from '@slyxup/templates-core'
import { Composition } from './Composition'

const manifest: TemplateManifest = {
  id: 'ai-facts',
  slug: 'ai-facts',
  name: 'AI Facts / Subtitle Video',
  version: '1.0.0',
  description: 'Multiple facts with animated subtitle cards',
  category: 'video',
  platform: 'tiktok',
  format: 'video',
  dimensions: { width: 1080, height: 1920 },
  durationInFrames: 450,
  fps: 30,
  schema: {
    title: { type: 'text', label: 'Title', required: false },
    facts: { type: 'list', label: 'Facts', itemType: 'text', required: true },
  },
  defaultProps: { title: 'AI Facts', facts: ['Fact one', 'Fact two'] },
  tags: ['ai', 'facts', 'subtitle', 'educational'],
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
export { AiFactsSchema } from './Composition'
