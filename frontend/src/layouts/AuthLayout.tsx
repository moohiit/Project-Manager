import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
