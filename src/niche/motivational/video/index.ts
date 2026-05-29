import { registerTemplate } from '@slyxup/templates-core'
import type { TemplateManifest } from '@slyxup/templates-core'
import { Composition } from './Composition'

const manifest: TemplateManifest = {
  id: 'motivational-quote',
  slug: 'motivational-quote',
  name: 'Motivational Quote',
  version: '1.0.0',
  description: 'Full-screen quote with animated text overlay',
  category: 'video',
  platform: 'generic',
  format: 'video',
  dimensions: { width: 1080, height: 1920 },
  durationInFrames: 150,
  fps: 30,
  schema: {
    quote: { type: 'text', label: 'Quote', required: true },
    author: { type: 'text', label: 'Author', required: true },
    textColor: { type: 'color', label: 'Text Color', default: '#ffffff' },
  },
  defaultProps: { quote: 'Stay hungry', author: 'Steve Jobs', textColor: '#ffffff' },
  tags: ['motivational', 'quote', 'animated'],
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
export { MotivationalSchema } from './Composition'
