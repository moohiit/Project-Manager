import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginForm {
  email: string;
  password: string;
}
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage = () => {
  const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm<LoginForm>({
  resolver: yupResolver(loginSchema)
});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const userData = await loginUser(data);
      dispatch(setUser(userData));
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email')} type="email" placeholder="Email" className="border p-2" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        <input {...register('password')} type="password" placeholder="Password" className="border p-2" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
