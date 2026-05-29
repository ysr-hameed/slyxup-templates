export type PropSchemaType = 'text' | 'number' | 'color' | 'video' | 'audio' | 'list'

export type PropSchemaField = {
  type: PropSchemaType
  label: string
  required?: boolean
  default?: unknown
  itemType?: 'text' | 'number'
}

export type PropSchema = Record<string, PropSchemaField>

export type Platform = 'instagram' | 'youtube' | 'tiktok' | 'linkedin' | 'twitter' | 'generic'

export type TemplateFormat = 'reel' | 'story' | 'post' | 'shorts' | 'video' | 'carousel' | 'image'

export type TemplateCategory = 'image' | 'video'

export type TemplateStatus = 'active' | 'deprecated' | 'disabled'

export type TemplateManifest = {
  id: string
  slug: string
  name: string
  version: string
  description: string
  category: TemplateCategory
  platform: Platform
  format: TemplateFormat
  dimensions: { width: number; height: number }
  durationInFrames: number
  fps: number
  schema: PropSchema
  defaultProps: Record<string, unknown>
  tags: string[]
  thumbnail?: string
  premium: boolean
  entry: string
}

export type TemplateModule = {
  manifest: TemplateManifest
  schema: PropSchema
  defaultProps: Record<string, unknown>
  renderConfig: {
    fps: number
    durationInFrames: number
    width: number
    height: number
  }
  Composition: React.FC<any>
}

export type TemplateDefinition = {
  id: string
  name: string
  description: string
  category: TemplateCategory
  platform: Platform
  format: TemplateFormat
  durationInFrames: number
  fps: number
  width: number
  height: number
  schema: PropSchema
  component: React.FC<any>
  defaultProps: Record<string, unknown>
  premium: boolean
  version: string
  tags: string[]
}

export const PLATFORM_DIMENSIONS: Record<Platform, Record<TemplateFormat, { width: number; height: number }>> = {
  instagram: {
    reel: { width: 1080, height: 1920 },
    story: { width: 1080, height: 1920 },
    post: { width: 1080, height: 1080 },
    carousel: { width: 1080, height: 1080 },
    shorts: { width: 1080, height: 1920 },
    video: { width: 1920, height: 1080 },
    image: { width: 1080, height: 1080 },
  },
  youtube: {
    reel: { width: 1080, height: 1920 },
    story: { width: 1080, height: 1920 },
    post: { width: 1280, height: 720 },
    carousel: { width: 1080, height: 1080 },
    shorts: { width: 1080, height: 1920 },
    video: { width: 1920, height: 1080 },
    image: { width: 1280, height: 720 },
  },
  tiktok: {
    reel: { width: 1080, height: 1920 },
    story: { width: 1080, height: 1920 },
    post: { width: 1080, height: 1920 },
    carousel: { width: 1080, height: 1080 },
    shorts: { width: 1080, height: 1920 },
    video: { width: 1080, height: 1920 },
    image: { width: 1080, height: 1920 },
  },
  linkedin: {
    reel: { width: 1080, height: 1920 },
    story: { width: 1080, height: 1920 },
    post: { width: 1200, height: 627 },
    carousel: { width: 1080, height: 1080 },
    shorts: { width: 1080, height: 1920 },
    video: { width: 1920, height: 1080 },
    image: { width: 1200, height: 627 },
  },
  twitter: {
    reel: { width: 1080, height: 1920 },
    story: { width: 1080, height: 1920 },
    post: { width: 1280, height: 720 },
    carousel: { width: 1080, height: 1080 },
    shorts: { width: 1080, height: 1920 },
    video: { width: 1280, height: 720 },
    image: { width: 1280, height: 720 },
  },
  generic: {
    reel: { width: 1080, height: 1920 },
    story: { width: 1080, height: 1920 },
    post: { width: 1080, height: 1080 },
    carousel: { width: 1080, height: 1080 },
    shorts: { width: 1080, height: 1920 },
    video: { width: 1920, height: 1080 },
    image: { width: 1080, height: 1080 },
  },
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  generic: 'General',
}

export const FORMAT_LABELS: Record<TemplateFormat, string> = {
  reel: 'Reel',
  story: 'Story',
  post: 'Post',
  shorts: 'Shorts',
  video: 'Video',
  carousel: 'Carousel',
  image: 'Image',
}
