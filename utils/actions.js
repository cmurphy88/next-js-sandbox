'use server'
import { revalidatePath } from 'next/cache'
import db from './db'

export const newWeight = async (data) => {
  const weight = data.get('weight')
  const dateString = data.get('date')

  let transformedDate

  try {
    if (dateString) {
      const [day, month, year] = dateString.split('-')

      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      const milliseconds = now.getMilliseconds()

      const isoDateString = `${year}-${month}-${day}T${String(hours).padStart(
        2,
        '0'
      )}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
      )}.${String(milliseconds).padStart(3, '0')}Z`
      transformedDate = new Date(isoDateString)

      if (isNaN(transformedDate.getTime())) {
        throw new Error('Invalid date format')
      }
    } else {
      transformedDate = new Date()
    }
  } catch (error) {
    console.error('Error transforming date:', error)
    transformedDate = new Date()
  }

  const weightEntry = await db.weight.create({
    data: {
      weight: parseFloat(weight),
      date: transformedDate,
    },
  })

  revalidatePath('/health/weight')
}

export const deleteWeight = async (id) => {
  await db.weight.delete({
    where: { id },
  })

  revalidatePath('finances')
}

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
