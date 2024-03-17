export function httpResponse(msg: string, code: number) {
  return {
    msg,
    statusCode: code
  }
}