import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveCountry } from '../store/dashboard/dashboard.selectors'
import DateRangeSelect from './DateRangeSelect'

const CurrencyOverview: FunctionComponent = () => {
  const country = useSelector(selectActiveCountry)

  return (
    <div className='w-full md:w-1/6 p-2 text-gray-600'>
      <div className='mb-2'>
        <div className='text-sm'>Country</div>
        <div className='font-medium'>{country}</div>
      </div>
      <div className='mb-2'>
        <div className='text-sm'>Date Range</div>
        <DateRangeSelect />
      </div>
    </div>
  )
}

export default CurrencyOverview