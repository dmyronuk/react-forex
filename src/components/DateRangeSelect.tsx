import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrencyHistory } from '../store/dashboard/dashboard.actions'
import { selectActiveCountry, selectActiveHistoryRange } from '../store/dashboard/dashboard.selectors'
import { DateRangeOption } from '../models/date-range-option.model'

const DateRangeSelect: FunctionComponent = () => {
  const dispatch = useDispatch()
  const currentOption = useSelector(selectActiveHistoryRange)
  const currentCountry = useSelector(selectActiveCountry)

  const options = Object.values(DateRangeOption)
    .map(option => (
      <option
        key={option}
        value={option}
      >
        {option}
      </option>
    ))

  const handleSelect = (option: DateRangeOption): void => {
    dispatch(fetchCurrencyHistory(currentCountry as string, option))
  }

  return (
    <select
      value={currentOption}
      className='rounded-md border border-gray-300 bg-transparent p-1.5 font-medium'
      onChange={(event) => handleSelect(event.currentTarget.value as DateRangeOption)}
    >
      {options}
    </select>
  )
}

export default DateRangeSelect
