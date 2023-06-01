import { configureStore } from "@reduxjs/toolkit";
import ownerSlice from "./slices/ownerSlice";
import guestSlice from "./slices/guestSlice";

const store = configureStore({
  reducer: {
    owners: ownerSlice,
    guests: guestSlice,
  },
});

export default store;
