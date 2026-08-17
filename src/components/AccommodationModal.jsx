import { useState } from 'react'

const AccommodationModal = ({ onClose, selectedAccommodation, studentId }) => {
  const [title, setTitle] = useState(selectedAccommodation ? selectedAccommodation.title : '')
  const [description, setDescription] = useState(selectedAccommodation ? selectedAccommodation.description : '')
  const [category, setCategory] = useState(selectedAccommodation ? selectedAccommodation.category : 'Testing')
  const [frequency, setFrequency] = useState(selectedAccommodation ? selectedAccommodation.frequency : 'Always')

  const handleSubmit = async () => {
    const accommodationData = { title, description, category, frequency, student_id: studentId }

    if (selectedAccommodation) {
      await fetch(`http://localhost:4000/api/accommodations/${selectedAccommodation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accommodationData)
      })
    } else {
      await fetch('http://localhost:4000/api/accommodations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accommodationData)
      })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 style={{ fontFamily: 'DM Serif Display, serif' }} className="text-2xl text-gray-900 mb-1">
          {selectedAccommodation ? 'Edit Accommodation' : 'Add Accommodation'}
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          {selectedAccommodation ? 'Update the accommodation details below' : 'Fill in the details for this accommodation'}
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Extended Time"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Allow 1.5x time on all assessments"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-green-400"
            >
              <option>Testing</option>
              <option>Environment</option>
              <option>Behavior</option>
            </select>
          </div>
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-green-400"
            >
              <option>Always</option>
              <option>Daily</option>
              <option>As needed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 bg-green-500 rounded-xl py-2 text-sm text-white hover:bg-green-600 cursor-pointer">
            {selectedAccommodation ? 'Save changes' : 'Add accommodation'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccommodationModal