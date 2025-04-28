'use client'

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js'

import 'chartjs-adapter-date-fns'
import LineChart from '@/components/LineChart'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
)

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
        tension: 0.3,
        backgroundColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1) + ' kg'
            }
            return label
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'dd MMM yyyy',
          displayFormats: {
            day: 'dd MMM',
            week: 'dd MMM yy',
            month: 'MMM yyyy',
            year: 'yyyy',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        type: 'linear',
        beginAtZero: false,
        title: {
          display: true,
          text: 'Weight (kg)',
        },
      },
    },
  }

  return <LineChart chartData={chartData} options={chartOptions} />
}

export default WeightChart
