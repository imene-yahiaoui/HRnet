import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./helpers/features/employeeSlice.ts";

export const store = configureStore({
  reducer: {
    employeeInfos: employeeSlice,
  },
  devTools: true,
});
