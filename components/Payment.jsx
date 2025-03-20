'use client'
import { deletePayment } from '@/utils/actions'
import { useTransition } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'

const Payment = ({ payment }) => {
  const [isPending, startTransition] = useTransition()

  const paymentAmount = Number(payment.amount)
  return (
    <tr key={payment.name}>
      <td className="uppercase">{payment.name}</td>
      <td>£ {paymentAmount.toFixed(2)}</td>
      <TrashIcon
        onClick={() => startTransition(() => deletePayment(payment.id))}
        className="-mr-1 size-5 text-white/90"
      />
    </tr>
  )
}

export default Payment
