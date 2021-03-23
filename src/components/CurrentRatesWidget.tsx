import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLatestCurrencies } from '../store/dashboard/dashboard.actions'
import { selectRates } from '../store/dashboard/dashboard.selectors'
import RateItem from './RateItem'

const CurrentRatesWidget: FunctionComponent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLatestCurrencies())
  }, [])

  const rates = useSelector(selectRates)

  const dashboardItems = Object.entries(rates)
    .map(([country, countryData]) => (
      <RateItem
        key={country}
        country={country}
        rate={countryData.rate}
        change={countryData.change}
      />
    ))

  return (
    <div className='flex flex-row m-5 p-2 bg-gray-50 rounded-md shadow-lg overflow-x-auto'>
      {dashboardItems}
    </div>
  )
}

export default CurrentRatesWidget