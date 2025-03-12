import NewTodoForm from '@/components/NewTodoForm'
import React from 'react'

const TodosLayout = ({ children }) => {
  return (
    <>
      <div>
        <h1>Todos</h1>
        <div class="max-w-md overflow-hidden rounded-xl md:max-w-2xl">
          <div className="md:flex">
            <div className="mr-10">
              <h2 className="pt-5 pb-1.5">Open</h2>
              <NewTodoForm />
              <div>{children}</div>
            </div>
            <div>
              <h2>Closed</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodosLayout
