/**
 * Type definitions for the Credex Project
 */

/**
 * Plan pricing interface - supports both subscription and token-based pricing
 */
export interface Plan {
  id: string;
  name: string;
  price_monthly?: number | null;
  price_annual?: number | null;
  input_per_1M?: number | null;
  output_per_1M?: number | null;
  notes?: string;
}

/**
 * AI Model/Product interface
 */
export interface Model {
  id: number;
  product: string;
  category: string;
  website: string;
  image: string;
  plans: Plan[];
}

/**
 * Selected plan from user's form
 */
export interface SelectedPlan {
  model: string;
  plan: string;
  price_monthly: number | string;
}

/**
 * Model analysis for audit result
 */
export interface ModelAnalysis {
  name: string;
  currentPlan: string;
  current_plan?: string; // fallback key
  suggestedPlan: string;
  suggested_plan?: string; // fallback key
  accuracy: number;
  speed: number;
  cost: number;
  note: string;
  currentPrice: number;
  suggestedPrice: number;
  currentPerformance: number;
  suggestedPerformance: number;
  comparisonNote: string;
}

/**
 * Audit request payload
 */
export interface AuditRequest {
  selected_plans: SelectedPlan[];
  primary_use: string[];
  team_size: number | string;
}

/**
 * Audit result from backend
 */
export interface AuditResult {
  id?: string;
  auditId?: string;
  score: number;
  teamSize?: number;
  team_size?: number; // fallback key
  useCase?: string;
  use_case?: string; // fallback key
  models?: string[];
  modelAnalysis: ModelAnalysis[];
  summary: string;
  recommendations: string[];
  above500?: boolean; // indicates if savings > $500
}

/**
 * API response wrapper for audit
 */
export interface AuditResponse {
  result?: AuditResult;
  auditId?: string;
  [key: string]: any;
}

/**
 * Form data for audit submission
 */
export interface AuditFormData {
  selected_plans: string[];
  team_size: string | number;
  primary_use: string[];
}

/**
 * Pricing card props
 */
export interface PricingCardProps {
  data: Plan;
}

/**
 * Metric for performance display
 */
export interface PerformanceMetric {
  label: string;
  val: number;
}
