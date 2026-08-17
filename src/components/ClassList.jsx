import { useState, useEffect } from 'react'

const ClassList = ({ onSelectClass }) => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/classes')
        const data = await res.json()
        setClasses(data)
      } catch (error) {
        console.error('Failed to fetch classes:', error)
      }
    }
    fetchClasses()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">

      {/* Page header */}
      <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-1">Spring 2025</p>
      <div className="flex items-center justify-between mb-1">
        <h1 style={{ fontFamily: 'DM Serif Display, serif' }} className="text-4xl text-gray-900">My Classes</h1>
      </div>
      <p className="text-gray-400 text-sm mb-8">Select a class to view student accommodations</p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-3xl font-semibold text-gray-900">{classes.length}</p>
          <p className="text-gray-400 text-sm mt-1">Classes</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-3xl font-semibold text-gray-900">—</p>
          <p className="text-gray-400 text-sm mt-1">IEP Students</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-3xl font-semibold text-gray-900">—</p>
          <p className="text-gray-400 text-sm mt-1">Accommodations</p>
        </div>
      </div>

      {/* Class cards */}
      <div className="grid grid-cols-2 gap-4">
        {classes.map(cls => (
          <div
            key={cls.id}
            onClick={() => onSelectClass(cls)}
            className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-50 rounded-xl w-10 h-10 flex items-center justify-center text-xl">
                📚
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-medium rounded-full px-3 py-1">
                Class
              </span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif' }} className="text-gray-900 text-xl mb-1">{cls.name}</h2>
            <p className="text-gray-400 text-sm mb-4">{cls.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-medium">
                  S
                </div>
              </div>
              <span className="text-gray-400 text-xs">View class →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassList