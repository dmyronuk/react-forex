import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCurrencyHistory } from '../store/dashboard/dashboard.actions'
import { DateRangeOption } from '../models'


const RateItem: FunctionComponent<{ country: string; rate: number }> = ({ country, rate }) => {
  const dispatch = useDispatch()

  const selectCountry = (country: string) => {
    dispatch(fetchCurrencyHistory(country, DateRangeOption.LastMonth))
  }

  return (
    <button className='m-2 text-gray-600 focus:outline-none' onClick={() => selectCountry(country)}>
      <div className='font-medium'>{country}</div>
      <div className='text-sm'>{rate.toFixed(4)}</div>
    </button>
  )
}

export default RateItem