import axiosInstance from './axiosConfig';

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get('/auth/profile'); // You need to create this endpoint to verify token
  return response.data;
};
