const Plan = () => {
  const daysOfTheWeek = [
    { pos: 1, name: 'Monday' },
    { pos: 2, name: 'Tuesday' },
    { pos: 3, name: 'Wednesday' },
    { pos: 4, name: 'Thursday' },
    { pos: 5, name: 'Friday' },
    { pos: 6, name: 'Saturday' },
    { pos: 7, name: 'Sunday' },
  ]

  return (
    <>
      <div>
        <h1 className="pt-3 pb-3">Plan</h1>
      </div>
      <div className="grid grid-cols-7 grid-rows-4">
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
      <div>
        <table className="table-fixed border-separate border-spacing-3 border border-gray-400 dark:border-gray-500">
          <thead>
            <tr>
              {daysOfTheWeek.map((day) => (
                <th
                  key={day.pos}
                  className="border border-gray-300 dark:border-gray-600"
                >
                  {day.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1961</td>
            </tr>
            <tr>
              <td>1972</td>
            </tr>
            <tr>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Plan
