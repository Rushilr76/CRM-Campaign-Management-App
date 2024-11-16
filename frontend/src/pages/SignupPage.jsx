import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) // For error messages
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    
    e.preventDefault()
    setErrorMessage(null) // Cleanup error message

    try {
      const response = await fetch(`http://localhost:8000/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password }),
      })

      if (response.ok) {
        navigate('/login') // Redirect to login page after successful signup
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Signup failed !!')
      }
    } catch (error) {
      setErrorMessage('Error while signing up, please try again later !!')
      console.log('Error signing up !! ', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3 -translate-y-0.5">
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSignup}>
          {/* Username/Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-indigo-500 hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
