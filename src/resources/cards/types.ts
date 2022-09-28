export interface AstraCard {
  card_number: string
  card_security_code: string
  first_name: string
  last_name: string
  expiration_date: string
  zip_code?: string
  added_by_user?: boolean
}

export interface AstraListCardsResponse {
  cards: AstraCard[]
  count: number
}
