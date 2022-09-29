import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Astra, BaseURL } from '../../client/astra'

describe('transfers', () => {
  let mock
  let astraClient

  beforeAll(() => {
    mock = new MockAdapter(axios)
    astraClient = new Astra({
      clientId: '1',
      clientSecret: '2',
      baseUrl: BaseURL.Sandbox,
    })
  })

  afterEach(() => {
    mock.reset()
  })

  describe('list() retrieve all transfers for a user', () => {
    it('should successfully return transfers list', async () => {
      // given
      const data = {
        count: 2,
        transfers: [
          {
            id: '1',
            routine_type: 'recurring',
            routine_name: 'Every Friday',
            routine_id: '5140799817777152',
            source_id: '3lzMBjog76t9BDGdVmMehagM3WW9pVcqgL3LB',
            destination_id: 'GL8J39APl7iwEza9ANBqTwdNvJQjRyT1blBy8',
            amount: 40,
            payment_type: 'ach',
            initiated: '2020-09-15T15:12:04.746260',
            updated: '2020-09-16T17:12:02.114524',
            estimated_clearing_date: '2020-09-17T15:12:04.746260',
            status: 'processed',
          },
          {
            id: '2',
            routine_type: 'percentage-based',
            routine_name: 'Operating 30',
            routine_id: '5140799817777157',
            source_id: 'zZ5mrEdWBXtDleJ37zR8i3g8R59WdNioxLW6D',
            destination_id: 'GL8J39APl7iwEza9ANBqTwdNvJQjRyT1blBy8',
            amount: 1250,
            payment_type: 'ach',
            initiated: '2020-09-15T15:14:09.153764',
            updated: '2020-09-16T17:12:04.845153',
            estimated_clearing_date: '2020-09-17T15:12:04.746260',
            status: 'pending',
          },
        ],
      }
      mock.onGet(`${BaseURL.Sandbox}/v1/transfers`).reply(200, JSON.stringify(data))

      // when
      const result = await astraClient.transfers.list()

      // then
      expect(result).toEqual(data)
      expect(mock.history.get[0].url).toEqual(`v1/transfers`)
    })
  })

  describe('projected() retrieve all projected transfers for a user', () => {
    it('should successfully return transfers list', async () => {
      // given
      const data = {
        count: 3,
        transfers: [
          {
            id: '997',
            routine_type: 'recurring',
            routine_name: 'Every Friday',
            routine_id: '5140799817777152',
            source_id: '3lzMBjog76t9BDGdVmMehagM3WW9pVcqgL3LB',
            destination_id: 'GL8J39APl7iwEza9ANBqTwdNvJQjRyT1blBy8',
            amount: 40,
            payment_type: 'ach',
            date: '2020-09-12',
          },
          {
            id: '998',
            routine_type: 'round-up',
            routine_name: 'Save Extra',
            routine_id: '5140799817778453',
            source_id: '3lzMBjog76t9BDGdVmMehagM3WW9pVcqgL3LB',
            destination_id: 'GL8J39APl7iwEza9ANBqTwdNvJQjRyT1blBy8',
            amount: null,
            payment_type: 'ach',
            date: '2020-09-14',
          },
          {
            id: '999',
            routine_type: 'recurring',
            routine_name: 'Every Friday',
            routine_id: '5140799817777152',
            source_id: '3lzMBjog76t9BDGdVmMehagM3WW9pVcqgL3LB',
            destination_id: 'GL8J39APl7iwEza9ANBqTwdNvJQjRyT1blBy8',
            amount: 40,
            payment_type: 'ach',
            date: '2020-09-19',
          },
        ],
      }
      mock.onGet(`${BaseURL.Sandbox}/v1/transfers/projected`).reply(200, JSON.stringify(data))

      // when
      const result = await astraClient.transfers.projected()

      // then
      expect(result).toEqual(data)
      expect(mock.history.get[0].url).toEqual(`v1/transfers/projected`)
    })
  })

  describe('getById() retrieve a specific transfer for a user', () => {
    it('should successfully return the specific transfer', async () => {
      // given
      const data = {
        id: '2',
        routine_type: 'percentage-based',
        routine_name: 'Operating 30',
        routine_id: '5140799817777152',
        source_id: 'zZ5mrEdWBXtDleJ37zR8i3g8R59WdNioxLW6D',
        destination_id: 'GL8J39APl7iwEza9ANBqTwdNvJQjRyT1blBy8',
        amount: 1250,
        payment_type: 'ach',
        initiated: '2020-09-15T15:12:04.746260',
        updated: '2020-09-16T17:12:02.114524',
        estimated_clearing_date: '2020-09-17T15:12:04.746260',
        status: 'pending',
      }
      mock.onGet(`${BaseURL.Sandbox}/v1/transfers/2`).reply(200, JSON.stringify(data))

      // when
      const result = await astraClient.transfers.getById('2')

      // then
      expect(result).toEqual(data)
      expect(mock.history.get[0].url).toEqual(`v1/transfers/2`)
    })
  })
})
