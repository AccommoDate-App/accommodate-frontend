import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ClassList from './components/ClassList'
import StudentList from './components/StudentList'

const App = () => {
  const [selectedClass, setSelectedClass] = useState(null)

  return (
    <div>
      <Navbar />
      {selectedClass ? (
        <StudentList selectedClass={selectedClass} onBack={() => setSelectedClass(null)} />
      ) : (
        <ClassList onSelectClass={setSelectedClass} />
      )}
    </div>
  )
}

export default App