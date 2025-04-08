'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { login } from '@/utils/actions'

const initialState = {
  message: null,
  success: undefined,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className="text-xl bg-green-500 py-2 px-5 rounded-md"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  )
}

const LoginForm = () => {
  const [state, formAction] = useActionState(login, initialState)

  return (
    <div className="text-center pt-5 md:pt-10 max-w-2/3">
      <p className="text-4xl pb-2 md:pb-10">Login</p>
      <form action={formAction}>
        <div className="text-2xl text-left md:text-right p-2 grid grid-cols-1 md:grid-cols-2">
          <label className="p-2" htmlFor="email">
            Email:
          </label>
          <input
            className="bg-white/50 rounded-2xl p-2"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="text-2xl text-left md:text-right p-2 grid grid-cols-1 md:grid-cols-2">
          <label className="p-2" htmlFor="password">
            Password:
          </label>
          <input
            className="bg-white/50 rounded-2xl p-2"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        {state?.message && (
          <p style={{ color: state.success === false ? 'red' : 'green' }}>
            {state.message}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  )
}

export default LoginForm
