import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

// Yup Schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      dispatch(setUser(response.data));
      navigate('/');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <div>
          <input {...register('name')} type="text" placeholder="Name" className="border p-2 w-full" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register('email')} type="email" placeholder="Email" className="border p-2 w-full" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input {...register('password')} type="password" placeholder="Password" className="border p-2 w-full" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
