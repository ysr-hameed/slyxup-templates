export { registerTemplate, loadTemplate, getTemplate, listTemplates, registry } from '@slyxup/templates-core'
export type { TemplateModule, TemplateDefinition, PropSchema, PropSchemaType, PropSchemaField } from '@slyxup/templates-core'
export { PLATFORM_DIMENSIONS, PLATFORM_LABELS, FORMAT_LABELS } from '@slyxup/templates-core'

export { palette, font, spacing } from './niche/shared'

export {
  MotivationQuote,
  MotivationQuote as MotivationalTemplate,
  MotivationalSchema,
} from './niche/motivational'

export {
  AiFacts,
  AiFacts as AiFactsTemplate,
  AiFactsSchema,
} from './niche/educational'

export {
  FinanceTip,
  FinanceTip as FinanceTipTemplate,
  FinanceTipSchema,
} from './niche/finance'

export {
  TechNews,
  TechNews as TechNewsTemplate,
  TechNewsSchema,
} from './niche/tech'

export {
  WorkoutTip,
  WorkoutTip as WorkoutTipTemplate,
  WorkoutTipSchema,
} from './niche/fitness'

export {
  MarketingTip,
  MarketingTip as MarketingTipTemplate,
  MarketingTipSchema,
} from './niche/marketing'

export {
  HistoryFact,
  HistoryFact as HistoryFactTemplate,
  HistoryFactSchema,
} from './niche/history'
