import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from '../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

interface ProjectForm {
  title: string;
  description: string;
  status: "active" | "completed";
}

// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(100, 'Title is too long'),
  description: yup.string().required('Description is required').max(1000, 'Description is too long'),
  status: yup.string().oneOf(['active', 'completed'], 'Invalid status').required('Status is required'),
});

const EditProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${id}`); // Better: fetch only the project you need
        const project = response.data.project;

        if (project) {
          setValue('title', project.title);
          setValue('description', project.description);
          setValue('status', project.status);
        }
      } catch (error) {
        alert('Failed to load project');
      }
    };

    fetchProject();
  }, [id, setValue]);

  const onSubmit = async (data: ProjectForm) => {
    try {
      await axiosInstance.put(`/projects/${id}`, data);
      navigate('/');
    } catch (error) {
      alert('Project update failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-lg bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Project</h2>

        <div>
          <input {...register('title')} type="text" placeholder="Project Title" className="border p-2 w-full rounded" />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea {...register('description')} placeholder="Description" className="border p-2 w-full rounded" />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <select {...register('status')} className="border p-2 w-full rounded">
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full rounded">
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProjectPage;
