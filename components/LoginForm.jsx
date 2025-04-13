'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { login } from '@/utils/actions'
import { useSearchParams } from 'next/navigation'

const initialState = {
  error: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className="text-xl bg-green-500 py-2 px-5 rounded-md mt-4"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  )
}

const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/health'

  const [state, formAction] = useActionState(login, initialState)

  return (
    <div className="text-center pt-5 md:pt-10 max-w-md mx-auto">
      <p className="text-4xl pb-2 md:pb-10">Login</p>
      <form action={formAction}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="text-2xl text-left p-2 grid grid-cols-1 gap-2 mb-3">
          <label className="p-1 block" htmlFor="email">
            Email:
          </label>
          <input
            className="bg-gray-200 text-black rounded-lg p-2 w-full"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="text-2xl text-left p-2 grid grid-cols-1 gap-2 mb-4">
          <label className="p-1 block" htmlFor="password">
            Password:
          </label>
          <input
            className="bg-gray-200 text-black rounded-lg p-2 w-full"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}

        <SubmitButton />
      </form>
      <div className="pt-10">
        <p>Don't have an account?</p>
        <button className="text-xl bg-blue-500 py-2 px-5 rounded-md mt-4">
          <a href="/signup">Sign Up</a>
        </button>
      </div>
    </div>
  )
}

export default LoginForm
