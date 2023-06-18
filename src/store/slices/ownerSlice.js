import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/Owner`;

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

export const fetchOwners = createAsyncThunk(
  "owners/fetchOwners",
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

export const fetchOwner = createAsyncThunk(
  "owners/fetchOwner",
  async (ssn, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`${apiEndpoint}/${ssn}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOwner = createAsyncThunk(
  "owners/addOwner",
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

export const updateOwner = createAsyncThunk(
  "owners/updateOwner",
  async (owner, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(
        `${apiEndpoint}/ssn?ssn=${owner.ssn}`,
        owner
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOwner = createAsyncThunk(
  "owners/deleteOwner",
  async (owner, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/SSN?SSN=${owner.ssn}`);
      return owner;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  owners: [],
  isLoading: false,
  error: null,
  ownerDetails: null,
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    resetOwnerDetails: (state) => {
      state.ownerDetails = null;
    },
  },
  extraReducers: (builder) => {
    // fetch owners
    builder.addCase(fetchOwners.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOwners.fulfilled, (state, action) => {
      state.owners = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOwners.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch owner
    builder.addCase(fetchOwner.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOwner.fulfilled, (state, action) => {
      state.ownerDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOwner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // add owner
    builder.addCase(addOwner.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addOwner.fulfilled, (state, action) => {
      state.owners.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addOwner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update owner
    builder.addCase(updateOwner.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateOwner.fulfilled, (state, action) => {
      const updatedItemIndex = state.owners.findIndex(
        (item) => item.ssn === action.payload.ssn
      );
      state.owners[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateOwner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete car
    builder.addCase(deleteOwner.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteOwner.fulfilled, (state, action) => {
      state.owners = state.owners.filter(
        (owner) => owner.ssn !== action.payload.ssn
      );
      state.isLoading = false;
    });
    builder.addCase(deleteOwner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetOwnerDetails } = ownerSlice.actions;

export default ownerSlice.reducer;
