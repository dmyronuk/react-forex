import { createSelector } from 'reselect'
import { RootState } from '../store'
import { DashboardState } from './dashboard.reducer'

export const selectDashboard = (state: RootState): DashboardState => state.dashboard

export const selectRates = createSelector(
  selectDashboard,
  dashboard => dashboard.rates
)

export const selectActiveCountry = createSelector(
  selectDashboard,
  dashboard => dashboard.activeCountry
)

export const selectActiveCountryHistory = createSelector(
  selectDashboard,
  dashboard => dashboard.activeCountry ? dashboard.history[dashboard.activeCountry] : []
)

export const selectActiveHistoryRange = createSelector(
  selectDashboard,
  dashboard => dashboard.activeHistoryRange
)