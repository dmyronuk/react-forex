import {
  FetchLatestCurrenciesRes,
  FETCH_LATEST_CURRENCIES_REQ,
  FETCH_LATEST_CURRENCIES_RES
} from './dashboard.actions'
import { createReducer } from '../create-reducer'
import { RatesResponse } from '../../models'

export interface DashboardState {
  isLoading: boolean
  rates: RatesResponse | null
}

export const initialDashboardState: DashboardState = {
  isLoading: false,
  rates: null
}

const fetchCurrenciesReqReducer = (state: DashboardState): DashboardState => ({ ...state, isLoading: true })

const fetchCurrenciesResReducer = (state: DashboardState, action: FetchLatestCurrenciesRes): DashboardState => {
  return {
    ...state,
    isLoading: false,
    rates: action.data
  }
}

export const dashboardReducer = createReducer(
  initialDashboardState,
  {
    [FETCH_LATEST_CURRENCIES_REQ]: fetchCurrenciesReqReducer,
    [FETCH_LATEST_CURRENCIES_RES]: fetchCurrenciesResReducer,
  }
)