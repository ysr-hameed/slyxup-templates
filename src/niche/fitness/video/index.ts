import { registerTemplate } from '@slyxup/templates-core'
import type { TemplateManifest } from '@slyxup/templates-core'
import { Composition } from './Composition'

const manifest: TemplateManifest = {
  id: 'workout-tip',
  slug: 'workout-tip',
  name: 'Workout Tip',
  version: '1.0.0',
  description: 'Exercise tip with animated intensity bar and fitness aesthetic',
  category: 'video',
  platform: 'generic',
  format: 'video',
  dimensions: { width: 1080, height: 1920 },
  durationInFrames: 900,
  fps: 30,
  schema: {
    exercise: { type: 'text', label: 'Exercise Name', required: true },
    tip: { type: 'text', label: 'Tip/Description', required: true },
    duration: { type: 'text', label: 'Duration/Reps', required: false },
    bgColor: { type: 'color', label: 'Background Color', default: '#1a0a0a' },
    accentColor: { type: 'color', label: 'Accent Color', default: '#f97316' },
    textColor: { type: 'color', label: 'Text Color', default: '#ffffff' },
  },
  defaultProps: {
    exercise: 'Push-ups',
    tip: 'Keep your core tight and lower your chest until elbows are at 90 degrees',
    duration: '3 sets × 12 reps',
    bgColor: '#1a0a0a',
    accentColor: '#f97316',
    textColor: '#ffffff',
  },
  tags: ['fitness', 'workout', 'exercise', 'health', 'animated'],
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
export { WorkoutTipSchema } from './Composition'
