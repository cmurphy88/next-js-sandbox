import { Line } from 'react-chartjs-2'

function LineChart({ chartData }) {
  return (
    <div className="pt-5 chart-container">
      <h2 style={{ textAlign: 'center' }}>Weight</h2>
      <Line
        data={chartData}
        options={{
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
              beginAtZero: false,
              title: {
                display: true,
                text: 'Weight (kg)',
              },
            },
          },
        }}
      />
    </div>
  )
}
export default LineChart
