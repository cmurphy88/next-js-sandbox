import CollapsibleBox from '@/components/CollapsibleBox'
import { MockSessionResponse } from '@/mocks/MockSessionResponse'
import { WorkoutPlans } from '@/mocks/MockWorkoutPlans'

const GymPage = () => {
  const getLatestSessions = () => {
    return MockSessionResponse.slice(0, 3)
  }

  const latestSessions = getLatestSessions()

  const getLatestSession = () => {
    return MockSessionResponse[0]
  }
  const latestSession = getLatestSession()

  const workoutString = (session) => {
    const dateRaw = session.date
    const date = dateRaw.split('T')[0].split('-')
    const year = date[0]
    const month = date[1]
    const day = date[2]
    const time = dateRaw.split('T')[1].split(':')
    const hour = time[0]
    const minute = time[1]
    console.log(time)
    return day + '-' + month + '-' + year + '@' + hour + ':' + minute
  }

  const getWorkoutPlans = () => {
    return WorkoutPlans
  }

  const workoutPlans = getWorkoutPlans()

  return (
    <div className="text-center mt-10 md:w-4/5 mx-auto">
      <p className="text-4xl pb-5">Gym Landing Page</p>
      <div>
        <p className="text-2xl">Workout Plans</p>
        {workoutPlans.map((plan) => {
          const execriseList = plan.exercises.map((exercise) => {
            return (
              <div className="flex flex-row hover:bg-gray-900/50 text-left">
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
      <div>
        <h2>Content</h2>
        <div className="">
          <div className="py-5 w-full">
            <h1>Latest Workouts</h1>
            <div className="flex flex-col gap-2">
              {latestSessions &&
                latestSessions.map((session) => {
                  return (
                    <a
                      className="bg-gray-600 text-2xl hover: hover:bg-gray-500 hover:scale-105"
                      href={`/gym/${session.id}`}
                    >
                      <p className="text-3xl">{session.name}</p>
                      <span className="text-white/50">
                        {workoutString(session)}
                      </span>
                    </a>
                  )
                })}
            </div>
          </div>
          <div className="bg-gray-500 p-5 rounded-xl">
            <h1>Latest workout</h1>
            <a
              className="text-2xl italic hover:underline"
              href={`/gym/${latestSession.id}`}
            >
              {latestSession.name}{' '}
              <span className="text-white/50">
                {workoutString(latestSession)}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GymPage
