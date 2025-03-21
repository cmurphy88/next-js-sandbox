import { newPayment } from '@/utils/actions'

const NewPaymentForm = ({}) => {
  return (
    <div className=" gridmd:flex">
      <form action={newPayment}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border border-white/50 rounded-2xl mt-3 mr-3 p-1"
        />
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount"
          className="border border-white/50 rounded-2xl mr-3 p-1"
        />
        <input
          name="month"
          type="text"
          placeholder="Month"
          defaultValue="april"
          className="border border-white/50 rounded-2xl mr-3 p-1"
        />
        <input
          name="isIncome"
          type="checkbox"
          className="border border-white/50 rounded-2xl mr-3 p-1"
        />
        <button className="hover:bg-white/50 px-5 py-2" type="submit">
          Add
        </button>
      </form>
    </div>
  )
}

export default NewPaymentForm
