import Weight from './Weight'

const WeightList = ({ weights }) => {
  return weights.map((weight) => <Weight weight={weight} key={weight.id} />)
}

export default WeightList
