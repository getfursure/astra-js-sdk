import { Axios, AxiosResponse } from 'axios'
import { AuthResource } from '../auth'
import { AstraResponse } from '../../lib/AstraResponse'
import { AstraResponseError } from '../../lib/AstraResponseError'
import { AstraTransferResponse, AstraTransfersListResponse } from './types'

export * from './types'

/**
 * https://docs.astra.finance/#transfers
 */
export class TransfersResource {
  private _path = 'v1/transfers'

  protected _client: Axios
  protected _auth: AuthResource

  constructor(client: Axios, auth: AuthResource) {
    this._client = client
    this._auth = auth
  }

  async list(): Promise<AstraResponse<AstraTransfersListResponse>> {
    const response = await this._client.get<AstraTransfersListResponse, AxiosResponse<AstraTransfersListResponse>>(
      `${this._path}`,
      {
        headers: {
          Authorization: `Bearer ${this._auth.accessToken}`,
        },
      }
    )

    if (response.status > 200) {
      throw new AstraResponseError(response.statusText, response.status, response.data)
    }

    return response.data
  }

  async getById(id: string): Promise<AstraResponse<AstraTransferResponse>> {
    const response = await this._client.get<AstraTransferResponse, AxiosResponse<AstraTransferResponse>>(
      `${this._path}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this._auth.accessToken}`,
        },
      }
    )

    if (response.status > 200) {
      throw new AstraResponseError(response.statusText, response.status, response.data)
    }

    return response.data
  }

  async projected(): Promise<AstraResponse<AstraTransfersListResponse>> {
    const response = await this._client.get<AstraTransfersListResponse, AxiosResponse<AstraTransfersListResponse>>(
      `${this._path}/projected`,
      {
        headers: {
          Authorization: `Bearer ${this._auth.accessToken}`,
        },
      }
    )

    if (response.status > 200) {
      throw new AstraResponseError(response.statusText, response.status, response.data)
    }

    return response.data
  }
}
