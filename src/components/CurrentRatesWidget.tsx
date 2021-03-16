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
    .map(([country, rate]) => <RateItem key={country} country={country} rate={rate} />)

  return (
    <div className='flex flex-row w-full overflow-x-auto'>
      {dashboardItems}
    </div>
  )
}

export default CurrentRatesWidget