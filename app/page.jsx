import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignUpForm'
import { getCurrentUser } from '@/utils/actions'

const Home = async () => {
  const user = await getCurrentUser()

  return (
    <div>
      <h1 className="text-center py-5">LifePro</h1>
      {!user && (
        <div className="">
          <div className="">
            <LoginForm />
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
