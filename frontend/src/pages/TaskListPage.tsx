import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { showSuccessToast, showErrorToast } from "../utils/toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const TaskListPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/tasks/project/${projectId}${
          statusFilter ? `?status=${statusFilter}` : ""
        }`
      );
      setTasks(response.data.tasks);
    } catch (error) {
      showErrorToast("Error fetching tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      showSuccessToast("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      showErrorToast("Task deletion failed");
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-600 text-gray-200";
      case "in-progress":
        return "bg-blue-600 text-blue-100";
      case "done":
        return "bg-green-600 text-green-100";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <button
            onClick={() => navigate(`/add-task/${projectId}`)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle size={18} />
            Add Task
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tasks</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
            <p className="text-gray-400">
              No tasks found. Create your first task!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-white line-clamp-1">
                    {task.title}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-4 line-clamp-3">
                  {task.description}
                </p>

                {task.dueDate && (
                  <p className="text-sm text-gray-500 mb-4">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit-task/${task._id}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;
