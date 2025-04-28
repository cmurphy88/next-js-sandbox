import { Line } from 'react-chartjs-2'

function LineChart({ chartData, options, ...props }) {
  return (
    <div className="pt-5 chart-container">
      <h2 style={{ textAlign: 'center' }}>Weight</h2>
      <Line data={chartData} options={options} {...props} />
    </div>
  )
}
export default LineChart
