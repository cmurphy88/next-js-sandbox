import { MockSessionResponse } from '@/mocks/MockSessionResponse'

const LogEntry = async ({ params }) => {
  const { id } = await params

  const getSessionById = (id) => {
    return MockSessionResponse[0]
  }

  const session = getSessionById(id)
  const sessionDate = () => {
    const dateTimeRaw = session.date
    const dateRaw = dateTimeRaw.split('T')[0].split('-')
    const dateString = dateRaw[2] + '-' + dateRaw[1] + '-' + dateRaw[0]

    return dateString
  }
  const sessionTime = () => {
    const dateTimeRaw = session.date
    const timeRaw = dateTimeRaw.split('T')[1].split(':')
    const timeString = timeRaw[0] + ':' + timeRaw[1]

    return timeString
  }

  let totalWeight = 0

  return (
    <div className="text-center w-11/12 md:w-4/5 mx-auto mt-5">
      <div className="bg-gray-600 rounded-2xl inset-shadow-sm inset-shadow-white/50 p-5">
        <p className="text-5xl pb-5">{session.name}</p>
        <p className="text-white/60">Date: {sessionDate()}</p>
        <p className="text-white/60">Time: {sessionTime()}</p>

        <div className="pt-5">
          <h1>Exercises</h1>
          {session.exercises.map((exercise) => {
            const exerciseLink = '/gym/exercise/' + exercise.id
            let totalWeightPerSet = 0
            return (
              <div className="text-left flex flex-col" key={exercise.id}>
                <div className="bg-gray-700 rounded-xl my-2 md:my-5 p-5 shadow-xl shadow-black/50 flex flex-row gap-5">
                  <p className="basis-2/5 md:text-3xl my-auto border-r-2">
                    <a className="hover:underline" href={exerciseLink}>
                      {exercise.name}
                    </a>
                  </p>
                  <div className="my-auto">
                    {exercise.sets.map((set) => {
                      totalWeightPerSet += set.weight * set.reps
                      totalWeight += totalWeightPerSet
                      return (
                        <div
                          className="flex flex-row gap-5 md:text-2xl"
                          key={set.id}
                        >
                          <p className="italic">Set {set.order}:</p>
                          <p>
                            {set.weight}kg x {set.reps}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p className="text-center">Total: {totalWeightPerSet}kg</p>
              </div>
            )
          })}
          <div className="p-5">
            <h1 className="pb-3">Session Stats</h1>
            <div className="flex flex-row gap-3 justify-evenly">
              <p className="p-5 bg-blue-400 rounded-2xl shadow-xl shadow-black">
                <span className="font-bold">Total session volume:</span>{' '}
                {totalWeight}kg
              </p>
              <p className="p-5 bg-blue-400 rounded-2xl shadow-xl shadow-black">
                <span className="font-bold">Total exercises complete:</span>{' '}
                {session.exercises.length}
              </p>
              <p className="p-5 bg-blue-400 rounded-2xl shadow-xl shadow-black">
                <span className="font-bold">Date:</span> {sessionDate()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogEntry
