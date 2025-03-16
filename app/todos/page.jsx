import NewTodoForm from '@/components/NewTodoForm'
import TodoList from '@/components/TodoList'
import db from '@/utils/db'

const getOpenTodosData = async () => {
  const openTodos = await db.todo.findMany({
    where: {
      completed: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  console.log('TODOs: ', openTodos)
  return openTodos
}

const getClosedTodosData = async () => {
  const closedTodos = await db.todo.findMany({
    where: {
      completed: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  return closedTodos
}

const Todos = async () => {
  const openTodos = await getOpenTodosData()
  const closedTodos = await getClosedTodosData()
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
        <TodoList todos={closedTodos} />
      </div>
    </div>
  )
}

export default Todos
