'use client'

import { signup } from '@/utils/actions'
import { useActionState } from 'react'

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <div className="text-center pt-5 md:pt-10 max-w-2/3">
      <p className="text-4xl pb-2 md:pb-10">Signup</p>
      <form action={action}>
        <div className="text-2xl text-left md:text-right p-2 grid grid-cols-1 md:grid-cols-2">
          <label className="p-2" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="bg-white/50 rounded-2xl p-2"
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
        </div>
        {state?.errors?.firstName && <p>{state.errors.firstName}</p>}

        <div className="text-2xl text-left md:text-right p-2 grid grid-cols-1 md:grid-cols-2">
          <label className="p-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="bg-white/50 rounded-2xl p-2"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        {state?.errors?.lastName && <p>{state.errors.lastName}</p>}

        <div className="text-2xl text-left md:text-right p-2 grid grid-cols-1 md:grid-cols-2">
          <label className="p-2" htmlFor="email">
            Email
          </label>
          <input
            className="bg-white/50 rounded-2xl p-2"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div className="text-2xl text-left md:text-right p-2 grid grid-cols-1 md:grid-cols-2">
          <label className="p-2" htmlFor="password">
            Password
          </label>
          <input
            className="bg-white/50 rounded-2xl p-2"
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
