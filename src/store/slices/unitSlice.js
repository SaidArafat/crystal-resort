import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/Units`;

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

export const fetchUnits = createAsyncThunk(
  "unit/fetchUnits",
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

export const fetchUnit = createAsyncThunk(
  "unit/fetchUnit",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`${apiEndpoint}/Id?Id=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUnit = createAsyncThunk(
  "unit/addUnit",
  async (unit, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(`${apiEndpoint}`, unit);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUnit = createAsyncThunk(
  "unit/updateUnit",
  async (unit, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(`${apiEndpoint}/Id?id=${unit.id}`, unit);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUnit = createAsyncThunk(
  "unit/deleteUnit",
  async (unit, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/Id?id=${unit.id}`);

      return unit;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  units: [],
  isLoading: false,
  error: null,
  unitDetails: null,
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    resetUnit: (state) => {
      state.unitDetails = null;
    },
  },
  extraReducers: (builder) => {
    // fetch units
    builder.addCase(fetchUnits.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUnits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.units = action.payload;
    });
    builder.addCase(fetchUnits.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch book
    builder.addCase(fetchUnit.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUnit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.unitDetails = action.payload;
    });
    builder.addCase(fetchUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addUnit
    builder.addCase(addUnit.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addUnit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.units.push(action.payload);
    });
    builder.addCase(addUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update
    builder.addCase(updateUnit.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUnit.fulfilled, (state, action) => {
      const updatedItemIndex = state.units.findIndex(
        (item) => item.id === action.payload.id
      );
      state.units[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete
    builder.addCase(deleteUnit.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUnit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.units = state.units.filter((item) => item.id !== action.payload.id);
    });
    builder.addCase(deleteUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetUnit } = unitSlice.actions;

export default unitSlice.reducer;
