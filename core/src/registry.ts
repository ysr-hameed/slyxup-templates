import type { TemplateModule, TemplateDefinition } from './types.js'

export class TemplateRegistry {
  private loaders = new Map<string, () => Promise<TemplateModule>>()
  private cache = new Map<string, TemplateModule>()

  register(id: string, loader: () => Promise<TemplateModule>): void {
    this.loaders.set(id, loader)
  }

  async load(id: string): Promise<TemplateModule> {
    const cached = this.cache.get(id)
    if (cached) return cached

    const loader = this.loaders.get(id)
    if (!loader) {
      throw new Error(`Template not registered: ${id}`)
    }

    const module = await loader()
    this.cache.set(id, module)
    return module
  }

  getDefinition(id: string): TemplateDefinition | undefined {
    const cached = this.cache.get(id)
    if (!cached) return undefined
    const { manifest, Composition, schema, defaultProps } = cached
    return {
      id: manifest.id,
      name: manifest.name,
      description: manifest.description,
      category: manifest.category,
      platform: manifest.platform,
      format: manifest.format,
      durationInFrames: manifest.durationInFrames,
      fps: manifest.fps,
      width: manifest.dimensions.width,
      height: manifest.dimensions.height,
      schema,
      component: Composition,
      defaultProps,
      premium: manifest.premium,
      version: manifest.version,
      tags: manifest.tags,
    }
  }

  listDefinitions(): TemplateDefinition[] {
    return Array.from(this.cache.values()).map((m) => this.getDefinition(m.manifest.id)!)
  }

  loadedIds(): string[] {
    return Array.from(this.cache.keys())
  }

  registeredIds(): string[] {
    return Array.from(this.loaders.keys())
  }

  isLoaded(id: string): boolean {
    return this.cache.has(id)
  }

  preload(id: string): Promise<TemplateModule> {
    return this.load(id)
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const registry = new TemplateRegistry()
