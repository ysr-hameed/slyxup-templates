export type PropSchema = Record<string, {
  type: 'text' | 'number' | 'color' | 'video' | 'audio' | 'list'
  label: string
  required?: boolean
  default?: unknown
  itemType?: 'text' | 'number'
}>
