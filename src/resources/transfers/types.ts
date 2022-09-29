import { RoutinePaymentType, RoutineType } from '../routines'

export type TransferStatus = 'cancelled' | 'pending' | 'failed' | 'processed'

export interface AstraTransferResponse {
  id: string
  routine_name: string
  routine_id: string
  routine_type: RoutineType
  source_id: string
  payment_type: RoutinePaymentType
  status: TransferStatus
  destination_id: string
  amount: number
  updated: string
  estimated_clearing_date: string
  initiated: string
}

export interface AstraTransfersListResponse {
  count: number
  transfers: AstraTransferResponse[]
}

export interface AstraGetTransferRequest {
  id: string
}
