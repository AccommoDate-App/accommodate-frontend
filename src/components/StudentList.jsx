import { useState, useEffect } from 'react';

const categoryColors = {
    Testing: 'bg-blue-100 text-blue-700',
    Environment: 'bg-purple-100 text-purple-700',
    Behavior: 'bg-orange-100 text-orange-700',
}

const StudentList = ({ selectedClass, onBack }) => {
    // stores the accommodation data that comes back from the API
    const [studentAccommodations, setStudentAccommodations] = useState([])
    //teachers need to see which students are open without re-rendering
    const [expandedStudents, setExpandedStudents] = useState({})

    // fetch the students and their accommodations for the selected class
    useEffect(() => {
        const loadStudentAccommodations = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/reminders?classId=${selectedClass.id}`);
                const data = await res.json();
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



    return (
        <div className="max-w-4xl mx-auto px-8 py-10">
            <button onClick={() => onBack()} className="text-green-600 text-sm mb-6 hover:underline cursor-pointer">Back to Classes</button>
            <h2 className="text-gray-900 text-3xl mb-2">{selectedClass.name}</h2>
            <p className="text-gray-400 mb-8">{selectedClass.description}</p>

            <div className="flex flex-col gap-3">
                {Object.entries(groupedByStudent).map(([studentId, student]) => (
                    <div key={studentId} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div onClick={() => handleStudentClick(studentId)} className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 text-green-700 rounded-full w-9 h-9 flex items-center justify-center font-semibold text-sm">
                                    {student.name.charAt(0)}
                                </div>
                                <span className="text-gray-900 font-medium">{student.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 text-sm">{student.accommodations.length} accommodations</span>
                                <span className={`transition-transform duration-300 ${expandedStudents[studentId] ? 'rotate-180' : ''}`}>▾</span>
                            </div>
                        </div>

                        {expandedStudents[studentId] && (
                            <div className="border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
                                {student.accommodations.map((acc, i) => (
                                    <div key={i} className="flex items-start justify-between">
                                        <div>
                                            <p className="text-gray-900 font-medium text-sm">{acc.title}</p>
                                            <p className="text-gray-400 text-sm">{acc.description}</p>
                                        </div>
                                        <span className={`text-xs font-medium rounded-full px-3 py-1 ${categoryColors[acc.category] || 'bg-gray-100 text-gray-600'}`}>
                                            {acc.category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentList