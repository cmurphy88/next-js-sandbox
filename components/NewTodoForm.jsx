'use client'

import { newTodo } from '@/utils/actions'
import { useActionState } from 'react'

const initialState = {
  message: null,
  success: undefined,
}

const NewTodoForm = ({}) => {
  const [state, formAction] = useActionState(newTodo, initialState)
  return (
    <div className="text-center max-w-md mx-auto">
      <form action={formAction}>
        <input
          name="content"
          type="text"
          className="border border-white/25 mr-3 p-0.5 rounded-2xl bg-white/10 w-full"
        />
        <button
          className="rounded-2xl my-5 md:mx-5 p-3 sm:mx-2 hover:bg-green-700"
          type="submit"
        >
          New Todo
        </button>
      </form>
    </div>
  )
}

export default NewTodoForm
