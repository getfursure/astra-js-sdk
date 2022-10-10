import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { omit } from 'lodash'
import transformRequest from '../../lib/utils/transformRequest'
import { AstraResponse } from '../../lib/AstraResponse'
import createUserIntentValidator from './validators/createUserIntentValidator'
import { AuthResource } from '../auth'
import { AstraResponseError } from '../../lib/AstraResponseError'

export interface UserIntentRequest {
  email: string
  phone: string
  firstName: string
  lastName: string
  preferredFirstName?: string
  preferredLastName?: string
  preferredPronouns?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  dateOfBirth: string
  ssn: string
  ipAddress: string
}

export interface CreateUserIntentResponse {
  id: string
}

export interface GetUserIntentResponse {
  id: string
}

export class Intents {
  protected _path = 'v1/user_intent'
  protected _client: Axios
  protected _authResource: AuthResource

  constructor(client: Axios, auth: AuthResource) {
    this._client = client
    this._authResource = auth
  }

  async create(request: UserIntentRequest): Promise<AstraResponse<CreateUserIntentResponse>> {
    const { validate, ajv } = createUserIntentValidator()

    if (!validate(request)) {
      throw new Error(ajv.errorsText(validate.errors))
    }
    try {
      // This request to astra has mixed casing, both snake and camel as seen in the omitted fields below
      const transformedRequest = {
        ...transformRequest(omit(request, ['address1', 'address2'])),
        address1: request.address1,
        address2: request.address2,
      } as UserIntentRequest

      const { data } = await this._client.post<
        CreateUserIntentResponse,
        AxiosResponse<CreateUserIntentResponse>,
        UserIntentRequest
      >(this._path, transformedRequest, {
        auth: this._authResource.basicAuth,
      })

      if (axios.isAxiosError(data)) {
        const responseError = data as AxiosError
        return { code: responseError.code, message: responseError.message, status: responseError.status }
      }
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getById(id: string): Promise<AstraResponse<GetUserIntentResponse>> {
    if (!id) {
      throw new Error('Missing required user intent id')
    }
    try {
      const response = await this._client.get<GetUserIntentResponse, AxiosResponse<GetUserIntentResponse>>(
        `${this._path}/${id}`,
        {
          auth: this._authResource.basicAuth,
        }
      )

      if (response.status > 200) {
        throw new AstraResponseError(response.statusText, response.status, response.data)
      }

      return response.data
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
