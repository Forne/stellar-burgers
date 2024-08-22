import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password }).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) =>
    await loginUserApi({ email, password }).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () =>
    await logoutApi().then((data) => {
      deleteCookie('accessToken');
      return data;
    })
);

// export const forgotPasswordUser = createAsyncThunk(
//   'auth/password-reset',
//   async ({ email }: { email: string }) => await forgotPasswordApi({ email })
// );
//
// export const resetPasswordUser = createAsyncThunk(
//   'auth/password-reset/reset',
//   async ({ password, token }: { password: string; token: string }) =>
//     await resetPasswordApi({ password, token })
// );

export const getUser = createAsyncThunk(
  'user/get',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    selectAuth: (state) => state
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });

    // Logout TODO
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    });

    // Get user
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      });
  }
});

export const { selectAuth } = usersSlice.selectors;

export const usersReducer = usersSlice.reducer;
