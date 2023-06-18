import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

const apiEndpoint = `https://localhost:44315/api/Employee`;

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`${apiEndpoint}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors.Id[0]);
    }
  }
);

// https://localhost:44315/api/Employee/id?id=12314423

export const fetchEmployee = createAsyncThunk(
  "employees/fetchEmployee",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`${apiEndpoint}/id?id=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (owner, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(`${apiEndpoint}/CreateOwner`, owner);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (owner, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(
        `${apiEndpoint}/id?id=${owner.id}`,
        owner
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (owner, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/SSN?SSN=${owner.id}`);
      return owner;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  employees: [],
  isLoading: false,
  error: null,
  employeeDetails: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch employees
    builder.addCase(fetchEmployees.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch owner
    builder.addCase(fetchEmployee.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.employeeDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // add owner
    builder.addCase(addEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update owner
    builder.addCase(updateEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      const updatedItemIndex = state.employees.findIndex(
        (item) => item.id === action.payload.id
      );
      state.employees[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete car
    builder.addCase(deleteEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.employees = state.employees.filter(
        (owner) => owner.id !== action.payload.id
      );
      state.isLoading = false;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const {} = employeeSlice.actions;

export default employeeSlice.reducer;
