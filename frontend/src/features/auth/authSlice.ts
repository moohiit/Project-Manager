import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'


interface AuthState {
  user: any;
  token: string | null;
}

const token = localStorage.getItem('token')
let user = null

if (token) {
  try {
    const decoded = jwtDecode(token)
    console.log("user:", decoded);
    const isExpired = typeof decoded.exp === 'number' ? decoded.exp * 1000 < Date.now() : true
    if (!isExpired) user = decoded
    else localStorage.removeItem('token')
  } catch (e) {
    localStorage.removeItem('token')
  }
}
const initialState: AuthState = {
  user: user,
  token: token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      const token = action.payload.token;
      const user = action.payload.user;
      localStorage.setItem("token", token);
      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
