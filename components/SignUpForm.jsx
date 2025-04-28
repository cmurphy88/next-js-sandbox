'use client'

import { signup } from '@/utils/actions'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

const initialState = {
  error: null,
}

const SignupForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/health'

  const [state, action, pending] = useActionState(signup, initialState)

  return (
    <div className="text-center pt-5 md:pt-10 max-w-md mx-auto">
      <p className="text-4xl pb-2 md:pb-10">Signup</p>
      <form action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="text-2xl text-left p-2 grid grid-cols-1 gap-2 mb-3">
          <label className="p-1 block" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="bg-gray-200 text-black rounded-lg p-2 w-full"
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
        </div>
        {state?.errors?.firstName && <p>{state.errors.firstName}</p>}

        <div className="text-2xl text-left p-2 grid grid-cols-1 gap-2 mb-4">
          <label className="p-1 block" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="bg-gray-200 text-black rounded-lg p-2 w-full"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        {state?.errors?.lastName && <p>{state.errors.lastName}</p>}

        <div className="text-2xl text-left p-2 grid grid-cols-1 gap-2 mb-4">
          <label className="p-1 block" htmlFor="email">
            Email
          </label>
          <input
            className="bg-gray-200 text-black rounded-lg p-2 w-full"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div className="text-2xl text-left p-2 grid grid-cols-1 gap-2 mb-4">
          <label className="p-1 block" htmlFor="password">
            Password
          </label>
          <input
            className="bg-gray-200 text-black rounded-lg p-2 w-full"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="text-xl bg-blue-500 py-2 px-5 rounded-md"
          disabled={pending}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignupForm
