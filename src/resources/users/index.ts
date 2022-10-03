import { Axios } from 'axios'
import { Intents } from './intents'
import { AuthResource } from '../auth'

export class Users {
  intents: Intents
  auth: AuthResource

  constructor(client: Axios, auth: AuthResource) {
    this.intents = new Intents(client, this.auth)
  }
}
