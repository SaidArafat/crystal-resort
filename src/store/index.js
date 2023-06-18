import { configureStore } from "@reduxjs/toolkit";
import ownerSlice from "./slices/ownerSlice";
import guestSlice from "./slices/guestSlice";
import carSlice from "./slices/carSlice";
import serviceSlice from "./slices/serviceSlice";
import authSlice from "./slices/authSlice";
import roomSlice from "./slices/roomSlice";
import bookSlice from "./slices/bookSlice";
import orderSlice from "./slices/orderSlice";
import unitSlice from "./slices/unitSlice";
import employeeSlice from "./slices/employeeSlice";

const store = configureStore({
  reducer: {
    owners: ownerSlice,
    guests: guestSlice,
    cars: carSlice,
    services: serviceSlice,
    auth: authSlice,
    rooms: roomSlice,
    books: bookSlice,
    orders: orderSlice,
    units: unitSlice,
    employees: employeeSlice,
  },
});

export default store;
