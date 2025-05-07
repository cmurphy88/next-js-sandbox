import CollapsibleBox from '@/components/CollapsibleBox'
import Session from '@/components/Session'
import { MockSessionResponse } from '@/mocks/MockSessionResponse'
import { WorkoutPlans } from '@/mocks/MockWorkoutPlans'
import { getCurrentUser, getUserLatestSessions } from '@/utils/actions'

const GymPage = async () => {
  const user = await getCurrentUser()

  const getUsersSessions = async () => {
    const sessions = await getUserLatestSessions(user)
    if (sessions.length > 0) {
      return sessions.slice(0, 5)
    } else {
      return null
    }
  }

  const usersSessions = await getUsersSessions()

  const getLatestSession = () => {
    if (usersSessions !== null) {
      return usersSessions[0]
    }
  }
  const latestSession = getLatestSession()

  const getWorkoutPlans = () => {
    return WorkoutPlans
  }

  const workoutPlans = getWorkoutPlans()

  return (
    <div className="text-center mt-10 md:w-4/5 mx-auto">
      <div>
        <button className="bg-green-600 text-2xl p-5 rounded-2xl hover:bg-green-700">
          <a href="/gym/sessions/new">Start New Session</a>
        </button>
      </div>
      <div>
        <div className="">
          <div className="py-5 w-full">
            <h1>Latest Workouts</h1>
            {usersSessions && (
              <div>
                <div className="flex flex-col gap-2 pt-5">
                  {usersSessions.map((session) => {
                    return <Session {...session} key={session.id} />
                  })}
                </div>
                <div className="pt-3">
                  <a
                    className="text-left text-lg hover:underline"
                    href="/gym/sessions"
                  >
                    See all sessions {' >'}
                  </a>
                </div>
              </div>
            )}
            {!usersSessions && (
              <div>
                <p className="italic p-5">
                  You have no sessions yet, start a new one above
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1>Workout Plans</h1>
        {workoutPlans.map((plan) => {
          const execriseList = plan.exercises.map((exercise) => {
            return (
              <div
                key={plan.name}
                className="flex flex-row hover:bg-gray-900/50 text-left"
              >
                <p className="p-3 text-xl basis-1/2">{exercise.name}</p>
                <p className="p-3 pl-5 text-xl">
                  {exercise.sets} x {exercise.repLower}-{exercise.repUpper}
                </p>
              </div>
            )
          })
          return <CollapsibleBox title={plan.name} children={execriseList} />
        })}
      </div>
    </div>
  )
}

export default GymPage
