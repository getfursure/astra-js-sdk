import { snakeCase } from 'lodash'

export default function (request: object) {
  const transformed = {}
  for (const key in request) {
    transformed[snakeCase(key)] = request[key]
  }
  return transformed
}
