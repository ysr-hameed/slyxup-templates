export { registerTemplate, loadTemplate, getTemplate, listTemplates, registry } from '@slyxup/templates-core'
export type { TemplateModule, TemplateDefinition, PropSchema, PropSchemaType, PropSchemaField } from '@slyxup/templates-core'
export { PLATFORM_DIMENSIONS, PLATFORM_LABELS, FORMAT_LABELS } from '@slyxup/templates-core'
export { palette, font, spacing } from './niche/shared'

export {
  MorningMotivation, MorningMotivationSchema,
  SuccessStory, SuccessStorySchema,
  DailyQuote, DailyQuoteSchema,
  GoalVisualizer, GoalVisualizerSchema,
  AffirmationReel, AffirmationReelSchema,
  QuotePoster, QuotePosterSchema,
  VisionBoard, VisionBoardSchema,
} from './niche/motivational'
export {
  FinanceTip, FinanceTipSchema,
  StockMarketUpdate, StockMarketUpdateSchema,
  BudgetPlanner, BudgetPlannerSchema,
  WealthJourney, WealthJourneySchema,
  CryptoUpdate, CryptoUpdateSchema,
  SavingsGoal, SavingsGoalSchema,
  InvestmentSummary, InvestmentSummarySchema,
} from './niche/finance'
export {
  TechNews, TechNewsSchema,
  CodeTutorial, CodeTutorialSchema,
  GadgetReview, GadgetReviewSchema,
  DevLifeHack, DevLifeHackSchema,
  AIvsHuman, AIvsHumanSchema,
  TechSpecsCard, TechSpecsCardSchema,
  AppShowcase, AppShowcaseSchema,
} from './niche/tech'
export {
  WorkoutTip, WorkoutTipSchema,
  ExerciseDemo, ExerciseDemoSchema,
  NutritionGuide, NutritionGuideSchema,
  TransformationStory, TransformationStorySchema,
  RecoveryTip, RecoveryTipSchema,
  ExerciseCard, ExerciseCardSchema,
  ProgressTracker, ProgressTrackerSchema,
} from './niche/fitness'
export {
  MarketingTip, MarketingTipSchema,
  BrandStrategy, BrandStrategySchema,
  AdCopy, AdCopySchema,
  ContentStrategy, ContentStrategySchema,
  CaseStudy, CaseStudySchema,
  FunnelGraphic, FunnelGraphicSchema,
  BrandKit, BrandKitSchema,
} from './niche/marketing'
export {
  HistoryFact, HistoryFactSchema,
  Timeline, TimelineSchema,
  HistoricalFigure, HistoricalFigureSchema,
  InventionStory, InventionStorySchema,
  EraComparison, EraComparisonSchema,
  DidYouKnow, DidYouKnowSchema,
  EraSnapshot, EraSnapshotSchema,
} from './niche/history'
export {
  ScienceExplained, ScienceExplainedSchema,
  StudyTips, StudyTipsSchema,
  HowItWorks, HowItWorksSchema,
  MythBuster, MythBusterSchema,
  QuickFacts, QuickFactsSchema,
  FlashCard, FlashCardSchema,
  ConceptMap, ConceptMapSchema,
} from './niche/educational'
