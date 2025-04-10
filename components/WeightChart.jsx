'use client'

import 'chartjs-adapter-date-fns'
import LineChart from '@/components/LineChart'

const WeightChart = ({ weights }) => {
  const sortedWeights = weights.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const chartData = {
    datasets: [
      {
        label: 'Weight (kg)',
        data: sortedWeights.map((data) => ({
          x: new Date(data.date),
          y: data.weight,
        })),
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        tension: 0.2,
        backgroundColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
      },
    ],
  }

  return <LineChart chartData={chartData} />
}

export default WeightChart
