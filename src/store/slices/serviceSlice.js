import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/Service`;

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

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
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

export const fetchService = createAsyncThunk(
  "services/fetchService",
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

export const addService = createAsyncThunk(
  "services/addService",
  async (service, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(apiEndpoint, service);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// https://localhost:44315/api/Service/Id?Id=1

export const updateService = createAsyncThunk(
  "services/updateService",
  async (service, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(
        `${apiEndpoint}/Id?Id=${service.id}`,
        service
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (service, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/Id?Id=${service.id}`);

      return service;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  services: [],
  isLoading: false,
  error: null,
  serviceDetails: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    resetService: (state) => {
      state.serviceDetails = null;
    },
  },

  extraReducers: (builder) => {
    // fetch Services
    builder.addCase(fetchServices.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.services = action.payload;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch service
    builder.addCase(fetchService.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.carDetails = action.payload;
    });
    builder.addCase(fetchService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addService
    builder.addCase(addService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.services.push(action.payload);
    });
    builder.addCase(addService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update
    builder.addCase(updateService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      const updatedItemIndex = state.services.findIndex(
        (item) => item.id === action.payload.id
      );
      state.services[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete
    builder.addCase(deleteService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.services = state.services.filter(
        (item) => item.id !== action.payload.id
      );
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetService } = serviceSlice.actions;

export default serviceSlice.reducer;
