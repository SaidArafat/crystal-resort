import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/Car`;

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

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`${apiEndpoint}/GetCars`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors.Id[0]);
    }
  }
);

export const fetchCar = createAsyncThunk(
  "cars/fetchCar",
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

export const addCar = createAsyncThunk("cars/addCar", async (car, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.post(`${apiEndpoint}/CreateCar`, car);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async (car, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(`${apiEndpoint}/${car.id}`, car);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (car, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/${car.id}`);

      return car;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Hodhod01006686746#_<>

const initialState = {
  cars: [],
  isLoading: false,
  error: null,
  carDetails: null,
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    resetCarDetails: (state) => {
      state.carDetails = null;
    },
  },

  extraReducers: (builder) => {
    // fetch cars
    builder.addCase(fetchCars.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cars = action.payload;
    });
    builder.addCase(fetchCars.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch car
    builder.addCase(fetchCar.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.carDetails = action.payload;
    });
    builder.addCase(fetchCar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addCar
    builder.addCase(addCar.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addCar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cars.push(action.payload);
    });
    builder.addCase(addCar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update car
    builder.addCase(updateCar.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateCar.fulfilled, (state, action) => {
      const updatedItemIndex = state.cars.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cars[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateCar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete car
    builder.addCase(deleteCar.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cars = state.cars.filter((car) => car.id !== action.payload.id);
    });
    builder.addCase(deleteCar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetCarDetails } = carSlice.actions;

export default carSlice.reducer;
