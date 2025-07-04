import { useForm } from 'react-hook-form';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

interface ProjectForm {
  title: string;
  description: string;
  status: string;
}

const CreateProjectPage = () => {
  const { register, handleSubmit } = useForm<ProjectForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ProjectForm) => {
    try {
      await axiosInstance.post('/projects', data);
      navigate('/');
    } catch (error) {
      alert('Project creation failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96">
        <h2 className="text-2xl font-bold mb-4">Create Project</h2>

        <input {...register('title')} type="text" placeholder="Project Title" className="border p-2 w-full" />
        <textarea {...register('description')} placeholder="Description" className="border p-2 w-full" />
        <select {...register('status')} className="border p-2 w-full">
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
