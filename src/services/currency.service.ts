import dayjs from 'dayjs'
import { AdaptedRatesResponse, DateRangeOption, HistoryResponse } from '../models'

const BASE_URL = 'https://api.exchangeratesapi.io'
const REFERENCE_CURRENCY = 'USD'
export const CURRENCY_API_DATE_FORMAT = 'YYYY-MM-DD'

const DATE_RANGE_MAP: {[key in DateRangeOption]: number} = {
  [DateRangeOption.LastMonth]: 1,
  [DateRangeOption.Last3Months]: 3,
  [DateRangeOption.LastYear]: 12,
}

export function getDatesFromRange(range: DateRangeOption): { start: string; end: string} {
  const monthsAgo = DATE_RANGE_MAP[range]
  const monthsAgoDate = dayjs()
    .add(-1 * monthsAgo, 'months')
    .format(CURRENCY_API_DATE_FORMAT)

  const today = dayjs()
    .format(CURRENCY_API_DATE_FORMAT)

  return { start: monthsAgoDate, end: today }
}

function latestRatesAdapter(data: HistoryResponse): AdaptedRatesResponse {
  const sortedRates = Object.entries(data.rates)
    .sort(([dateA], [dateB]) => dayjs(dateA).isAfter(dateB) ? -1 : 1)
    .map(([, countryData]) => countryData)

  const latest = sortedRates[0]
  const prev = sortedRates[1]

  return Object.entries(latest)
    .reduce<AdaptedRatesResponse>((acc, [country, inverseRate]) => {
      const rate = 1 / inverseRate
      const prevRate = 1 / prev[country]
      const change = (rate / prevRate * 100) - 100

      return {
        ...acc,
        [country]: { rate, change }
      }
    }, {})
}

export async function fetchCurrencies(): Promise<AdaptedRatesResponse> {
  const today = dayjs()
    .format(CURRENCY_API_DATE_FORMAT)

  // rather than deal with edge cases where previous date is 3+ days previous (ie long weekends)
  const startDate = dayjs()
    .subtract(4, 'days')
    .format(CURRENCY_API_DATE_FORMAT)

  const url = `${BASE_URL}/history?start_at=${startDate}&end_at=${today}&base=${REFERENCE_CURRENCY}`

  return fetch(url)
    .then(res => res.json())
    .then((data: HistoryResponse) => latestRatesAdapter(data))
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