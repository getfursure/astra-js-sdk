import { Axios, AxiosResponse } from 'axios'
import { AuthResource } from '../auth'
import { AstraResponse } from '../../lib/AstraResponse'
import { AstraResponseError } from '../../lib/AstraResponseError'
import { AstraCreateRoutineRequest, AstraGetRoutineRequest, AstraRoutineResponse } from './types'

export * from './types'

/**
 * https://docs.astra.finance/#routine-endpoints
 */
export class RoutinesResource {
  private _path = 'v1/routines'

  protected _client: Axios
  protected _auth: AuthResource

  constructor(client: Axios, auth: AuthResource) {
    this._client = client
    this._auth = auth
  }

  async getSpecific(request: AstraGetRoutineRequest): Promise<AstraResponse<AstraRoutineResponse>> {
    const response = await this._client.get<AstraRoutineResponse, AxiosResponse<AstraRoutineResponse>>(
      `${this._path}/${request.id}`,
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

  async create(request: AstraCreateRoutineRequest): Promise<AstraResponse<AstraRoutineResponse>> {
    const response = await this._client.post<AstraRoutineResponse, AxiosResponse<AstraRoutineResponse>>(
      this._path,
      request,
      {
        headers: {
          Authorization: `Bearer ${this._auth.accessToken}`,
        },
      }
    )
    if (response.status > 201) {
      throw new AstraResponseError(response.statusText, response.status, response.data)
    }

    return response.data
  }
}
