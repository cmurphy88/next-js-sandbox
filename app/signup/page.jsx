'use client'

import SignupForm from '@/components/SignUpForm'
import { Suspense } from 'react'

const SignUpPage = () => {
  return (
    <div>
      <Suspense>
        <SignupForm />
      </Suspense>
    </div>
  )
}

export default SignUpPage
