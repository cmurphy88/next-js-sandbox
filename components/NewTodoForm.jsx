import { newTodo } from '@/utils/actions'

const NewTodoForm = ({}) => {
  return (
    <div>
      <form action={newTodo}>
        <input
          name="content"
          type="text"
          className="border boorder-black/25 mr-5 p-0.5"
        />
        <button
          className="rounded-2xl mx-5 p-3 hover:bg-green-700"
          type="submit"
        >
          New Todo
        </button>
      </form>
    </div>
  )
}

export default NewTodoForm
