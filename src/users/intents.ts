import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import Ajv from "ajv";
import { snakeCase } from 'lodash';
import { AstraError } from "../lib/AstraError";
import { AstraResponse } from "../lib/AstraResponse";

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
      const ajv = new Ajv({ allErrors: true });

      const schema = {
        type: "object",
        properties: {
          email: { type: "string" },
          phone: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          preferredFirstName: { type: "string", nullable: true },
          preferredLastName: { type: "string", nullable: true },
          preferredPronouns: { type: "string", nullable: true },
          address1: { type: "string" },
          address2: { type: "string", nullable: true },
          city: { type: "string" },
          state: { type: "string" },
          postalCode: { type: "string" },
          dateOfBirth: { type: "string" },
          ssn: { type: "string" },
          ipAddress: { type: "string" }
        },
        required: ["email", "phone", "firstName", "lastName", "address1", "city", "state", "postalCode", "dateOfBirth", "ssn", "ipAddress"],
        additionalProperties: false,
      }

      const validate = ajv.compile(schema);

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