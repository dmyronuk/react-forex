import React, { FunctionComponent } from 'react'
import CurrentRatesWidget from './CurrentRatesWidget'
import CurrencyWidget from './CurrencyWidget'

const Main: FunctionComponent = () => (
  <main className="flex-1 flex flex-col bg-gray-100">
    <CurrentRatesWidget />
    <CurrencyWidget />
  </main>
)

export default Main
