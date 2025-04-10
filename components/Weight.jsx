'use client'
import { deleteWeight } from '@/utils/actions'
import { useTransition } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'

const Weight = ({ weight }) => {
  const [isPending, startTransition] = useTransition()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const weightValue = weight.weight

  return (
    <div className="grid grid-cols-2">
      <p className="grid grid-cols-2">
        <span>{weightValue} kg</span>
        <span className="italic text-white/50">{formatDate(weight.date)}</span>
      </p>
      <TrashIcon
        onClick={() => startTransition(() => deleteWeight(weight.id))}
        className="-mr-1 size-5 text-red-300 hover:bg-red-100 rounded"
      />
    </div>
  )
}

export default Weight
