import TodoTile from '@/components/TodoTile'
import WeightTile from '@/components/WeightTile'
import { getCurrentUser } from '@/utils/actions'

const DashboardPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className="text-center">
      <h1>Dashboard</h1>
      <div className="rounded-3xl p-10 mt-10 bg-slate-700 shadow-lg shadow-gray-500">
        <div>
          <button className="p-3 rounded-2xl hover:bg-slate-600">
            <a className="text-4xl" href="/gym">
              Go to Workouts {'>'}
            </a>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 pt-10">
        <div className="rounded-3xl p-10 bg-slate-700 basis-1/2 flex flex-col shadow-lg shadow-gray-500">
          <WeightTile />
        </div>
        <div className="rounded-3xl p-10 bg-slate-700 basis-1/2 flex flex-col shadow-lg shadow-gray-500">
          <TodoTile />
        </div>
      </div>
      <div className="mt-10">
        <h1>Quick Links</h1>
      </div>
    </div>
  )
}

export default DashboardPage
