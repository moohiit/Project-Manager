import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
          {/* Subtle accent bar at top */}
          <div className="h-1 bg-blue-600" />

          {/* Main content area */}
          <div className="p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white">Project Management</h2>
            </div>

            {/* Form content from Outlet */}
            <Outlet />
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-800 border-t border-gray-700 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Task Manager. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
