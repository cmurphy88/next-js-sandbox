import React from 'react'

const TodosLayout = ({ children }) => {
  return (
    <>
      <div>
        <h1>Todos</h1>
        {children}
      </div>
    </>
  )
}

export default TodosLayout
