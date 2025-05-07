import { getAllUsersTodos, getCurrentUser } from '@/utils/actions'
import TodoList from './TodoList'
import Link from 'next/link'
import NewTodoForm from './NewTodoForm'

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

const TodoTile = async () => {
  const user = await getCurrentUser()
  const openTodos = await getTodosData(user, false)

  return (
    <>
      {' '}
      <p className="text-4xl mb-4">Todo</p> <NewTodoForm />
      {openTodos.length > 0 && <TodoList todos={openTodos} />}
      {!openTodos.length > 0 && (
        <div className="">
          <p className="text-4xl">All up to date!</p>
        </div>
      )}
      <div className="pt-5 mt-auto">
        {' '}
        <Link href="/todos">
          {' '}
          <a className="inline-block p-3 rounded-xl bg-green-500 text-white font-semibold">
            {' '}
            Go to Todos
          </a>
        </Link>
      </div>
    </>
  )
}

export default TodoTile
