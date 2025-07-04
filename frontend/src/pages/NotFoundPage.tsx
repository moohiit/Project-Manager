import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFoundPage;
