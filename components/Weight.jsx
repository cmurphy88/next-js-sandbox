'use client'
import { deleteWeight } from '@/utils/actions'
import { useTransition } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'

const Weight = ({ weight }) => {
  console.log('elephant', weight)
  const [isPending, startTransition] = useTransition()

  const weightValue = weight.weight
  return (
    <div className="grid grid-cols-2">
      <p>{weightValue}</p>
      <TrashIcon
        onClick={() => startTransition(() => deleteWeight(weight.id))}
        className="-mr-1 size-5 text-white/90"
      />
    </div>
  )
}

export default Weight
