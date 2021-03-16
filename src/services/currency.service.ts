import dayjs from 'dayjs'
import { HistoryResponse, RatesResponse } from '../models'

const BASE_URL = 'https://api.exchangeratesapi.io'
const REFERENCE_CURRENCY = 'USD'
export const CURRENTY_API_DATE_FORMAT = 'YYYY-MM-DD'

export async function fetchCurrencies(): Promise<RatesResponse> {
  const url = `${BASE_URL}/latest?base=${REFERENCE_CURRENCY}`

  return fetch(url)
    .then(res => res.json())
    .then((data: RatesResponse) => {
      return {
        ...data,
        rates: Object.entries(data.rates)
          .reduce((acc, [country, rate]) => {
            return { ...acc, [country]: 1 / rate }
          }, {})
      }
    })
}

export async function fetchHistory(
  country: string,
  start: string,
  end: string
): Promise<Array<{ date: string; rate: number }>> {
  const url = `${BASE_URL}/history?start_at=${start}&end_at=${end}&symbols=${REFERENCE_CURRENCY}&base=${country}`

  return fetch(url)
    .then(res => res.json())
    .then((data: HistoryResponse) => {
      return Object.entries(data.rates)
        .map(([date, rateObj]) => ({ date, rate: Object.values(rateObj)[0] }))
        .sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1)
    })
}