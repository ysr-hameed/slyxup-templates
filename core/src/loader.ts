import { registry } from './registry.js'
import type { TemplateModule, TemplateDefinition } from './types.js'

export function registerTemplate(id: string, loader: () => Promise<TemplateModule>): void {
  registry.register(id, loader)
}

export async function loadTemplate(id: string): Promise<TemplateModule> {
  return registry.load(id)
}

export function getTemplate(id: string): TemplateDefinition | undefined {
  return registry.getDefinition(id)
}

export function listTemplates(): TemplateDefinition[] {
  return registry.listDefinitions()
}

export { registry }
export type { TemplateModule, TemplateDefinition }
export * from './types.js'
