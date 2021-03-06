import { createReducer } from '@reduxjs/toolkit'
import {
  FetchLatestCurrenciesRes,
  FetchCurrencyHistoryRes,
  FETCH_CURRENCY_HISTORY_REQ,
  FETCH_CURRENCY_HISTORY_RES,
  FETCH_LATEST_CURRENCIES_REQ,
  FETCH_LATEST_CURRENCIES_RES
} from './dashboard.actions'
import { AdaptedRatesResponse, DateRangeOption } from '../../models'

export interface DashboardState {
  activeCountry: string | null
  activeHistoryRange: DateRangeOption
  history: {
    [country: string]: Array<{ date: string; rate: number }>
  }
  isHistoryLoading: boolean
  isLatestLoading: boolean
  rates: AdaptedRatesResponse
}

export const initialDashboardState: DashboardState = {
  activeCountry: null,
  activeHistoryRange: DateRangeOption.Last3Months,
  history: {},
  isHistoryLoading: false,
  isLatestLoading: false,
  rates: {}
}

const fetchCurrenciesReqReducer = (state: DashboardState): DashboardState => ({ ...state, isLatestLoading: true })

const fetchCurrenciesResReducer = (state: DashboardState, action: FetchLatestCurrenciesRes): DashboardState => {
  return {
    ...state,
    isLatestLoading: false,
    rates: action.data
  }
}

const fetchHistoryReqReducer = (state: DashboardState): DashboardState => ({ ...state, isHistoryLoading: true })

const fetchHistoryResReducer = (state: DashboardState, action: FetchCurrencyHistoryRes): DashboardState => {
  return {
    ...state,
    activeCountry: action.country,
    activeHistoryRange: action.range,
    history: {
      ...state.history,
      [action.country]: action.data
    },
    isHistoryLoading: false
  }
}

export const dashboardReducer = createReducer(
  initialDashboardState,
  {
    [FETCH_LATEST_CURRENCIES_REQ]: fetchCurrenciesReqReducer,
    [FETCH_LATEST_CURRENCIES_RES]: fetchCurrenciesResReducer,
    [FETCH_CURRENCY_HISTORY_REQ]: fetchHistoryReqReducer,
    [FETCH_CURRENCY_HISTORY_RES]: fetchHistoryResReducer
  }
)