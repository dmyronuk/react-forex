import { ThunkAction } from 'redux-thunk'
import { DashboardState } from './dashboard.reducer'
import { getDatesFromRange, fetchCurrencies, fetchHistory } from '../../services/currency.service'
import { DateRangeOption, RatesResponse } from '../../models'

export const FETCH_LATEST_CURRENCIES_REQ = '[Dashboard] Fetch Latest Currencies Req'
export const FETCH_LATEST_CURRENCIES_RES = '[Dashboard] Fetch Latest Currencies Res'
export const FETCH_LATEST_CURRENCIES_ERR = '[Dashboard] Fetch Latest Currencies Err'
export const FETCH_CURRENCY_HISTORY_REQ = '[Dashboard] Fetch Currency History Req'
export const FETCH_CURRENCY_HISTORY_RES = '[Dashboard] Fetch Currency History Res'
export const FETCH_CURRENCY_HISTORY_ERR = '[Dashboard] Fetch Currency History Err'

export interface FetchLatestCurrenciesReq { type: typeof FETCH_LATEST_CURRENCIES_REQ }
export interface FetchLatestCurrenciesRes { type: typeof FETCH_LATEST_CURRENCIES_RES, data: RatesResponse }
export interface FetchLatestCurrenciesErr { type: typeof FETCH_LATEST_CURRENCIES_ERR, errMessage: string }
export interface FetchCurrencyHistoryReq { type: typeof FETCH_CURRENCY_HISTORY_REQ, country: string }
export interface FetchCurrencyHistoryRes {
  type: typeof FETCH_CURRENCY_HISTORY_RES,
  country: string,
  data: Array<{ date: string; rate: number }>,
  range: DateRangeOption
}
export interface FetchCurrencyHistoryErr { type: typeof FETCH_CURRENCY_HISTORY_ERR, errMessage: string }

export const fetchLatestCurrenciesReq = (): FetchLatestCurrenciesReq => ({ type: FETCH_LATEST_CURRENCIES_REQ })

export const fetchLatestCurrenciesRes = (data: RatesResponse): FetchLatestCurrenciesRes => {
  return { type: FETCH_LATEST_CURRENCIES_RES, data }
}

export const fetchLatestCurrenciesErr = (errMessage: string): FetchLatestCurrenciesErr => {
  return { type: FETCH_LATEST_CURRENCIES_ERR, errMessage }
}

export const fetchLatestCurrencies = (): ThunkAction<void, DashboardState, unknown, DashboardActionTypes> => {
  return (dispatch) => {
    dispatch(fetchLatestCurrenciesReq())

    fetchCurrencies().then(
      res => dispatch(fetchLatestCurrenciesRes(res)),
      () => dispatch(fetchLatestCurrenciesErr('Fetch latest currencies failed'))
    )
  }
}

export const fetchCurrencyHistoryReq = (country: string): FetchCurrencyHistoryReq => {
  return { type: FETCH_CURRENCY_HISTORY_REQ, country }
}

export const fetchCurrencyHistoryRes = (
  country: string,
  data: Array<{ date: string; rate: number }>,
  range: DateRangeOption
): FetchCurrencyHistoryRes => {
  return { type: FETCH_CURRENCY_HISTORY_RES, country, data, range }
}

export const FetchCurrencyHistoryErr = (errMessage: string): FetchCurrencyHistoryErr => {
  return { type: FETCH_CURRENCY_HISTORY_ERR, errMessage }
}

export const fetchCurrencyHistory = (
  country: string,
  range: DateRangeOption
): ThunkAction<void, DashboardState, unknown, DashboardActionTypes> => {
  return (dispatch) => {
    dispatch(fetchCurrencyHistoryReq(country))

    const { start, end } = getDatesFromRange(range)

    fetchHistory(country, start, end).then(
      data => dispatch(fetchCurrencyHistoryRes(country, data, range)),
      () => dispatch(fetchLatestCurrenciesErr(`Fetch currency history failed for ${country}`))
    )
  }
}

export type DashboardActionTypes =
  FetchLatestCurrenciesReq
  | FetchLatestCurrenciesRes
  | FetchLatestCurrenciesErr
  | FetchCurrencyHistoryReq
  | FetchCurrencyHistoryRes
  | FetchCurrencyHistoryErr