import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import axiosInstance from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useEffect } from "react";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      dispatch(setUser(response.data));
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-1">
            Get started with your task management
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("name")}
                id="name"
                type="text"
                placeholder="John Doe"
                className={`block w-full pl-10 pr-3 py-2 bg-gray-700 border ${
                  errors.name ? "border-red-500" : "border-gray-600"
                } rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="your@email.com"
                className={`block w-full pl-10 pr-3 py-2 bg-gray-700 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="••••••••"
                className={`block w-full pl-10 pr-3 py-2 bg-gray-700 border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
