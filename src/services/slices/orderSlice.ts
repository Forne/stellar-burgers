import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

interface OrderState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: OrderState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const placeOrder = createAsyncThunk(
  'order/place',
  async (data: string[]) => await orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = { ...action.payload, id: nanoid() };
      } else {
        state.ingredients.push({ ...action.payload, id: nanoid() });
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; up: boolean }>
    ) => {
      const i = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const current = state.ingredients[i];
      if (action.payload.up) {
        state.ingredients[i] = state.ingredients[i - 1];
        state.ingredients[i - 1] = current;
      } else {
        state.ingredients[i] = state.ingredients[i + 1];
        state.ingredients[i + 1] = current;
      }
    },
    resetOrder: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderState: (state) => state,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state, action) => {
        state.orderRequest = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { selectOrderState, selectOrderRequest, selectOrderModalData } =
  orderSlice.selectors;

export const { addIngredient, removeIngredient, moveIngredient, resetOrder } =
  orderSlice.actions;

export const orderReducer = orderSlice.reducer;
