import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { omit } from "lodash";
import transformRequest from '../lib/utils/transformRequest';
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
  private _path = "v1/user_intent";

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

      // This request to astra has mixed casing, both snake and camel as seen in the omitted fields below
      const transformedRequest = { ...transformRequest(omit(request, ["address1", "address2"])), address1: request.address1, address2: request.address2 } as UserIntentRequest;

      const { data } = await this._client
        .post<CreateUserIntentResponse, AxiosResponse<CreateUserIntentResponse>, UserIntentRequest>(this._path, transformedRequest);

      if (axios.isAxiosError(data)) {
        const responseError = data as AxiosError;
        return { code: responseError.code, message: responseError.message, status: responseError.status }
      }
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}