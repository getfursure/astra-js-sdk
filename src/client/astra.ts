import axios, { Axios } from 'axios';
import { Users } from "../users";

export enum BaseURL {
  Sandbox = "https://api-sandbox.astra.finance",
  Production = "https://api.astra.finance"
}
export interface AstraClientOptions {
  clientId: string,
  clientSecret: string,
  baseUrl: BaseURL
}

export class Astra {
  private _baseUrl: string;
  private _clientId: string;
  private _clientSecret: string;
  private _client: Axios;
  users: Users;

  constructor(options: AstraClientOptions) {
    if (!options) {
      throw Error("AstraClientOptions are required to configure the client. Please pass the options object to the constructor.")
    }

    const { clientId, clientSecret, baseUrl } = options;

    if (clientId == null) {
      throw Error("Client ID is required. You can find it at https://dashboard.astra.finance")
    }

    if (clientSecret == null) {
      throw Error("Client Secret is required. You can find it at https://dashboard.astra.finance")
    }

    if (baseUrl == null) {
      throw Error("Base URL is required. You can find the available options at https://docs.astra.finance/#introduction")
    }

    if (baseUrl as string != "https://api.astra.finance" && baseUrl as string != "https://api-sandbox.astra.finance") {
      throw Error("Invalid Base URL value. You can find the available options at https://docs.astra.finance/#introduction")
    }

    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._baseUrl = baseUrl

    this._initHttpClient();
    this._initResources();
  }

  private _initHttpClient = () => {
    this._client = new axios.Axios({
      baseURL: this._baseUrl, auth: { username: this._clientId, password: this._clientSecret },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      transformRequest: [function (data) {
        return JSON.stringify(data);
      }]
    })
  }

  private _initResources = () => {
    this.users = new Users(this._client);
  }
}