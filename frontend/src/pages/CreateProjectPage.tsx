import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { showSuccessToast, showErrorToast } from "../utils/toast";

interface ProjectForm {
  title: string;
  description: string;
  status: string;
}

const CreateProjectPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ProjectForm) => {
    try {
      await axiosInstance.post("/projects", data);
      showSuccessToast("Project created successfully!");
      navigate("/");
    } catch (error) {
      showErrorToast("Project creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <PlusCircle className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-white">Create Project</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter project title"
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.title ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter project description"
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
