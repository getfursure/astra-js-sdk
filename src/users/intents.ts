import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { AstraResponse } from "../lib/AstraResponse";

export interface UserIntentRequest {
  email: string,
  phone: string,
  first_name: string,
  last_name: string,
  preferred_first_name?: string,
  preferred_last_name?: string,
  preferred_pronouns?: string,
  address1: string,
  address2?: string,
  city: string,
  state: string,
  postal_code: string,
  date_of_birth: string,
  ssn: string,
  ip_address: string
}

export interface CreateUserIntentResponse {
  id: string
}

export class Intents {
  private _path = "/v1/user_intent/";

  private _client: Axios;
  constructor(client: Axios) {
    this._client = client;
  }

  async create(request: UserIntentRequest): Promise<AstraResponse<CreateUserIntentResponse>> {
    try {
      const response = await this._client
        .post<CreateUserIntentResponse, AxiosResponse<CreateUserIntentResponse>, UserIntentRequest>(this._path, request);
      if (axios.isAxiosError(response)) {
        const responseError = response as AxiosError;
        return { code: responseError.code, message: responseError.message, status: responseError.status }
      }
      return response.data;
    } catch (e) {
      return { code: "", message: "" }
    }
  }
}