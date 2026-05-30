export { BlankCompositionView } from './BlankCompositionView.js'

export const Composition = BlankCompositionView

export const manifest = {
  id: 'blank',
  name: 'Blank Template',
  description: 'Start from scratch with a blank canvas',
  tags: ['custom'],
  defaultProps: {},
  durationInFrames: 900,
  fps: 30,
  width: 1080,
  height: 1920,
}

export const renderConfig = {
  fps: 30,
  durationInFrames: 900,
  width: 1080,
  height: 1920,
}

export const defaultProps = {}
