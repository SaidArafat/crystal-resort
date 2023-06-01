import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/Guest`;

export const fetchGuests = createAsyncThunk(
  "guest/fetchGuests",
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

export const fetchGuest = createAsyncThunk(
  "guest/fetchGuest",
  async (ssn, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`${apiEndpoint}/SSN?SSN=${ssn}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addGuest = createAsyncThunk(
  "guest/addGuest",
  async (guest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(`${apiEndpoint}`, guest);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGuest = createAsyncThunk(
  "guest/updateGuest",
  async (guest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(
        `${apiEndpoint}/ssn?ssn=${guest.ssn}`,
        guest
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGuest = createAsyncThunk(
  "guests/deleteGuest",
  async (guest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/SSN?SSN=${guest.ssn}`);
      return guest;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  guests: [],
  isLoading: false,
  error: null,
  guestDetails: null,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    resetGuestDetails: (state) => {
      state.guestDetails = null;
    },
  },
  extraReducers: (builder) => {
    // fetch guests
    builder.addCase(fetchGuests.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGuests.fulfilled, (state, action) => {
      state.guests = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchGuests.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch guest
    builder.addCase(fetchGuest.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGuest.fulfilled, (state, action) => {
      state.guestDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchGuest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // add guest
    builder.addCase(addGuest.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addGuest.fulfilled, (state, action) => {
      state.guests.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addGuest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update guest
    builder.addCase(updateGuest.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateGuest.fulfilled, (state, action) => {
      const updatedItemIndex = state.guests.findIndex(
        (item) => item.ssn === action.payload.ssn
      );
      state.guests[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateGuest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete guest
    builder.addCase(deleteGuest.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteGuest.fulfilled, (state, action) => {
      state.guests = state.guests.filter(
        (item) => item.ssn !== action.payload.ssn
      );
      state.isLoading = false;
    });
    builder.addCase(deleteGuest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetGuestDetails } = guestSlice.actions;

export default guestSlice.reducer;
