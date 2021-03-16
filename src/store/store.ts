import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { dashboardReducer, DashboardState } from './dashboard/dashboard.reducer'

export interface RootState {
  dashboard: DashboardState
}

const rootReducer = combineReducers({ dashboard: dashboardReducer })

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)