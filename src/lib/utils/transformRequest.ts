import { snakeCase } from 'lodash';

export default function (request: Object) {
  const transformed = {};
  for (const key in request) {
    const value = request[key];
    transformed[snakeCase(key)] = value;
  }
  return transformed;
}