import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/Order`;

const getToken = () => {
  return localStorage.getItem("token");
};

axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
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

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
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

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (order, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(`${apiEndpoint}/CreateOrder`, order);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (order, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(
        `${apiEndpoint}/Id?id=${order.id}`,
        order
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (order, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/Id?id=${order.id}`);

      return order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  orderDetails: null,
};

const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    // fetch orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch book
    builder.addCase(fetchOrder.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderDetails = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addOrder
    builder.addCase(addOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders.push(action.payload);
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update
    builder.addCase(updateOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      const updatedItemIndex = state.orders.findIndex(
        (item) => item.id === action.payload.id
      );
      state.orders[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete
    builder.addCase(deleteOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = state.orders.filter(
        (item) => item.id !== action.payload.id
      );
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
