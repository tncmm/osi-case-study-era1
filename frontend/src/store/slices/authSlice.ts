import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/api';
import { User, LoginCredentials, RegisterCredentials } from '../../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const getStoredUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('token', response.token);
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterCredentials) => {
    const response = await authService.register(userData);
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('token', response.token);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    restoreUser: (state) => {
      state.user = getStoredUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { logout, clearError, restoreUser } = authSlice.actions;
export default authSlice.reducer; 