import NewSessionForm from '@/components/NewSessionForm'
import { getAllExercises, getCurrentUser } from '@/utils/actions'

const NewSessionPage = async () => {
  const exerciseOptions = await getAllExercises()
  const user = await getCurrentUser()
  return (
    <div>
      <NewSessionForm exerciseOptions={exerciseOptions} user={user} />
    </div>
  )
}

export default NewSessionPage
