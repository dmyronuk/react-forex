import { ThunkAction } from 'redux-thunk'
import { DashboardState } from './dashboard.reducer'
import { fetchCurrencies } from '../../services/currency.service'
import { RatesResponse } from '../../models'

export const FETCH_LATEST_CURRENCIES_REQ = '[Dashboard] Fetch Latest Currencies Req'
export const FETCH_LATEST_CURRENCIES_RES = '[Dashboard] Fetch Latest Currencies Res'
export const FETCH_LATEST_CURRENCIES_ERR = '[Dashboard] Fetch Latest Currencies Err'

export interface FetchLatestCurrenciesReq { type: typeof FETCH_LATEST_CURRENCIES_REQ }
export interface FetchLatestCurrenciesRes { type: typeof FETCH_LATEST_CURRENCIES_RES, data: RatesResponse }
export interface FetchLatestCurrenciesErr { type: typeof FETCH_LATEST_CURRENCIES_ERR, err: any }

export const fetchLatestCurrenciesReq = (): FetchLatestCurrenciesReq => ({ type: FETCH_LATEST_CURRENCIES_REQ })
export const fetchLatestCurrenciesRes = (data: RatesResponse): FetchLatestCurrenciesRes => ({ type: FETCH_LATEST_CURRENCIES_RES, data })
export const fetchLatestCurrenciesErr = (err: any): FetchLatestCurrenciesErr => ({ type: FETCH_LATEST_CURRENCIES_ERR, err })

export const fetchLatestCurrencies = (): ThunkAction<void, DashboardState, unknown, DashboardActionTypes> => {
  return (dispatch) => {
    dispatch(fetchLatestCurrenciesReq())

    fetchCurrencies().then(
      res => dispatch(fetchLatestCurrenciesRes(res)),
      err => dispatch(fetchLatestCurrenciesErr(err))
    )
  }
}

export type DashboardActionTypes =
  FetchLatestCurrenciesReq
  | FetchLatestCurrenciesRes
  | FetchLatestCurrenciesErr