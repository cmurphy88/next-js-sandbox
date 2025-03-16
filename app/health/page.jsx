const HealthDashboard = () => {
  return (
    <div>
      <h1 className="pb-3">Health Dashboard</h1>
      <div className="rounded-3xl bg-gray-900 mb-10">
        <div className="px-5 py-5">
          <h2 className="pb-5">Schedule</h2>
          <div className="grid md:grid-cols-3">
            <div className="px-5 py-5">
              <h2 className="italic">Daily</h2>
            </div>
            <div className="px-5 py-5">
              <h2 className="italic">Weekly</h2>
            </div>
            <div className="px-5 py-5">
              <h2 className="italic">Monthly</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-gray-800 grid md:grid-cols-3">
        <div className="px-5 py-5">
          <h2 className="pb-3">Body 💪</h2>
          <p className="italic text-white/25 pb-5">
            Goal: to improve strength and flexibility
          </p>
          <ul className="list-disc list-inside space-y-5">
            <li>Weight Traing</li>
            <li>
              Diet{' '}
              <ul className="list-decimal list-inside pl-5">
                <li>Food</li>
                <li>Suppliments</li>
              </ul>
            </li>
            <li>
              Mobility
              <ul className="list-decimal list-inside pl-5">
                <li>Streches/Yoga</li>
                <li>Bodyweight Exercises</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="px-5 py-5">
          <h2 className="pb-3">Heart 🫀</h2>
          <p className="italic text-white/25 pb-5">Goal: to improve fitness</p>
          <ul className="list-disc list-inside space-y-5">
            <li>Running</li>
            <li>Ice Bath</li>
            <li>Suana</li>
          </ul>
        </div>
        <div className="px-5 py-5">
          <h2 className="pb-3">Mind 🧠</h2>
          <p className="italic text-white/25 pb-5">Goal: to improve strength</p>
          <ul className="list-disc list-inside space-y-5">
            <li>Breath Work</li>
            <li>Meditation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HealthDashboard
