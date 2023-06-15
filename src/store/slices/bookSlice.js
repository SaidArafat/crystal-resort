import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://localhost:44315/api/book`;

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

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get(`${apiEndpoint}/GetBooks`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
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

export const addBook = createAsyncThunk(
  "book/addBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(`${apiEndpoint}/createBook`, book);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(`${apiEndpoint}/${book.id}`, book);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${apiEndpoint}/${book.id}`);

      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  books: [],
  isLoading: false,
  error: null,
  bookDetails: null,
};
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetBook: (state) => {
      state.bookDetails = null;
    },
  },

  extraReducers: (builder) => {
    // fetch books
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetch book
    builder.addCase(fetchBook.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookDetails = action.payload;
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addBook
    builder.addCase(addBook.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update
    builder.addCase(updateBook.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const updatedItemIndex = state.books.findIndex(
        (item) => item.id === action.payload.id
      );
      state.books[updatedItemIndex] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete
    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((item) => item.id !== action.payload.id);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetBook } = bookSlice.actions;

export default bookSlice.reducer;
