import { Axios } from 'axios'
import { Intents } from './intents'

export class Users {
  private _client: Axios

  intents: Intents
  constructor(client: Axios) {
    this._client = client
    this.intents = new Intents(this._client)
  }
}
