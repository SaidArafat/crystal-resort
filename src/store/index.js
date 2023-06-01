import { configureStore } from "@reduxjs/toolkit";
import ownerSlice from "./slices/ownerSlice";
import guestSlice from "./slices/guestSlice";
import carSlice from "./slices/carSlice";

const store = configureStore({
  reducer: {
    owners: ownerSlice,
    guests: guestSlice,
    cars: carSlice,
  },
});

export default store;
