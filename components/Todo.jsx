'use client'
import { completeTodo } from '@/utils/actions'
import { useTransition } from 'react'

const Todo = ({ todo }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={`cursor-pointer ${
        todo.completed ? 'line-through text-gray-500' : ''
      }`}
      onClick={() => startTransition(() => completeTodo(todo.id))}
    >
      {'→ '} {todo.content}{' '}
      <span className="text-gray-600">
        {todo.dueDate &&
          todo.dueDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })}
      </span>
    </div>
  )
}

export default Todo
