import { registerTemplate } from '@slyxup/templates-core'
import type { TemplateManifest } from '@slyxup/templates-core'
import manifesto from '../manifest.json' with { type: 'json' }
import { Composition } from './Composition.js'

const manifest = manifesto as unknown as TemplateManifest

registerTemplate(manifest.id, async () => ({
  manifest,
  schema: manifest.schema,
  defaultProps: manifest.defaultProps,
  renderConfig: {
    fps: manifest.fps,
    durationInFrames: manifest.durationInFrames,
    width: manifest.dimensions.width,
    height: manifest.dimensions.height,
  },
  Composition,
}))

export { Composition, manifest }
export { MotivationalSchema } from './Composition.js'
