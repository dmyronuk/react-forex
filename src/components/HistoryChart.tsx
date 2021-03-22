import React, { FunctionComponent, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Chart from 'chart.js'
import dayjs from 'dayjs'
import { selectActiveCountryHistory } from '../store/dashboard/dashboard.selectors'

export const HistoryChart: FunctionComponent = () => {
  const activeCountryData = useSelector(selectActiveCountryHistory)
  const labels = activeCountryData.map(dataPoint => dayjs(dataPoint.date).format('MMM D'))
  const data = activeCountryData.map(dataPoint => dataPoint.rate)

  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = chartRef?.current?.getContext('2d')
    let chartInstance: Chart

    if(activeCountryData && ctx) {
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{ data }]
        },
        options: {
          legend: {
            display: false
          },
          maintainAspectRatio: false,
          responsive: true
        }
      })
    }

    // before re-rendering, clean up stale chart reference
    return () => {
      if(chartInstance) {
        chartInstance.destroy()
      }
    }

  }, [chartRef, activeCountryData])

  return activeCountryData?.length > 0 ? (
    <div className="w-full md:w-5/6">
      <canvas ref={chartRef} />
    </div>
  ) : null
}

export default HistoryChart