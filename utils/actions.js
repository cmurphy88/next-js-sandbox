'use server'
import { revalidatePath } from 'next/cache'
import db from './db'

export const completeTodo = async (id) => {
  await db.todo.update({
    where: { id },
    data: {
      completed: true,
    },
  })
  revalidatePath('/todos')
}

export const newTodo = async (data) => {
  const newTodo = data.get('content')
  if (newTodo) {
    const todo = await db.todo.create({
      data: {
        content: data.get('content'),
      },
    })
  }

  revalidatePath('/todos')
}
