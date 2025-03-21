import Payment from './Payment'

const PaymentList = ({ payments }) => {
  return payments.map((payment) => (
    <Payment payment={payment} key={payment.id} />
  ))
}

export default PaymentList
