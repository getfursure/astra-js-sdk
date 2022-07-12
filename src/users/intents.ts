import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { snakeCase } from 'lodash';
import { AstraError } from "../lib/AstraError";
import { AstraResponse } from "../lib/AstraResponse";
import createUserIntentValidator from "./validators/createUserIntentValidator";

export interface UserIntentRequest {
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  preferredFirstName?: string,
  preferredLastName?: string,
  preferredPronouns?: string,
  address1: string,
  address2?: string,
  city: string,
  state: string,
  postalCode: string,
  dateOfBirth: string,
  ssn: string,
  ipAddress: string
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
      const { validate, ajv } = createUserIntentValidator();

      if (!validate(request)) {
        throw new Error(ajv.errorsText(validate.errors))
      }

      const response = await this._client
        .post<CreateUserIntentResponse, AxiosResponse<CreateUserIntentResponse | AstraError>, UserIntentRequest>(this._path, request);
      if (axios.isAxiosError(response)) {
        const responseError = response as AxiosError;
        return { code: responseError.code, message: responseError.message, status: responseError.status }
      }
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}