/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../backend/src/utils/Api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto bg-white p-16 rounded-md shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          <p className="mt-4 texxt-gray-600">
            Here you can manage your campaigns, segment audience based on some criteria, and target them.
          </p>

          {/* Dashboard Links */}
          <div className=" gap-6 mt-8">

            {/* Audience Section */}
            <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 transition">
              <h2 className="text-xl font-semibold text-gray-800">Campaign and Audience Management</h2>
              <p className="mt-2 text-gray-600">
                Gain insights into your audience and segment them for targeted campaigns with personalized messages.
              </p>
              <button
                onClick={() => navigate('/audience')}
                className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
              >
                Go to Audience
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
