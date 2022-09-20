import { AstraError } from './AstraError'

export type AstraResponse<T> = T | AstraError
