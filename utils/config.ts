export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'local'
export const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true'
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (APP_ENV === 'prod' ? 'https://api.unyxticket.com/v1' : 'http://localhost:8080/api')
