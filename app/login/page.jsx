'use client'

import LoginForm from '@/components/LoginForm'
import { Suspense } from 'react'

const LoginPage = () => {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}

export default LoginPage
