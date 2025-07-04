import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { Edit } from "lucide-react";

interface TaskForm {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
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
    .oneOf(["todo", "in-progress", "done"], "Invalid status")
    .required("Status is required"),
  dueDate: yup.string().required("Due date is required"),
});

const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaskForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${id}`);
        const task = response.data.task;
        if (task) {
          setValue("title", task.title);
          setValue("description", task.description);
          setValue("status", task.status);
          setValue("dueDate", task.dueDate?.split("T")[0]);
        }
      } catch (error) {
        showErrorToast("Failed to load task");
      }
    };

    fetchTask();
  }, [id, setValue]);

  const onSubmit = async (data: TaskForm) => {
    try {
      await axiosInstance.put(`/tasks/${id}`, data);
      showSuccessToast("Task updated successfully!");
      navigate(-1);
    } catch (error) {
      showErrorToast("Task update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <Edit className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-white">Edit Task</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Task Title
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
              rows={3}
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
              <option value="">Select Status</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-400">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Due Date
            </label>
            <input
              {...register("dueDate")}
              type="date"
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.dueDate ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-400">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPage;
