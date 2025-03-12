import TodoList from '@/components/TodoList'
import db from '@/utils/db'

const getData = async () => {
  const todos = await db.todo.findMany({
    where: {},
    orderBy: {
      createdAt: 'desc',
    },
  })
  console.log('TODOs: ', todos)
  return todos
}

const Todos = async () => {
  const todos = await getData()
  return (
    <div>
      <TodoList todos={todos} />
    </div>
  )
}

export default Todos
