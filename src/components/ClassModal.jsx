import { useState } from 'react'

const ClassModal = ({ onClose, selectedClass }) => {
  // track what the teacher types into each field
  // if editing, pre-fill with existing data. if creating, start empty
  const [name, setName] = useState(selectedClass ? selectedClass.name : '')
  const [description, setDescription] = useState(selectedClass ? selectedClass.description : '')

  // handle form submission — POST for new, PUT for edit
  const handleSubmit = async () => {
    const classData = { name, description }

    if (selectedClass) {
      // editing — hit the PUT route
      await fetch(`http://localhost:4000/api/classes/${selectedClass.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classData)
      })
    } else {
      // creating — hit the POST route
      await fetch('http://localhost:4000/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classData)
      })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 style={{ fontFamily: 'DM Serif Display, serif' }} className="text-2xl text-gray-900 mb-1">
          {selectedClass ? 'Edit Class' : 'Add Class'}
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          {selectedClass ? 'Update the class details below' : 'Fill in the details for your new class'}
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">Class name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Period 3 — Biology"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 10th grade Biology"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-green-400"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 rounded-xl py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-500 rounded-xl py-2 text-sm text-white hover:bg-green-600 cursor-pointer"
          >
            {selectedClass ? 'Save changes' : 'Add class'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClassModal