'use server'
import { revalidatePath } from 'next/cache'
import { SignupFormSchema } from '@/lib/definitions'
import { cookies } from 'next/headers'
import db from './db'
import axios from 'axios'
import { createSession, deleteSession } from '@/lib/session'
import { decrypt } from '@/lib/session'
import { redirect } from 'next/navigation'

export const getAllUSersWeights = async (user) => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  try {
    const res = await axios.get(
      `${process.env.API_ORIGIN}/weight/user?userId=${user.id}`,
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    )
    return res.data
  } catch (err) {
    console.log("Error getting user's todos", err)
  }
}

export const getAllUsersTodos = async (user) => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  try {
    const res = await axios.get(
      `${process.env.API_ORIGIN}/todos/user?userId=${user.id}`,
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    )
    return res.data
  } catch (err) {
    console.log("Error getting user's todos", err)
  }
}

export const getCurrentUser = async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  console.log('GOOGLE: ', session)
  if (!session) {
    redirect('/login')
  }

  try {
    const res = await axios.get(`${process.env.API_ORIGIN}/auth/me`, {
      headers: { Authorization: `Bearer ${session.token}` },
    })

    return res.data
  } catch (error) {
    console.log('Redirecting to home page', error)
    return null
  }
}

export const login = async (state, data) => {
  const email = data.get('email')
  const password = data.get('password')
  const callbackUrl = data.get('callbackUrl')

  try {
    const response = await axios.post(`${process.env.API_ORIGIN}/auth/login`, {
      email: email,
      password: password,
    })
    console.log(response.data)
    await createSession(response.data.token, response.data.userDetails.id)
    const redirectTo =
      callbackUrl && callbackUrl.startsWith('/')
        ? callbackUrl
        : defaultDashboardPath
  } catch (err) {
    return err
  }
  const redirectTo =
    callbackUrl && callbackUrl.startsWith('/')
      ? callbackUrl
      : defaultDashboardPath
  redirect(redirectTo)
}

export const signup = async (state, formData) => {
  const callbackUrl = formData.get('callbackUrl')
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { firstName, lastName, email, password } = validatedFields.data

  try {
    const response = await axios.post(
      `${process.env.API_ORIGIN}/auth/register`,
      {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      }
    )
    await createSession(response.data.token, response.data.userDetails.id)
    const redirectTo =
      callbackUrl && callbackUrl.startsWith('/')
        ? callbackUrl
        : defaultDashboardPath
  } catch (err) {
    return err
  }
  const redirectTo =
    callbackUrl && callbackUrl.startsWith('/')
      ? callbackUrl
      : defaultDashboardPath
  redirect(redirectTo)
}

export const newWeight = async (data) => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  const user = await getCurrentUser()
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
      console.log('MAMMOTH')
      transformedDate = new Date()
    }
  } catch (error) {
    console.error('Error transforming date:', error)
    transformedDate = new Date()
  }

  console.log('MERMAID: ', dateString)
  console.log('MERMAID: ', transformedDate)

  try {
    const res = await axios.post(
      `${process.env.API_ORIGIN}/weight`,
      {
        weight: weight,
        date: transformedDate,
        userId: user.id,
      },
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    )
    revalidatePath('/health/weight')
    return res.data
  } catch (err) {
    console.log('Error creating new weight entry', err)
  }
}

export const deleteWeight = async (id) => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  try {
    const res = await axios.post(
      `${process.env.API_ORIGIN}/weight/delete/${id}`,
      null,
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    )
    revalidatePath('health/weight')
  } catch (err) {
    console.log('Error deleting weight:', err)
  }
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
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  try {
    const res = await axios.put(
      `${process.env.API_ORIGIN}/todos/${id}`,
      {
        completed: true,
      },
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    )
  } catch (err) {
    console.log("Error getting user's todos", err)
  }
  revalidatePath('/todos')
}

export const newTodo = async (state, data) => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  const user = await getCurrentUser()
  const content = data.get('content')

  try {
    const res = await axios.post(
      `${process.env.API_ORIGIN}/todos`,
      {
        content: content,
        userId: user.id,
      },
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    )
    revalidatePath('/todos')
    return res.data
  } catch (err) {
    console.log('Error created new todo:', err)
  }
}
