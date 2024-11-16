import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) // For error messages
  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()
    setErrorMessage(null) // Cleanup error message

    try {
      const response = await fetch('https://crm-app-backend-cjvk.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token) // Save token to localStorage
        console.log("data from response: ", data);
       
        navigate('/dashboard') // Navigate to dashboard
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Login failed !!')
      }
    } catch (error) {
        setErrorMessage('Error while logging in, please try again later !!')
      console.log('Error logging in !! ', error)
    }
  }

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await fetch('https://crm-app-backend-cjvk.onrender.com/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential })
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.token) // Save token to localStorage
        console.log('Google login successful: ', data)

        navigate('/dashboard')
      } else {
        const errorData = await res.json()
        setErrorMessage(errorData.message || 'Google login failed !!')
      }
    } catch (error) {
      setErrorMessage('Error during Google login, please try again later !!')
      console.log('Error during Google login !! ', error)
    }
  }

  const handleGoogleLoginFailure = (error) => {
    setErrorMessage('Google login failed, please try again !!')
    console.log('Google login error: ', error)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        <form onSubmit={handleLogin}>
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
            Log In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-indigo-500 hover:underline">
            Sign Up
          </button>
        </p>

        {/* Google Login Button */}
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
