import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gray-800 rounded-xl p-8 max-w-md border border-gray-700">
        <div className="flex justify-center mb-4">
          <AlertCircle className="text-red-500" size={48} />
        </div>
        <h1 className="text-4xl font-bold text-red-500 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
