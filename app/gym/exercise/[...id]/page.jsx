import { MockExerciseHistoryResponse } from '@/mocks/MockExerciseHistoryResponse'

const ExercisePage = async ({ params }) => {
  const { id } = await params
  const getExerciseHistory = () => {
    return MockExerciseHistoryResponse[0]
  }

  const exerciseHistory = getExerciseHistory()

  return (
    <div className="text-center">
      <p className="text-4xl pb-5">History: {exerciseHistory.exercise.name}</p>
      <div className="flex flex-col gap-3">
        {exerciseHistory.exercise.sessions.map((session) => {
          let totalVolume = 0
          const sessionDate = () => {
            const dateRaw = session.date.split('T')[0].split('-')
            return dateRaw[2] + '-' + dateRaw[1] + '-' + dateRaw[0]
          }
          return (
            <div key={session.id}>
              <div className="bg-blue-700 p-5 rounded-2xl inset-shadow-xs inset-shadow-white/50 flex flex-row">
                <div className="basis-1/2 my-auto">
                  <p>Session: {session.name}</p>
                  <p>Date: {sessionDate()}</p>
                  <button className="p-2 bg-blue-800 rounded-2xl hover:bg-blue-900">
                    <a href={`/gym/${session.id}`}>View Session</a>
                  </button>
                </div>
                <div>
                  {session.sets.map((set) => {
                    totalVolume += set.weight
                    return (
                      <div
                        key={set.id}
                        className="flex flex-row gap-5 border-b-1 border-white/50 my-2"
                      >
                        <p>Set {set.order}</p>
                        <p>
                          {set.weight}kg x {set.reps}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div>
                <p>Session Volume: {totalVolume}kg</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExercisePage
