import { useNavigate } from 'react-router-dom';

const CoverPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-900 text-white py-20 md:py-48 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
          Elevate Your Customer Experience with us :)
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mb-10">
          Empower your business with our CRM & Campaign Management tools to build lasting customer relationships and drive growth.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white font-semibold text-lg rounded-md hover:bg-indigo-700 transition duration-300 max-w-full"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default CoverPage;
