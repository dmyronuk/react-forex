import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import CurrencyOverview from './CurrencyOverview'
import HistoryChart from './HistoryChart'
import { selectActiveCountry } from '../store/dashboard/dashboard.selectors'

const CurrencyWidget: FunctionComponent = () => {
  const activeCountry = useSelector(selectActiveCountry)

  return activeCountry ? (
    <div className='flex-1 flex flex-row m-5 p-2 bg-gray-50 rounded-md shadow-lg'>
      <CurrencyOverview />
      <HistoryChart />
    </div>
  ) : null
}

export default CurrencyWidget
