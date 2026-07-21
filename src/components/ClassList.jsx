import { useState, useEffect } from 'react';

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
    <div className="max-w-4xl mx-auto px-8 py-10">
      <h1 className="text-gray-900 text-3xl mb-2">My Classes</h1>
      <p className="text-gray-400 mb-8">Select a class to view student accommodations</p>
      <div className="grid grid-cols-3 gap-4">
        {classes.map(cls => (
          <div
            key={cls.id}
            onClick={() => onSelectClass(cls)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="bg-green-100 text-green-700 text-xs font-medium rounded-full px-3 py-1 inline-block mb-3">
              Class
            </div>
            <h2 className="text-gray-900 text-lg mb-1">{cls.name}</h2>
            <p className="text-gray-400 text-sm">{cls.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassList;