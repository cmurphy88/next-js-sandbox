const pullExercises = [
  {
    name: 'Bent Over Row',
    sets: [
      {
        number: 1,
        weight: 30,
        reps: 8,
      },
      {
        number: 2,
        weight: 30,
        reps: 6,
      },
      {
        number: 3,
        weight: 25,
        reps: 10,
      },
    ],
  },
  {
    name: 'Barbell Curl',
    sets: [
      {
        number: 1,
        weight: 40,
        reps: 6,
      },
      {
        number: 2,
        weight: 40,
        reps: 5,
      },
    ],
  },
  {
    name: 'Incline Dumbbell Curl',
    sets: [
      {
        number: 1,
        weight: 25,
        reps: 8,
      },
      {
        number: 2,
        weight: 25,
        reps: 8,
      },
      {
        number: 3,
        weight: 25,
        reps: 6,
      },
    ],
  },
  {
    name: 'Lat Pulldown',
    sets: [
      {
        number: 1,
        weight: 40,
        reps: 18,
      },
      {
        number: 2,
        weight: 40,
        reps: 16,
      },
      {
        number: 3,
        weight: 40,
        reps: 14,
      },
      {
        number: 4,
        weight: 30,
        reps: 16,
      },
      {
        number: 5,
        weight: 25,
        reps: 14,
      },
    ],
  },
]

const GymPlan = () => {
  return (
    <div className="text-center">
      <p className="text-4xl">Gym Plan</p>
      <div className="pt-10">
        <div className="">
          <h1>Pull</h1>
          <div>
            {pullExercises.map((exercise) => {
              const sets = exercise.sets
              return (
                <div className="flex flex-row gap-5 py-2 text-right">
                  <p className="basis-1/4 uppercase">{exercise.name}</p>
                  {sets.map((set) => {
                    return (
                      <p className="">
                        <span className="font-extrabold">
                          Set {set.number}:{' '}
                        </span>
                        {set.weight}kg x {set.reps}
                      </p>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="md:flex-1/3">
          <h1>Push</h1>
        </div>
        <div className="md:flex-1/3">
          <h1>Legs</h1>
        </div>
      </div>
    </div>
  )
}

export default GymPlan
