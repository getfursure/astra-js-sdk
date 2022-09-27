import { AstraCard, AstraListCardsResponse } from './types'
import { Axios, AxiosResponse } from 'axios'

import { AstraResponse } from '../../lib/AstraResponse'
import { AstraResponseError } from '../../lib/AstraResponseError'
import { AuthResource } from '../auth'

/**
 * https://docs.astra.finance/#cards
 */
export class CardsResource {
  protected _path = 'v1/cards'

  protected _client: Axios
  protected _auth: AuthResource

  constructor(client: Axios, auth: AuthResource) {
    this._client = client
    this._auth = auth
  }

  /**
   * Retrieve all Debit Cards for a user.
   */
  async listCards(): Promise<AstraResponse<AstraCard[]>> {
    const headers: { [key: string]: string } = {
      Authorization: `Bearer ${this._auth.accessToken}`,
    }

    const response = await this._client.get<AstraListCardsResponse, AxiosResponse<AstraListCardsResponse>>(
      `${this._path}`,
      {
        headers,
      }
    )

    if (response.status > 201) {
      throw new AstraResponseError(response.statusText, response.status, response.data)
    }

    return response.data.cards
  }

  /**
   * Retrieve a specific Debit Card for a User based on the unique Card ID.
   */
  async getCard(cardId: string): Promise<AstraResponse<AstraCard>> {
    const headers: { [key: string]: string } = {
      Authorization: `Bearer ${this._auth.accessToken}`,
    }

    const response = await this._client.get<AstraCard, AxiosResponse<AstraCard>>(`${this._path}/${cardId}`, {
      headers,
    })

    if (response.status > 201) {
      throw new AstraResponseError(response.statusText, response.status, response.data)
    }

    return response.data
  }

  /**
   * Deletes a debit card by way of a card's unique ID
   * A card can only be deleted if there are no active routines or pending transfers associated with it.
   * */
  async deleteCard(cardId: string): Promise<AstraResponse<null>> {
    const headers: { [key: string]: string } = {
      Authorization: `Bearer ${this._auth.accessToken}`,
    }

    const response = await this._client.delete<null, AxiosResponse<null>>(`${this._path}/${cardId}`, {
      headers,
    })

    if (response.status > 201) {
      throw new AstraResponseError(response.statusText, response.status, response.data)
    }

    return response.data
  }
}
