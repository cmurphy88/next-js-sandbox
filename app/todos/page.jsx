import NewTodoForm from '@/components/NewTodoForm'
import TodoList from '@/components/TodoList'
import { getAllUsersTodos, getCurrentUser } from '@/utils/actions'
import db from '@/utils/db'

const getTodosData = async (user, complete) => {
  const todos = await getAllUsersTodos(user)
  const openTodos = []
  todos.forEach((todo) => {
    if (todo.completed === complete) {
      openTodos.push(todo)
    }
  })

  return openTodos
}

const Todos = async () => {
  const user = await getCurrentUser()
  const openTodos = await getTodosData(user, false)
  const closedTodos = await getTodosData(user, true)
  return (
    <div className="md:flex">
      <div className="mr-10 mb-15">
        <h2 className="pt-5 pb-1.5">Open</h2>
        <NewTodoForm />
        <div className="mt-5">
          <TodoList todos={openTodos} />
        </div>
      </div>
      <div>
        <h2 className="pt-5 pb-1.5">Closed</h2>
        <TodoList todos={closedTodos.slice(-10)} />
      </div>
    </div>
  )
}

export default Todos
