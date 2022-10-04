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
