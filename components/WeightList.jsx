import Weight from './Weight'

const WeightList = ({ weights }) => {
  console.log(weights)
  return weights.map((weight) => <Weight weight={weight} key={weight.id} />)
}

export default WeightList
