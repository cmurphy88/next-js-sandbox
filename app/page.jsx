import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignUpForm'
import { getCurrentUser } from '@/utils/actions'

const Home = async () => {
  const user = await getCurrentUser()

  return (
    <div>
      <h1 className="py-5">Dashboard</h1>
      {!user && (
        <div className="md:flex">
          <div className="">
            <LoginForm />
          </div>
          <div className="">
            <SignupForm />
          </div>
        </div>
      )}
      {user && (
        <div>
          <p className="text-4xl">Welcome Back {user.firstName}!</p>
        </div>
      )}
    </div>
  )
}

export default Home
