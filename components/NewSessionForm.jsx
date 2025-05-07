'use client'

import { useSearchParams } from 'next/navigation'
import { useActionState, useState, useEffect } from 'react'
import { getAllExercises, getCurrentUser, newSession } from '@/utils/actions'

const getCurrentDateTimeLocalString = () => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000 // Offset in milliseconds
  const localISOTime = new Date(now - offset).toISOString().slice(0, 16) // Get YYYY-MM-DDTHH:mm
  return localISOTime
}

// Initial structures (same as before)
const initialExercise = {
  id: null,
  name: '',
  isCreatingNew: false,
  sets: [{ weight: '', reps: '' }],
}
const initialSet = { weight: '', reps: '' }
const initialState = { message: null, errors: null, fieldErrors: {} }

const NewSessionForm = ({ exerciseOptions = [], user }) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/health'

  const [formData, setFormData] = useState({
    name: '',
    userId: user.id,
    date: getCurrentDateTimeLocalString(),
    exercises: [JSON.parse(JSON.stringify(initialExercise))],
  })

  const [state, formAction] = useActionState(newSession, initialState)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExerciseChange = (index, e) => {
    const selectedValue = e.target.value // This will now be the ID or '__CREATE_NEW__' or ''
    const updatedExercises = [...formData.exercises]

    if (selectedValue === '__CREATE_NEW__') {
      // Switch to create mode
      updatedExercises[index] = {
        ...updatedExercises[index],
        id: null, // No ID when creating new
        name: '',
        isCreatingNew: true,
      }
    } else if (selectedValue === '') {
      // Placeholder selected - reset
      updatedExercises[index] = {
        ...updatedExercises[index],
        id: null,
        name: '',
        isCreatingNew: false,
      }
    } else {
      // Find the selected exercise object from the options using the ID
      const selectedExercise = exerciseOptions.find(
        (opt) => opt.id === selectedValue
      )

      if (selectedExercise) {
        // Update state with both ID and Name from the found option
        updatedExercises[index] = {
          ...updatedExercises[index],
          id: selectedExercise.id, // Store the ID
          name: selectedExercise.name, // Store the Name
          isCreatingNew: false,
        }
      } else {
        // Handle case where ID might not be found (shouldn't happen with valid data)
        console.error(`Exercise with ID ${selectedValue} not found in options.`)
        updatedExercises[index] = {
          ...updatedExercises[index],
          id: null,
          name: '',
          isCreatingNew: false,
        }
      }
    }
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  // handleNewExerciseNameChange: Ensure ID is null when typing new name
  const handleNewExerciseNameChange = (index, e) => {
    const { value } = e.target
    const updatedExercises = [...formData.exercises]
    // Update name, keep isCreatingNew true, ensure ID is null
    updatedExercises[index] = {
      ...updatedExercises[index],
      id: null,
      name: value,
    }
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  // handleCancelCreateNew: Ensure ID is cleared
  const handleCancelCreateNew = (index) => {
    const updatedExercises = [...formData.exercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      id: null,
      name: '',
      isCreatingNew: false,
    }
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  const handleSetChange = (exerciseIndex, setIndex, e) => {
    const { name, value } = e.target
    const updatedExercises = [...formData.exercises]
    const updatedSets = [...updatedExercises[exerciseIndex].sets]
    const processedValue =
      name === 'weight' && value !== '' ? parseFloat(value) || 0 : value
    updatedSets[setIndex] = { ...updatedSets[setIndex], [name]: processedValue }
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      sets: updatedSets,
    }
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  // --- Dynamic List Handlers (same logic as before) ---
  const addExercise = () => {
    setFormData((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        // Ensure new exercises start with isCreatingNew: false
        JSON.parse(JSON.stringify(initialExercise)),
      ],
    }))
  }

  const removeExercise = (index) => {
    if (formData.exercises.length <= 1) return
    const updatedExercises = formData.exercises.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  const addSet = (exerciseIndex) => {
    const updatedExercises = [...formData.exercises]
    updatedExercises[exerciseIndex].sets.push({ ...initialSet })
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  const removeSet = (exerciseIndex, setIndex) => {
    const updatedExercises = [...formData.exercises]
    if (updatedExercises[exerciseIndex].sets.length <= 1) return
    const updatedSets = updatedExercises[exerciseIndex].sets.filter(
      (_, i) => i !== setIndex
    )
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      sets: updatedSets,
    }
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }))
  }

  // --- Effect for messages (same logic as before) ---
  useEffect(() => {
    if (state.message && !state.errors) {
      // Consider using a toast library for better UX
    }
    if (state.errors) {
      console.error('Server Action Errors:', state.errors)
    }
  }, [state])

  // --- Function to Prepare Data for Submission ---
  const prepareSessionData = () => {
    // Convert the datetime-local string to a full ISO string (UTC)
    let isoDateString
    try {
      // Parse the local datetime string. This creates a Date object
      // representing that specific time in the *browser's local timezone*.
      const localDate = new Date(formData.date)
      if (isNaN(localDate.getTime())) {
        // Handle invalid date input gracefully - fallback to current time
        console.warn('Invalid date detected, using current time.')
        isoDateString = new Date().toISOString()
      } else {
        // Convert the local date object to a UTC ISO string
        isoDateString = localDate.toISOString()
      }
    } catch (e) {
      console.error('Error parsing date, using current time:', e)
      isoDateString = new Date().toISOString() // Fallback
    }

    return JSON.stringify({
      ...formData,
      date: isoDateString, // Use the generated ISO string
      userId: formData.userId, // Ensure this is handled securely on server
      exercises: formData.exercises.map((ex) => ({
        ...ex,
        // Ensure name is not empty if using a dropdown with a placeholder
        name: ex.name || 'Unnamed Exercise', // Or handle validation better
        sets: ex.sets.map((set, index) => ({
          ...set,
          order: index + 1,
          weight: set.weight === '' ? 0 : parseFloat(set.weight || 0),
          reps: set.reps === '' ? '0' : String(set.reps || '0'),
        })),
      })),
    })
  }

  return (
    // --- Container ---
    // Added dark mode background and border colors
    <div className="max-w-3xl mx-auto my-8 p-8 border rounded-lg shadow-md bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      {/* Added dark mode text color */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        New Workout Session
      </h1>

      {/* --- Server Action Feedback --- */}
      {/* Added dark mode styles for error/success banners */}
      {state?.errors && (
        <div className="mb-4 p-4 border rounded bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300">
          Error: {state.message || JSON.stringify(state.errors)}
        </div>
      )}
      {state?.message && !state.errors && (
        <div className="mb-4 p-4 border rounded bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300">
          {state.message}
        </div>
      )}

      {/* --- Form --- */}
      <form action={formAction} className="flex flex-col gap-6">
        {/* Hidden inputs remain the same */}
        <input type="hidden" name="sessionData" value={prepareSessionData()} />
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        {/* --- Session Details --- */}
        <div className="flex flex-col gap-2">
          {/* Added dark mode text color */}
          <label
            htmlFor="name"
            className="font-bold text-sm text-gray-700 dark:text-gray-400"
          >
            Session Name:
          </label>
          {/* Added dark mode background, border, text, placeholder colors */}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="p-3 border rounded text-base outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            placeholder="e.g., Push Day"
          />
          {/* Example: Display field-specific error (Added dark text color) */}
          {state?.fieldErrors?.name && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="date"
            className="font-bold text-sm text-gray-700 dark:text-gray-400"
          >
            Date and Time: {/* Changed Label */}
          </label>
          {/* Changed input type to datetime-local */}
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="p-3 border rounded text-base outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:[color-scheme:dark]"
          />
          {state?.fieldErrors?.date && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {state.fieldErrors.date}
            </p>
          )}
        </div>

        {/* --- Exercises Section --- */}
        <h2 className="mt-6 mb-2 pb-2 border-b text-xl font-semibold text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700">
          Exercises
        </h2>
        {/* {isLoadingExercises && <p className="text-gray-500 dark:text-gray-400">Loading exercises...</p>} */}
        {/* {!isLoadingExercises && formData.exercises.map((exercise, exerciseIndex) => ( */}
        {formData.exercises.map((exercise, exerciseIndex) => (
          <div
            key={exerciseIndex}
            className="border rounded p-4 mb-4 shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Exercise #{exerciseIndex + 1}
              </h3>
              {formData.exercises.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExercise(exerciseIndex)}
                  className="..."
                >
                  Remove Exercise
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor={`exerciseName-${exerciseIndex}`}
                className="font-bold text-sm text-gray-700 dark:text-gray-400"
              >
                Exercise Name:
              </label>
              {/* CONDITIONAL RENDERING: Select OR Input */}
              {exercise.isCreatingNew ? (
                // --- CREATE NEW INPUT ---
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id={`newExerciseName-${exerciseIndex}`}
                    name={`newExerciseName-${exerciseIndex}`}
                    value={exercise.name} // Still bind to name
                    onChange={(e) =>
                      handleNewExerciseNameChange(exerciseIndex, e)
                    }
                    required
                    className="flex-grow p-3 border rounded ..."
                    placeholder="Enter new exercise name"
                  />
                  <button
                    type="button"
                    onClick={() => handleCancelCreateNew(exerciseIndex)}
                    className="..."
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // --- SELECT DROPDOWN ---
                <select
                  id={`exerciseName-${exerciseIndex}`}
                  name={`exerciseName-${exerciseIndex}`}
                  // Use the exercise ID as the value for the select
                  value={exercise.id || ''} // Bind to the ID in state, default to '' if null
                  onChange={(e) => handleExerciseChange(exerciseIndex, e)}
                  required={!exercise.isCreatingNew && !exercise.id} // Require selection if not creating AND no ID yet
                  className="p-3 border rounded ..."
                >
                  <option value="" disabled>
                    Select an exercise
                  </option>
                  <option value="__CREATE_NEW__">
                    -- Create New Exercise --
                  </option>
                  {(exerciseOptions || []).map((option) => (
                    // IMPORTANT: Use option.id as the value now
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* --- Sets Section --- */}
            {/* Added dark mode text color */}
            <h4 className="mt-4 mb-2 text-base font-bold text-gray-700 dark:text-gray-300">
              Sets
            </h4>
            <div className="space-y-3">
              {exercise.sets.map((set, setIndex) => (
                // Added dark mode background color
                <div
                  key={setIndex}
                  className="flex items-center gap-4 flex-wrap p-2 rounded bg-gray-50 dark:bg-gray-700/50"
                >
                  {/* Added dark mode text color */}
                  <span className="font-bold min-w-[40px] text-sm text-gray-600 dark:text-gray-400">
                    Set {setIndex + 1}:
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Added dark mode text color */}
                    <label
                      htmlFor={`weight-${exerciseIndex}-${setIndex}`}
                      className="text-sm text-gray-700 dark:text-gray-300 min-w-[50px]"
                    >
                      Weight:
                    </label>
                    {/* Added dark mode background, border, text, placeholder colors */}
                    <input
                      type="number"
                      id={`weight-${exerciseIndex}-${setIndex}`}
                      name="weight"
                      value={set.weight}
                      onChange={(e) =>
                        handleSetChange(exerciseIndex, setIndex, e)
                      }
                      step="0.5"
                      min="0"
                      required
                      className="p-2 border rounded text-sm w-[80px] outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                      placeholder="kg/lbs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Added dark mode text color */}
                    <label
                      htmlFor={`reps-${exerciseIndex}-${setIndex}`}
                      className="text-sm text-gray-700 dark:text-gray-300 min-w-[35px]"
                    >
                      Reps:
                    </label>
                    {/* Added dark mode background, border, text, placeholder colors */}
                    <input
                      type="number"
                      id={`reps-${exerciseIndex}-${setIndex}`}
                      name="reps"
                      value={set.reps}
                      onChange={(e) =>
                        handleSetChange(exerciseIndex, setIndex, e)
                      }
                      min="0"
                      required
                      className="p-2 border rounded text-sm w-[80px] outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                      placeholder="e.g., 8"
                    />
                  </div>
                  {exercise.sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSet(exerciseIndex, setIndex)}
                      // Added dark mode styles for remove button (small x)
                      className="ml-auto py-1 px-2 rounded-full text-sm leading-none transition-colors duration-150 ease-in-out bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800/50 dark:text-red-200 dark:hover:bg-red-700/60"
                      aria-label={`Remove Set ${setIndex + 1}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addSet(exerciseIndex)}
              // Added dark mode styles for add set button
              className="mt-3 py-2 px-4 rounded text-sm font-bold transition-colors duration-150 ease-in-out self-start bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
            >
              Add Set
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addExercise}
          // Added dark mode styles for add exercise button
          className="py-3 px-6 rounded text-sm font-bold transition-colors duration-150 ease-in-out self-center mt-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800/60 dark:text-blue-200 dark:hover:bg-blue-700/70"
        >
          Add Another Exercise
        </button>

        {/* Added dark mode border color */}
        <hr className="border-0 border-t my-8 mb-4 border-gray-300 dark:border-gray-700" />

        <button
          type="submit"
          // Submit button styles often work well in both modes, added subtle dark hover change
          className="w-full p-4 rounded text-lg font-bold transition-colors duration-150 ease-in-out focus:ring-2 focus:ring-offset-2 bg-green-600 text-white hover:bg-green-700 dark:hover:bg-green-500 focus:ring-green-500 dark:focus:ring-offset-gray-900"
          // disabled={state.pending}
        >
          Save Session
        </button>
      </form>
    </div>
  )
}

export default NewSessionForm
