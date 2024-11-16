import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-white">Mini CRM</div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-gray-300 hover:text-white">
              Dashboard
            </Link>
            <Link to="/audience" className="text-gray-300 hover:text-white">
              Audience Management
            </Link>
          </nav>

          <div className="relative hidden md:flex">
            <button
              className="text-gray-300 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Responsive Layout */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Layout */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <nav className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/audience"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Audience Management
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleLogout()
              }}
              className="block w-full text-left text-gray-300 hover:text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
