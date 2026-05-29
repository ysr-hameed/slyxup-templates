import { registerTemplate } from '@slyxup/templates-core'
import type { TemplateManifest } from '@slyxup/templates-core'
import { Composition } from './Composition'

const manifest: TemplateManifest = {
  id: 'history-fact',
  slug: 'history-fact',
  name: 'History Fact',
  version: '1.0.0',
  description: 'History fact with vintage paper aesthetic and dramatic reveal',
  category: 'video',
  platform: 'generic',
  format: 'video',
  dimensions: { width: 1080, height: 1920 },
  durationInFrames: 900,
  fps: 30,
  schema: {
    year: { type: 'text', label: 'Year', required: true },
    fact: { type: 'text', label: 'Fact', required: true },
    significance: { type: 'text', label: 'Significance', required: false },
    bgColor: { type: 'color', label: 'Background Color', default: '#1c1108' },
    accentColor: { type: 'color', label: 'Accent Color', default: '#d4a574' },
    textColor: { type: 'color', label: 'Text Color', default: '#f5e6d3' },
  },
  defaultProps: {
    year: '1969',
    fact: "The first message sent over ARPANET was 'LO' — intended to be 'LOGIN', but the system crashed after two letters",
    significance: 'This was the birth of the internet',
    bgColor: '#1c1108',
    accentColor: '#d4a574',
    textColor: '#f5e6d3',
  },
  tags: ['history', 'education', 'facts', 'vintage', 'animated'],
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
export { HistoryFactSchema } from './Composition'
