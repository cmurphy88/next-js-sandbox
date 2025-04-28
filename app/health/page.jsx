import CollapsibleBox from '@/components/CollapsibleBox'

const HealthDashboard = async () => {
  return (
    <div>
      <h1 className="pt-3 pb-3">Health</h1>
      <div className="flex flex-col">
        <CollapsibleBox
          title={'Health Blueprint'}
          children={
            <div className="health-info mt-5">
              <div className="rounded-3xl bg-gray-700 mb-10">
                <div className="p-5">
                  <h2>Goal</h2>
                  <div>
                    <ul>
                      <li>Reach 90kg</li>
                    </ul>
                    <p>How can you do that?</p>
                    <ol className="list-decimal list-inside">
                      <li>Consume 1800 cals p/day</li>
                      <li>Walk 10k steps p/day</li>
                      <li>Srength training 3 p/week</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-gray-900 mb-10">
                <div className="px-5 py-5">
                  <h2 className="pb-5">The Ideal Day</h2>
                  <div className="grid md:grid-cols-3">
                    <div className="px-5 py-5">
                      <h2 className="italic">Daily</h2>
                      <ul className="list-disc list-inside space-y-5">
                        <li>
                          Exercise - gym / run
                          <span className=" pl-2 italic text-white/50">
                            {' '}
                            30-60m
                          </span>
                        </li>
                        <li>Ice Bath x1</li>
                      </ul>
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
                  <p className="italic text-white/25 pb-5">
                    Goal: to improve fitness
                  </p>
                  <ul className="list-disc list-inside space-y-5">
                    <li>Running</li>
                    <li>Ice Bath</li>
                    <li>Suana</li>
                  </ul>
                </div>
                <div className="px-5 py-5">
                  <h2 className="pb-3">Mind 🧠</h2>
                  <p className="italic text-white/25 pb-5">
                    Goal: to improve strength
                  </p>
                  <ul className="list-disc list-inside space-y-5">
                    <li>Breath Work</li>
                    <li>Meditation</li>
                  </ul>
                </div>
              </div>
            </div>
          }
        />
        <CollapsibleBox
          title={'Gym'}
          children={
            <div className="flex gap-2 mt-5 text-xl">
              <div className="bg-blue-400 hover:bg-blue-300 text-xl p-3 rounded-xl">
                <button>
                  <a href="/gym/plan">Gym Log</a>
                </button>
              </div>
              <div className="bg-blue-400 hover:bg-blue-300 text-xl p-3 rounded-xl">
                <button>
                  <a href="/health/weight">Weight</a>
                </button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default HealthDashboard
