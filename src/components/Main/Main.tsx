import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { fetchLatestCurrencies } from '../../store/dashboard/dashboard.actions'

const Main: FunctionComponent = () => {
  const dispatch = useDispatch()
  dispatch(fetchLatestCurrencies())

  return <main className="bg-gray-100" />
}

export default Main
