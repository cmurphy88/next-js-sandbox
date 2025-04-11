import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import WeightChart from '@/components/WeightChart'
import NewWeightForm from '@/components/NewWeightForm'
import WeightList from '@/components/WeightList'
import { getAllUSersWeights, getCurrentUser } from '@/utils/actions'

Chart.register(CategoryScale)

const getWeightEntries = async () => {
  const user = await getCurrentUser()

  if (user !== null) {
    const weights = await getAllUSersWeights(user)
    return weights
  }
}

const WeightPage = async () => {
  const weights = await getWeightEntries()
  console.log('WEIGHTS', weights)
  const firstWeight = weights[0].weight
  const lastWeight = weights[weights.length - 1].weight
  const difference = firstWeight - lastWeight

  const isWeightLoss = (diff) => {
    if (diff > 0) {
      return <div>So far you have lost {diff.toFixed(2)}kg! 🎉</div>
    } else if (diff < 0) {
      return <div>Your weight has gone up by {diff.toFixed(2) * -1}kg.</div>
    } else {
      return <div>You are currently maintaining.</div>
    }
  }

  return (
    <div className="p-5">
      <h1 className="pb-10">Weight Tracker</h1>
      {isWeightLoss(difference)}
      <div className="pt-10">
        <NewWeightForm />
        <WeightChart weights={weights} />
      </div>
      <div className="pt-10">
        <h2>Logs</h2>
        <WeightList weights={weights} />
      </div>
    </div>
  )
}

export default WeightPage
