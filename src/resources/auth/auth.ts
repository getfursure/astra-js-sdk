import { Axios } from 'axios'
import {AstraResponse} from "../../lib/AstraResponse";
import {AstraResponseError} from "../../lib/AstraResponseError";

export interface AstraCreateAccessTokenRequest {
  code: string
  redirect_uri: string
  request_id: string | undefined
}

export interface AstraAccessTokenResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

export class AuthResource {
  protected _path = 'v1/oauth/token'

  protected _client: Axios
  protected _clientId: string
  protected _clientSecret: string

  // Public to allow other systems to set the value from storage (e.g. database or localstorage) without needing to call createAccessToken
  accessToken: string | undefined

  constructor(client: Axios, clientId: string, clientSecret: string) {
    this._client = client
    this._clientId = clientId
    this._clientSecret = clientSecret
  }

  async createAccessToken(request: AstraCreateAccessTokenRequest): Promise<AstraResponse<AstraAccessTokenResponse>> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    if (request.request_id != null) {
      headers['request_id'] = request.request_id
    }

    const response = await this._client.post(
      `${this._path}`,
      `grant_type=authorization_code&code=${request.code}&redirect_uri=${request.redirect_uri}`,
      {
        headers,
        auth: {
          username: this._clientId,
          password: this._clientSecret,
        },
      }
    )

    if (response.status > 201) {
      throw new AstraResponseError(response.statusText, response.status, response.data)
    }

    this.accessToken = response.data.access_token

    return response.data
  }
}
