import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import axiosInstance from "../api/axiosConfig";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>Project Manager</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
