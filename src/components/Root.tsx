import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import App from './App/App'

const Root: FunctionComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root
