export class AstraResponseError extends Error {
  code: number
  data: unknown

  constructor(message: string, code: number, data: unknown) {
    super(message)
    this.code = code
    this.data = data
  }
}
