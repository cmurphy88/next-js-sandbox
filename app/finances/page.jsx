import NewPaymentForm from '@/components/NewPaymentForm'
import Payment from '@/components/Payment'
import db from '@/utils/db'

const getIncomePayments = async () => {
  const payments = await db.payment.findMany({
    where: {
      isIncome: true,
    },
    orderBy: {
      amount: 'desc',
    },
  })

  return payments
}

const getOutcomePayments = async () => {
  const payments = await db.payment.findMany({
    where: {
      isIncome: false,
    },
    orderBy: {
      amount: 'desc',
    },
  })

  return payments
}

const Finances = async () => {
  const incomePayments = await getIncomePayments()
  const outcomePayments = await getOutcomePayments()

  let totalIncome = 0
  let totalOutcome = 0
  incomePayments.map((payment) => (totalIncome += Number(payment.amount)))
  outcomePayments.map((payment) => (totalOutcome += Number(payment.amount)))
  const totalLeftOver = totalIncome - totalOutcome

  return (
    <div className="pt-3 pb-3">
      <h1>Finances</h1>
      <div className="grid md:grid-cols-2 md:col-rows-2 pt-5">
        <div>
          <h2>Income</h2>
          <div>
            <table className="table-fixed border-separate border-spacing-3 border border-gray-400 dark:border-gray-500xw bg-white/15 rounded-2xl">
              <thead>
                <tr>
                  <th className="min-w-45 text-left">Name</th>
                  <th className="min-w-30 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {incomePayments.map((payment) => (
                  <Payment payment={payment} />
                ))}
                <tr>
                  <td>Total</td>
                  <td>£ {totalIncome.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <NewPaymentForm />
          </div>
        </div>
        <div>
          <h2>Outcome</h2>
          <div>
            <table className="table-fixed border-separate border-spacing-3 border border-gray-400 dark:border-gray-500 bg-white/15 rounded-2xl">
              <thead>
                <tr>
                  <th className="min-w-30 text-left">Name</th>
                  <th className="min-w-30 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {outcomePayments.map((payment) => (
                  <Payment payment={payment} />
                ))}
                <tr className="pt-2">
                  <td>Total</td>
                  <td>£ {totalOutcome.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <NewPaymentForm />
          </div>
        </div>
        <div className="pt-2.5 mt-2.5 col-span-2 text-center bg-blue-700/25 rounded-4xl">
          <h1>Summary</h1>
          <div className="grid md:grid-cols-2">
            <div>
              <h2>Total in:</h2>
              <p>£ {totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <h2>Total Out</h2>
              <p>£ {totalOutcome.toFixed(2)}</p>
            </div>
            <div className="md:col-span-2">
              <h2>Left Over</h2>
              <p>£ {totalLeftOver.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finances
