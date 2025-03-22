import { newWeight } from '@/utils/actions'

const NewWeightForm = ({}) => {
  return (
    <div className=" gridmd:flex">
      <form action={newWeight}>
        <input
          name="weight"
          type="number"
          step="0.01"
          placeholder="Weight"
          className="border border-white/50 rounded-2xl mr-3 p-1"
        />
        <input
          type="text"
          name="date"
          placeholder="DD-MM-YYYY"
          className="border border-white/50 rounded-2xl mr-3 p-1"
        />

        <button className="hover:bg-white/50 px-5 py-2" type="submit">
          Add Weight
        </button>
      </form>
    </div>
  )
}

export default NewWeightForm
