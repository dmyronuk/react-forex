export interface RatesResponse {
  rates: { [countryCode: string]: number }
  base: string
  date: string
}