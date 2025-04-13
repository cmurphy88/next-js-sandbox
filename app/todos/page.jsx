import NewTodoForm from '@/components/NewTodoForm'
import TodoList from '@/components/TodoList'
import { getAllUsersTodos, getCurrentUser } from '@/utils/actions'

const getTodosData = async (user, complete) => {
  const todos = await getAllUsersTodos(user)
  const todosData = []
  todos.forEach((todo) => {
    if (todo.completed === complete) {
      todosData.push(todo)
    }
  })

  return todosData
}

const Todos = async () => {
  const user = await getCurrentUser()
  const openTodos = await getTodosData(user, false)
  const closedTodos = await getTodosData(user, true)
  return (
    <div className="text-center md:flex md:flex-row">
      <div className="flex-1 md:flex-1/2">
        <h1 className="pt-5 pb-5">Open</h1>
        <div className="mb-10">
          <TodoList todos={openTodos} />
        </div>
        <NewTodoForm />
      </div>
      <div className="md:flex-1/2">
        <h1 className="pt-5 pb-5">Closed</h1>
        <TodoList todos={closedTodos.slice(-10)} />
      </div>
    </div>
  )
}

export default Todos
