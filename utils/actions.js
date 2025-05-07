'use server'
import { revalidatePath } from 'next/cache'
import { SignupFormSchema } from '@/lib/definitions'
import { cookies } from 'next/headers'
import db from './db'
import axios from 'axios'
import { createSession, deleteSession } from '@/lib/session'
import { decrypt } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function newSession(previousState, formData) {
  console.log('Executing newSession server action...')

  const cookie = cookies().get('session')?.value
  if (!cookie) {
    console.log('newSession: No session cookie found. Redirecting to login.')
    redirect('/login?message=Authentication required')
  }

  let session
  try {
    session = await decrypt(cookie)
    if (!session?.token) {
      throw new Error('Invalid session token.')
    }
  } catch (error) {
    console.error(
      'newSession: Failed to decrypt session or token missing:',
      error
    )
    redirect('/login?message=Invalid session. Please log in again.')
  }

  const currentUser = await getCurrentUser()
  if (!currentUser || !currentUser.id) {
    console.error('newSession: Could not fetch current user details.')
    redirect('/login?message=Could not verify user. Please log in again.')
  }
  const authenticatedUserId = currentUser.id

  const sessionDataString = formData.get('sessionData')
  const callbackUrl = '/gym/sessions'

  if (!sessionDataString) {
    console.log('newSession: Missing sessionData in form submission.')
    return {
      message: 'Form submission error: Missing session data.',
      errors: { form: 'Internal error: Session data was not submitted.' },
      fieldErrors: {},
    }
  }

  let sessionDataPayload
  try {
    sessionDataPayload = JSON.parse(sessionDataString)
    if (
      !sessionDataPayload.name ||
      typeof sessionDataPayload.name !== 'string' ||
      sessionDataPayload.name.trim() === ''
    ) {
      throw new Error('Session Name is required.')
    }
    if (
      !sessionDataPayload.date ||
      isNaN(new Date(sessionDataPayload.date).getTime())
    ) {
      throw new Error('Invalid Date format.')
    }
    if (
      !Array.isArray(sessionDataPayload.exercises) ||
      sessionDataPayload.exercises.length === 0
    ) {
      throw new Error('At least one exercise is required.')
    }

    sessionDataPayload.userId = authenticatedUserId
    console.log('Using authenticated User ID:', authenticatedUserId)
  } catch (error) {
    console.error('newSession: Error parsing or validating form data:', error)
    return {
      message: `Invalid form data: ${error.message}`,
      errors: { form: error.message },
      fieldErrors: {},
    }
  }

  const apiUrl = `${process.env.API_ORIGIN}/session`
  console.log(`newSession: Sending POST request to ${apiUrl}`)

  try {
    const response = await axios.post(apiUrl, sessionDataPayload, {
      headers: {
        Authorization: `Bearer ${session.token}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('newSession: API call successful.', response.data)

    // 5. Post-Success Actions
    // Revalidate pages that display session lists or details
    // Potentially revalidate the user's specific session list if you have one
    // revalidatePath(`/user/${authenticatedUserId}/sessions`);
    // If the API returns the new session ID, you could revalidate that specific page too
    if (response.data?.id) {
      revalidatePath(`/session/${response.data.id}`) // Example path
    }

    // Redirect on success
    // Note: redirect() throws an error, so code below won't execute.
    // If not redirecting, you'd return a success state:
    // return { message: "Session created successfully!", errors: null, fieldErrors: {} };
  } catch (error) {
    console.error('newSession: API call failed.')
    let errorMessage = 'Failed to save session due to an unexpected error.'
    let apiErrors = null

    if (axios.isAxiosError(error)) {
      console.error(
        `API Error (${error.response?.status}):`,
        error.response?.data || error.message
      )
      errorMessage = `API Error (${
        error.response?.status || 'Network Error'
      }): ${
        error.response?.data?.message ||
        error.message ||
        'Failed to save session.'
      }`
      apiErrors = error.response?.data || { api: error.message }
    } else {
      console.error('Non-Axios error:', error)
      errorMessage = `An unexpected error occurred: ${error.message}`
    }

    return {
      message: errorMessage,
      errors: apiErrors || { api: 'Failed to save session.' },
      fieldErrors: {},
    }
  }
  redirect(callbackUrl)
}

export const getSessionById = async (sessionId) => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  try {
    const res = await axios.get(
      `${process.env.API_ORIGIN}/session?id=${sessionId}`,
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    )
    return res.data
  } catch (err) {
    console.log(`error getting session with id: ${sessionId}`, err)
  }
}

export const getUserLatestSessions = async (user) => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  try {
    const res = await axios.get(
      `${process.env.API_ORIGIN}/session/user?userId=${user.id}`,
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    )
    return res.data
  } catch (err) {
    console.log("error getting user's sessions", err)
  }
}

export const getAllExercises = async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  try {
    const res = await axios.get(`${process.env.API_ORIGIN}/exercise`, {
      headers: { Authorization: `Bearer ${session.token}` },
    })
    return res.data
  } catch (err) {
    console.log('Error getting all exercises', err)
  }
}

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
