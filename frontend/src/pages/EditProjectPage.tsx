import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { Edit } from "lucide-react";

interface ProjectForm {
  title: string;
  description: string;
  status: "active" | "completed";
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title is too long"),
  description: yup
    .string()
    .required("Description is required")
    .max(1000, "Description is too long"),
  status: yup
    .string()
    .oneOf(["active", "completed"], "Invalid status")
    .required("Status is required"),
});

const EditProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${id}`);
        const project = response.data.project;
        if (project) {
          setValue("title", project.title);
          setValue("description", project.description);
          setValue("status", project.status);
        }
      } catch (error) {
        showErrorToast("Failed to load project");
      }
    };

    fetchProject();
  }, [id, setValue]);

  const onSubmit = async (data: ProjectForm) => {
    try {
      await axiosInstance.put(`/projects/${id}`, data);
      showSuccessToast("Project updated successfully!");
      navigate("/");
    } catch (error) {
      showErrorToast("Project update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <Edit className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-white">Edit Project</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Title
            </label>
            <input
              {...register("title")}
              type="text"
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
              rows={4}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.description ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.status ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-400">
                {errors.status.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;
