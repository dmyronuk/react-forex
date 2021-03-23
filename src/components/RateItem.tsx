import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCurrencyHistory } from '../store/dashboard/dashboard.actions'
import { DateRangeOption } from '../models'


const RateItem: FunctionComponent<{ country: string; rate: number, change: number }> = ({ country, rate, change }) => {
  const dispatch = useDispatch()

  const selectCountry = (country: string) => {
    dispatch(fetchCurrencyHistory(country, DateRangeOption.LastMonth))
  }

  const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600'

  return (
    <button className='m-2 text-gray-600 focus:outline-none' onClick={() => selectCountry(country)}>
      <div className='font-medium'>{country}</div>
      <div className='text-sm'>{rate.toFixed(4)}</div>
      <div className={`${changeColor} rounded-sm py-0.5 px-1 text-sm`}>{change.toFixed(2)}%</div>
    </button>
  )
}

export default RateItem