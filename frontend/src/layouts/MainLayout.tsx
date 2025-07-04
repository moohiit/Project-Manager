import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import axiosInstance from "../api/axiosConfig";
import {
  LayoutDashboard,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="text-blue-500" size={24} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
              Project Manager Pro
            </h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
            >
              {user?.name}
              <ChevronDown size={18} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    navigate("/");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-blue-400 hover:text-blue-300"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 z-10"
      >
        <ArrowLeft />
      </button>

      {/* Forward Button */}
      <button
        onClick={() => navigate(1)}
        className="fixed top-20 right-4 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 z-10"
      >
        <ArrowRight />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 p-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Project Manager Pro. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
