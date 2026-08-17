import { useState } from 'react'

const StudentModal = ({ onClose, selectedStudent, classId }) => {
  const [name, setName] = useState(selectedStudent ? selectedStudent.name : '')
  const [studentIdentifier, setStudentIdentifier] = useState(selectedStudent ? selectedStudent.student_identifier : '')

  const handleSubmit = async () => {
    const studentData = { name, student_identifier: studentIdentifier, user_id: 1 }

    if (selectedStudent) {
      await fetch(`http://localhost:4000/api/students/${selectedStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      })
    } else {
      await fetch('http://localhost:4000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 style={{ fontFamily: 'DM Serif Display, serif' }} className="text-2xl text-gray-900 mb-1">
          {selectedStudent ? 'Edit Student' : 'Add Student'}
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          {selectedStudent ? 'Update the student details below' : 'Fill in the details for your new student'}
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Marcus Johnson"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">Student ID</label>
            <input
              type="text"
              value={studentIdentifier}
              onChange={(e) => setStudentIdentifier(e.target.value)}
              placeholder="e.g. STU-006"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-green-400"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 bg-green-500 rounded-xl py-2 text-sm text-white hover:bg-green-600 cursor-pointer">
            {selectedStudent ? 'Save changes' : 'Add student'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentModal