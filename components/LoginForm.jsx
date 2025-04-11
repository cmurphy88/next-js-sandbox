'use client'

import { useFormStatus } from 'react-dom'
// Correct import for useActionState is 'react'
import { useActionState } from 'react'
import { login } from '@/utils/actions'
// 1. Import useSearchParams
import { useSearchParams } from 'next/navigation'

const initialState = {
  // Adjust based on what your 'login' action returns on error
  // Based on the action code, it returns { error: 'message' }
  error: null,
  // message: null, // Let's use 'error' for simplicity
  // success: undefined, // Success is handled by redirect, state not needed here
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className="text-xl bg-green-500 py-2 px-5 rounded-md mt-4" // Added margin-top for spacing
      type="submit"
      aria-disabled={pending} // Use aria-disabled for accessibility
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  )
}

const LoginForm = () => {
  // 2. Get searchParams object
  const searchParams = useSearchParams()
  // 3. Extract callbackUrl, providing a default (your dashboard path)
  const callbackUrl = searchParams.get('callbackUrl') || '/health' // Default to /health

  // 4. Use useActionState
  const [state, formAction] = useActionState(login, initialState)

  return (
    // Added max-w-md and mx-auto for better centering and width control
    <div className="text-center pt-5 md:pt-10 max-w-md mx-auto">
      <p className="text-4xl pb-2 md:pb-10">Login</p>
      <form action={formAction}>
        {/* 5. Add the hidden input field */}
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        {/* Adjusted grid layout slightly for better label/input alignment */}
        <div className="text-2xl text-left p-2 grid grid-cols-1 gap-2 mb-3">
          <label className="p-1 block" htmlFor="email">
            Email:
          </label>
          <input
            // Changed background for better visibility if theme is dark
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

        {/* Display error message from state */}
        {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}

        <SubmitButton />
      </form>
    </div>
  )
}

export default LoginForm
