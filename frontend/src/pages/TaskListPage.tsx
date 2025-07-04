import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const TaskListPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(
        `/tasks/project/${projectId}${statusFilter ? `?status=${statusFilter}` : ''}`
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks');
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      alert('Task deletion failed');
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [statusFilter]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => navigate(`/add-task/${projectId}`)}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Task
        </button>
      </div>

      <div className="mb-4 flex space-x-4">
        <label htmlFor="statusFilter" className="sr-only">
          Filter tasks by status
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 && <p>No tasks found.</p>}
        {tasks.map((task) => (
          <div key={task._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500 mb-2">Status: {task.status}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/edit-task/${task._id}`)}
                className="bg-yellow-500 text-white px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
