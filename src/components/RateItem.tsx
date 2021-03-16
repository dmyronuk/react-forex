import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { CURRENTY_API_DATE_FORMAT } from '../services/currency.service'
import { fetchCurrencyHistory } from '../store/dashboard/dashboard.actions'

const RateItem: FunctionComponent<{ country: string; rate: number }> = ({ country, rate }) => {
  const dispatch = useDispatch()

  const selectCountry = (country: string) => {
    const today = dayjs()
      .format(CURRENTY_API_DATE_FORMAT)

    const monthAgo = dayjs()
      .add(-1, 'months')
      .format(CURRENTY_API_DATE_FORMAT)

    dispatch(fetchCurrencyHistory(country, monthAgo, today))
  }

  return (
    <button className='m-2' onClick={() => selectCountry(country)}>
      {country}: {rate.toFixed(4)}
    </button>
  )
}

export default RateItem