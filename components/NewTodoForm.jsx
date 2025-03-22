import { newTodo } from '@/utils/actions'

const NewTodoForm = ({}) => {
  return (
    <div className="md:flex">
      <form action={newTodo}>
        <input
          name="content"
          type="text"
          className="border border-white/25 mr-3 p-0.5 rounded-2xl bg-white/10"
        />
        <button
          className="rounded-2xl md:mx-5 p-3 sm:mx-2 hover:bg-green-700"
          type="submit"
        >
          New Todo
        </button>
      </form>
    </div>
  )
}

export default NewTodoForm
