import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

interface TaskForm {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
}

// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(100, 'Title is too long'),
  description: yup.string().required('Description is required').max(1000, 'Description is too long'),
  status: yup.string().oneOf(['todo', 'in-progress', 'done'], 'Invalid status').required('Status is required'),
  dueDate: yup.string().required('Due date is required'),
});

const AddTaskPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TaskForm) => {
    try {
      await axiosInstance.post('/tasks', { ...data, projectId });
      navigate(`/tasks/${projectId}`);
    } catch (error) {
      alert('Task creation failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-lg bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Task</h2>

        <div>
          <input {...register('title')} type="text" placeholder="Task Title" className="border p-2 w-full rounded" />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea {...register('description')} placeholder="Description" className="border p-2 w-full rounded" />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <select {...register('status')} className="border p-2 w-full rounded">
            <option value="">Select Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        <div>
          <input {...register('dueDate')} type="date" className="border p-2 w-full rounded" />
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;
