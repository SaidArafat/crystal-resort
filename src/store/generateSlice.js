// I build this reusable slice to reuse it but after some tries
// I found the urls are not same each controller have different behaviors

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const generateSlice = (name, apiEndpoint) => {
  const fetchItems = createAsyncThunk(
    `${name}/fetchItems`,
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        const { data } = await axios.get(apiEndpoint);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const fetchItem = createAsyncThunk(
    `${name}/fetchItem`,
    async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        const { data } = await axios.get(`${apiEndpoint}/${id}`);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const addItem = createAsyncThunk(
    `${name}/addItem`,
    async (item, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        const { data } = await axios.post(apiEndpoint, item);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const updateItem = createAsyncThunk(
    `${name}/updateItem`,
    async (item, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        const { data } = await axios.put(`${apiEndpoint}/${item.id}`, item);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const deleteItem = createAsyncThunk(
    `${name}/deleteItem`,
    async (item, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        await axios.delete(`${apiEndpoint}/${item.id}`);
        return item;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const initialState = {
    [`${name}s`]: [],
    isLoading: false,
    error: null,
    [`${name}Details`]: null,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchItems.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
          state.isLoading = false;
          state[`${name}s`] = action.payload;
        })
        .addCase(fetchItems.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Use the payload as the error value
        })
        .addCase(fetchItem.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchItem.fulfilled, (state, action) => {
          state.isLoading = false;
          state[`${name}Details`] = action.payload;
        })
        .addCase(fetchItem.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Use the payload as the error value
        })
        .addCase(addItem.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(addItem.fulfilled, (state, action) => {
          state[`${name}s`].push(action.payload);
          state.isLoading = false;
        })
        .addCase(addItem.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Use the payload as the error value
        })
        .addCase(updateItem.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateItem.fulfilled, (state, action) => {
          const updatedItemIndex = state[`${name}s`].findIndex(
            (item) => item.id === action.payload.id
          );
          state[`${name}s`][updatedItemIndex] = action.payload;
          state.isLoading = false;
        })
        .addCase(updateItem.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Use the payload as the error value
        })
        .addCase(deleteItem.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
          state.isLoading = false;
          state[`${name}s`] = state[`${name}s`].filter(
            (item) => item.id !== action.payload.id
          );
        })
        .addCase(deleteItem.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Use the payload as the error value
        });
    },
  });

  const { actions, reducer } = slice;

  return {
    actions: {
      fetchItems,
      fetchItem,
      addItem,
      updateItem,
      deleteItem,
      ...actions,
    },
    reducer,
  };
};

export default generateSlice;
