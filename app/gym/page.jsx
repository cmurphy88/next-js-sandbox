import { MockSessionResponse } from '@/mocks/MockSessionResponse'

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

  return (
    <div className="text-center mt-10 md:w-4/5 mx-auto">
      <h1>Gym Landing Page</h1>
      <div className="border-2 border-red-500">
        <h2>Content</h2>
        <div className="">
          <div className="py-5 w-full">
            <h1>Latest Workouts</h1>
            <div className="flex flex-col gap-2">
              {latestSessions &&
                latestSessions.map((session) => {
                  return (
                    <a
                      className="bg-gray-600 text-2xl hover:underline"
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
