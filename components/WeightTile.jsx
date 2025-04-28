import { getAllUSersWeights, getCurrentUser } from '@/utils/actions'

const getWeightEntries = async () => {
  const user = await getCurrentUser()

  if (user !== null) {
    const weights = await getAllUSersWeights(user)
    return weights
  }
}

const getFormatedDate = (date) => {
  return date.split('T')[0].split('-').reverse().join('-')
}

const WeightTile = async () => {
  const weights = await getWeightEntries()

  let currentWeight
  let previousWeight
  let diff
  let message

  if (weights?.length > 0) {
    currentWeight = weights[weights.length - 1]
    previousWeight = weights[weights.length - 2]
    diff = currentWeight.weight - previousWeight.weight

    if (diff < 0) {
      message = <p>⬇️ You are trending down</p>
    } else if (diff > 0) {
      message = <p>⬆️ You are trending up</p>
    } else {
      message = <p>↔️ You are maintaining</p>
    }
  }

  return (
    <>
      <p className="text-4xl underline underline-offset-8 mb-4">Weight</p>
      {weights && weights.length > 0 && (
        <div className="pt-5">
          <h1>Current Weight: {currentWeight.weight}kg</h1>
          <p className="italic">on {getFormatedDate(currentWeight.date)}</p>
          <h2 className="pt-3 pb-3">Previous: {previousWeight.weight}kg</h2>
          {message}
        </div>
      )}
      {weights && !weights.length > 0 && (
        <div className="pt-5">
          <h1 className="pb-5">You have no weight data</h1>
          <button className="p-3 rounded-3xl bg-blue-400">
            <a href="/health/weight">Go here to add new weight data</a>
          </button>
        </div>
      )}
      <div className="pt-5">
        <button className="p-3 rounded-2xl bg-blue-400">
          <a href="/health/weight">Go to Weights</a>
        </button>
      </div>
    </>
  )
}

export default WeightTile
