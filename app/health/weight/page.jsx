import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import db from '@/utils/db'
import WeightChart from '@/components/WeightChart'
import NewWeightForm from '@/components/NewWeightForm'
import WeightList from '@/components/WeightList'
import { getAllUSersWeights, getCurrentUser } from '@/utils/actions'

Chart.register(CategoryScale)

const getWeightEntries = async () => {
  const user = await getCurrentUser()
  const weights = await getAllUSersWeights(user)
  console.log('HIPPO: ', weights)
  return weights
}

const WeightPage = async () => {
  const weights = await getWeightEntries()

  return (
    <div className="p-5">
      <h1 className="pb-5">Weight Tracker</h1>
      <div>
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
