import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/room`;

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

export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get(`${apiEndpoint}/GetRooms`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRoom = createAsyncThunk(
  "room/fetchRoom",
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

export const addRoom = createAsyncThunk(
  "room/addRoom",
  async (room, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(`${apiEndpoint}/CreateRoom`, room);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// https://localhost:44315/api/Service/Id?Id=1

export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async (room, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(
        `${apiEndpoint}/${room.get("id")}`,
        room
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (room, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/${room.id}`);

      return room;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  rooms: [],
  isLoading: false,
  error: null,
  roomDetails: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    resetRoom: (state) => {
      state.roomDetails = null;
    },
  },

  extraReducers: (builder) => {
    // fetch rooms
    builder.addCase(fetchRooms.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.rooms = action.payload;
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch room
    builder.addCase(fetchRoom.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomDetails = action.payload;
    });
    builder.addCase(fetchRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addRoom
    builder.addCase(addRoom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.rooms.push(action.payload);
    });
    builder.addCase(addRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update
    builder.addCase(updateRoom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateRoom.fulfilled, (state, action) => {
      const updatedItemIndex = state.rooms.findIndex(
        (item) => item.id === action.payload.id
      );
      state.rooms[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete
    builder.addCase(deleteRoom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.rooms = state.rooms.filter((item) => item.id !== action.payload.id);
    });
    builder.addCase(deleteRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetRoom } = roomSlice.actions;

export default roomSlice.reducer;
