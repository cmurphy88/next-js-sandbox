'use client'

import { useState } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import LineChart from '@/components/LineChart'

Chart.register(CategoryScale)

const WeightChart = ({ weights }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }
  const [chartData, setChartData] = useState({
    labels: weights.map((data) => formatDate(data.date)),
    datasets: [
      {
        label: 'Weight (kg) ',
        data: weights.map((data) => data.weight),
        backgroundColor: ['red', 'blue', 'green'],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  })

  return <LineChart chartData={chartData} />
}
export default WeightChart
