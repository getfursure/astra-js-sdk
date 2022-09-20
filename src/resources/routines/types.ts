export type RoutineStatuses =
  | 'requires_user_verification'
  | 'pending_account_authorization'
  | 'user_suspended'
  | 'active'
  | 'inactive'
  | 'cancelled'
  | 'failed'
  | 'completed'

export type RoutineType = 'one-time' | 'recurring' | 'sweep'
export type RoutinePaymentType = 'ach' | 'debit' | 'ledger'

export interface AstraRoutineResponse {
  id: string
  type: RoutineType
  name: string
  payment_type: RoutinePaymentType
  source_id: string
  destination_id: string
  destination_user_id: string
  amount: number
  start_date: string // Date format yyyy-mm-dd
  preferred_settlement_speed: string
  frequency: string
  client_correlation_id: string
  active: boolean
  status: RoutineStatuses
  created: string // eg. '2020-01-15T15:12:04.746260'
}

export interface AstraGetRoutineRequest {
  id: string
}

/**
 * https://docs.astra.finance/#create-a-new-routine
 */
export interface AstraCreateRoutineRequest {
  type: RoutineType
  name: string
  payment_type: RoutinePaymentType
  source_id: string
  destination_id: string
  destination_user_id?: string
  amount: number
  start_date?: string // Date format yyyy-mm-dd
  preferred_settlement_speed?: string
  frequency?: string
  threshold?: number
  spending?: string
  amount_start?: number
  client_correlation_id?: string
  status?: RoutineStatuses
  amount_increment?: number
  minimum_transaction_threshold?: number
  percent_of_transaction?: number
  percent_of_balance?: number
  customer_debit_fee_percent_override?: number
}
