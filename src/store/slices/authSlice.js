import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/authentication/`;

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

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.post(`${apiEndpoint}Login`, user);

    return data.result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    localStorage.setItem("email", JSON.stringify(user.email));
    try {
      const { data } = await axios.post(`${apiEndpoint}RegisterUser`, user);

      return data.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  role: null,
  token: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

if (localStorage.getItem("isLoggedIn")) {
  initialState.isLoggedIn = true;
  initialState.token = localStorage.getItem("token");
  initialState.user = JSON.parse(localStorage.getItem("user"));
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.role = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("role", JSON.stringify(state.role));
      localStorage.setItem("isLoggedIn", true);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
