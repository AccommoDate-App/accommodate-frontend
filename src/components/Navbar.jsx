function Navbar() {
    return (
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-3">
        <div className="bg-green-500 rounded-xl w-9 h-9 flex items-center justify-center">
          <span style={{ fontFamily: 'DM Serif Display, serif' }} className="text-white text-lg">A</span>
        </div>
        <span className="text-gray-900 text-xl font-semibold tracking-tight">AccommoDate</span>
      </nav>
    )
  }
  
  export default Navbar