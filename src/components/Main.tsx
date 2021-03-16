import React, { FunctionComponent } from 'react'
import CurrentRatesWidget from './CurrentRatesWidget'
import HistoryChart from './HistoryChart'

const Main: FunctionComponent = () => (
  <main className="flex-1 flex flex-col bg-gray-100">
    <CurrentRatesWidget />
    <HistoryChart />
  </main>
)

export default Main
