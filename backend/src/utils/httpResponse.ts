export default function errorResponse(code: number, message: string) {
  return {
    code,
    message,
  }
}
