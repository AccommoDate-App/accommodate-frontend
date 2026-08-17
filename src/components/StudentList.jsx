import { useState, useEffect } from 'react'

const categoryStyles = {
  Testing: { card: 'bg-blue-50 border-blue-100', dot: 'bg-blue-400', title: 'text-blue-700', badge: 'text-blue-600' },
  Environment: { card: 'bg-purple-50 border-purple-100', dot: 'bg-purple-400', title: 'text-purple-700', badge: 'text-purple-600' },
  Behavior: { card: 'bg-orange-50 border-orange-100', dot: 'bg-orange-400', title: 'text-orange-700', badge: 'text-orange-600' },
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

const StudentList = ({ selectedClass, onBack }) => {
// stores the accommodation data that comes back from the API
const [studentAccommodations, setStudentAccommodations] = useState([])

// keeps track of which student rows are open so they don't reset on re-render
const [expandedStudents, setExpandedStudents] = useState({})
// fetch the students and their accommodations for the selected class
  useEffect(() => {
    const loadStudentAccommodations = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/reminders?classId=${selectedClass.id}`)
        const data = await res.json()
        setStudentAccommodations(data)
      } catch (error) {
        console.error('Failed to fetch studentAccommodations:', error)
      }
    }
    loadStudentAccommodations()
  }, [selectedClass.id])

// the API returns one row per accommodation so Alex with 2 accommodations shows up twice
// reduce groups them into one entry per student with their accommodations nested inside
const groupedByStudent = studentAccommodations.reduce((acc, item) => {
    if (!acc[item.student_id]) {
        // first time seeing this student, create their entry
        acc[item.student_id] = { name: item.student_name, accommodations: [] }
    }
    // add this accommodation to their list
    acc[item.student_id].accommodations.push(item)
    return acc
}, {})
// flip the open/closed state for whichever student row was clicked
const handleStudentClick = (studentId) => {
    setExpandedStudents(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }))
  }

  const studentCount = Object.keys(groupedByStudent).length

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">

      {/* Back link */}
      <button onClick={() => onBack()} className="text-gray-400 text-sm mb-6 hover:text-gray-600 cursor-pointer flex items-center gap-1">
        ← Back to Classes
      </button>

      {/* Class header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-50 rounded-xl w-10 h-10 flex items-center justify-center text-xl">📚</div>
            <span className="bg-green-100 text-green-700 text-xs font-medium rounded-full px-3 py-1">Class</span>
            <span className="text-gray-400 text-xs">·</span>
            <span className="text-gray-500 text-xs">{selectedClass.description}</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif' }} className="text-4xl text-gray-900 mb-1">{selectedClass.name}</h1>
          <p className="text-gray-400 text-sm">{studentCount} student{studentCount !== 1 ? 's' : ''} with active IEPs</p>
        </div>
      </div>

      {/* Student rows */}
      <div className="flex flex-col gap-4">
        {Object.entries(groupedByStudent).map(([studentId, student]) => (
          <div key={studentId} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

            {/* Student row header */}
            <div
              onClick={() => handleStudentClick(studentId)}
              className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold">
                  {getInitials(student.name)}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{student.name}</p>
                  <p className="text-gray-400 text-xs">IEP updated —</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-3 py-1">
                  {student.accommodations.length} accommodation{student.accommodations.length !== 1 ? 's' : ''}
                </span>
                <span className={`text-gray-400 transition-transform duration-300 ${expandedStudents[studentId] ? 'rotate-180' : ''}`}>▾</span>
              </div>
            </div>

            {/* Expanded accommodations */}
            {expandedStudents[studentId] && (
              <div className="px-6 pb-6 grid grid-cols-2 gap-3">
                {student.accommodations.map((acc, i) => {
                  const style = categoryStyles[acc.category] || { card: 'bg-gray-50 border-gray-100', dot: 'bg-gray-400', title: 'text-gray-700', badge: 'text-gray-500' }
                  return (
                    <div key={i} className={`rounded-xl border p-4 ${style.card}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${style.dot}`}></div>
                          <p className={`text-sm font-medium ${style.title}`}>{acc.title}</p>
                        </div>
                        <span className={`text-xs ${style.badge}`}>{acc.frequency}</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-2">{acc.description}</p>
                      <p className={`text-xs font-medium ${style.badge}`}>{acc.category}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentList