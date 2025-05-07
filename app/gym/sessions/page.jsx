import Session from '@/components/Session'
import { getCurrentUser, getUserLatestSessions } from '@/utils/actions'

const SessionsPage = async () => {
  // const monthsOfYear = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ]
  const user = await getCurrentUser()

  const getUsersSessions = async () => {
    const sessions = await getUserLatestSessions(user)
    return sessions
  }

  const usersSessions = await getUsersSessions()

  // let months = []
  // const getSessionMonth = (session) => {
  //   const dateRaw = session.date
  //   const date = dateRaw.split('T')[0].split('-')
  //   const month = date[1]
  //   if (!months.includes(monthsOfYear[month - 1])) {
  //     months.push(monthsOfYear[month - 1])
  //   }
  //   return monthsOfYear[month - 1]
  // }

  return (
    <div>
      <div className="flex flex-col gap-2 pt-5 text-center">
        <p className="text-4xl pb-5">All Sessions</p>
        {usersSessions &&
          usersSessions.map((session) => {
            return (
              <div key={session.id}>
                <Session {...session} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default SessionsPage
