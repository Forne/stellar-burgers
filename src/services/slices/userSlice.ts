import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  orders: TOrder[] | null;
  isAuthChecking: boolean;
  error: SerializedError | null;
  isProfileUpdateLoading: boolean;
  isOrdersLoading: boolean;
}

const initialState: UserState = {
  user: null,
  orders: null,
  isAuthChecking: true,
  error: null,
  isProfileUpdateLoading: false,
  isOrdersLoading: true
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

export const getUser = createAsyncThunk(
  'user/profile/get',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/profile/update',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const getUserOrders = createAsyncThunk(
  'user/orders/get',
  async () => await getOrdersApi()
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    selectUserState: (state) => state,
    selectUserData: (state) => state.user,
    selectUserOrders: (state) => state.orders,
    selectUserIsAuthChecking: (state) => state.isAuthChecking,
    selectUserAuthError: (state) => state.error,
    selectUserProfileUpdateIsLoading: (state) => state.isProfileUpdateLoading
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecking = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error;
        state.isAuthChecking = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.isAuthChecking = false;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecking = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error;
        state.isAuthChecking = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.isAuthChecking = false;
      });

    // Logout TODO
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.error = null;
      state.user = null;
      state.isAuthChecking = false;
    });

    // Get user
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecking = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error;
        state.isAuthChecking = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuthChecking = false;
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.isProfileUpdateLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error;
        state.isProfileUpdateLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isProfileUpdateLoading = false;
      });

    // User orders
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isProfileUpdateLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error;
        state.isProfileUpdateLoading = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isProfileUpdateLoading = false;
      });
  }
});

export const {
  selectUserState,
  selectUserData,
  selectUserOrders,
  selectUserIsAuthChecking,
  selectUserProfileUpdateIsLoading,
  selectUserAuthError
} = usersSlice.selectors;

export const usersReducer = usersSlice.reducer;
