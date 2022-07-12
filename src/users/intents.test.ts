import { Intents } from "./intents";
import axios from "axios";

describe('Users > intents', () => {
  jest.mock('axios');
  const mockAxios = axios as jest.Mocked<typeof axios>;

  describe('create', () => {
    it('throws if a required request parameter is missing', async () => {
      const intents = new Intents(mockAxios);
      const create = () => intents.create({} as any);
      await expect(create()).rejects.toThrowError("data must have required property 'email', data must have required property 'phone', data must have required property 'firstName', data must have required property 'lastName', data must have required property 'address1', data must have required property 'city', data must have required property 'state', data must have required property 'postalCode', data must have required property 'dateOfBirth', data must have required property 'ssn', data must have required property 'ipAddress'");
    })
  })
});