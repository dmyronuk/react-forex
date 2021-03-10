import { RatesResponse } from '../models'

const BASE_URL = 'https://api.exchangeratesapi.io'

export async function fetchCurrencies(): Promise<RatesResponse> {
  const url = `${BASE_URL}/latest?base=USD`

  return fetch(url)
    .then(res => res.json())
}