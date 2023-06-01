import { configureStore } from "@reduxjs/toolkit";
import ownerSlice from "./slices/ownerSlice";

const store = configureStore({
  reducer: {
    owners: ownerSlice,
  },
});

export default store;
