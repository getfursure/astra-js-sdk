import { Intents } from './intents'
import { AuthResource } from '../auth'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Astra, BaseURL } from '../../client/astra'

describe('Users > intents', () => {
  let mockAxios
  let astraClient
  beforeAll(() => {
    mockAxios = new MockAdapter(axios)
    astraClient = new Astra({
      clientId: '1',
      clientSecret: '2',
      baseUrl: BaseURL.Sandbox,
    })
  })

  afterEach(() => {
    mockAxios.reset()
  })

  describe('getById()', () => {
    it('returns a user intent', async () => {
      // given
      const data = {
        id: '1a908838d703473ab52e6884c001e447',
        user_id: '40e61a9e48384c00173ab528d7038847',
        email: 'sir.edmund.hillary@gmail.com',
        phone: '+15557771234',
        first_name: 'Edmund',
        last_name: 'Hillary',
        preferred_first_name: 'Ed',
        preferred_last_name: 'Hill',
        preferred_pronouns: 'He/Him',
        status: 'approved',
      }

      mockAxios
        .onGet(`${BaseURL.Sandbox}/v1/user_intent/1a908838d703473ab52e6884c001e447`)
        .reply(200, JSON.stringify(data))

      // when
      const result = await astraClient.users.intents.getById('1a908838d703473ab52e6884c001e447')

      // then
      expect(result).toEqual(data)
      expect(mockAxios.history.get[0].url).toEqual(`v1/user_intent/1a908838d703473ab52e6884c001e447`)
    })
  })
  describe('create', () => {
    it('throws if a required request parameter is missing', async () => {
      const intents = new Intents(mockAxios, new AuthResource(mockAxios, '1', '2'))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const create = () => intents.create({ email: 'test@test.com' } as any)
      await expect(create()).rejects.toThrowError(
        "data must have required property 'phone', data must have required property 'firstName', data must have required property 'lastName', data must have required property 'address1', data must have required property 'city', data must have required property 'state', data must have required property 'postalCode', data must have required property 'dateOfBirth', data must have required property 'ssn', data must have required property 'ipAddress'"
      )
    })
    it('should successfully return create', async () => {
      // given
      const data = {
        id: '12323',
      }
      mockAxios.onPost(`${BaseURL.Sandbox}/v1/user_intent`).reply(201, JSON.stringify(data))

      // when
      const result = await astraClient.users.intents.create({
        email: 'sir.edmund.hillary@gmail.com',
        phone: '+15557771234',
        firstName: 'Edmund',
        lastName: 'Hillary',
        preferredFirstName: 'Ed',
        preferredLastName: 'Hill',
        preferredPronouns: 'He/Him',
        address1: '123 Astra Ave',
        address2: 'Apt 456',
        city: 'Palo Alto',
        state: 'CA',
        postalCode: '94304',
        dateOfBirth: '1919-07-20',
        ssn: '9999',
        ipAddress: 'your_ip_address',
      })

      // then
      expect(result).toEqual(data)
      const request = mockAxios.history.post[0]
      expect(request.url).toEqual(`v1/user_intent`)
      expect(request.auth).toEqual({
        username: '1',
        password: '2',
      })
    })
  })
})
