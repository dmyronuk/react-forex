import { DashboardActionTypes } from './dashboard.actions'

export interface DashboardState {}

export const initialDashboardState: DashboardState = {}

export const dashboardReducer = (state = initialDashboardState, action: DashboardActionTypes): DashboardState => {
  switch(action.type) {
    default:
      return state
  }
}