const Session = (session) => {
  const workoutString = (session) => {
    const dateRaw = session.date
    const date = dateRaw.split('T')[0].split('-')
    const year = date[0]
    const month = date[1]
    const day = date[2]
    return day + '-' + month + '-' + year
  }

  return (
    <a
      className="bg-gray-600 text-2xl hover: hover:bg-gray-500 hover:scale-105 rounded-md flex flex-row justify-between py-3"
      href={`/gym/${session.id}`}
      key={session.id}
    >
      <p className="text-3xl basis-1/2">{session.name}</p>
      <span className="text-white/50 pr-3">{workoutString(session)}</span>
    </a>
  )
}

export default Session
