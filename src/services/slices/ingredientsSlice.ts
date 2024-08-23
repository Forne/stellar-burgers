import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

interface IngredientsListState {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsListState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: true,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectBuns: (state) => state.buns,
    selectMains: (state) => state.mains,
    selectSauces: (state) => state.sauces,
    selectIngredientsIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchIngredients.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
      state.buns = action.payload.filter((item) => item.type === 'bun');
      state.mains = action.payload.filter((item) => item.type === 'main');
      state.sauces = action.payload.filter((item) => item.type === 'sauce');
    });
  }
});

export const {
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  selectIngredientsIsLoading
} = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
