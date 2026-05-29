export { registerTemplate, loadTemplate, getTemplate, listTemplates, registry } from '@slyxup/templates-core'
export type { TemplateModule, TemplateDefinition, PropSchema, PropSchemaType, PropSchemaField } from '@slyxup/templates-core'
export { PLATFORM_DIMENSIONS, PLATFORM_LABELS, FORMAT_LABELS } from '@slyxup/templates-core'
export { palette, font, spacing } from './niche/shared'

export {
  Composition as MotivationalQuote, MotivationalSchema as MotivationalQuoteSchema,
  VisionBoard, VisionBoardSchema,
} from './niche/motivational'
export {
  Composition as FinanceTip, FinanceTipSchema,
  InvestmentSummary, InvestmentSummarySchema,
} from './niche/finance'
export {
  Composition as TechNews, TechNewsSchema,
  AppShowcase, AppShowcaseSchema,
} from './niche/tech'
export {
  Composition as WorkoutTip, WorkoutTipSchema,
  ProgressTracker, ProgressTrackerSchema,
} from './niche/fitness'
export {
  Composition as MarketingTip, MarketingTipSchema,
  BrandKit, BrandKitSchema,
} from './niche/marketing'
export {
  Composition as HistoryFact, HistoryFactSchema,
  EraSnapshot, EraSnapshotSchema,
} from './niche/history'
export {
  Composition as AiFacts, AiFactsSchema,
  ConceptMap, ConceptMapSchema,
} from './niche/educational'
