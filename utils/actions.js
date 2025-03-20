'use server'
import { revalidatePath } from 'next/cache'
import db from './db'

export const newPayment = async (data) => {
  const name = data.get('name')
  const amount = data.get('amount')
  const month = data.get('month')
  const isIncomeRaw = data.get('isIncome')

  let isIncome
  if (isIncomeRaw === 'on') {
    isIncome = true
  } else {
    isIncome = false
  }

  const payment = await db.payment.create({
    data: {
      name: name,
      amount: amount,
      month: month,
      isIncome: isIncome,
    },
  })

  revalidatePath('/finances')
}

export const deletePayment = async (id) => {
  await db.payment.delete({
    where: { id },
  })

  revalidatePath('finances')
}

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
