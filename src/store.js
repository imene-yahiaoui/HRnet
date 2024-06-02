import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./helpers/features/employeeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, employeeReducer);

export const store = configureStore({
  reducer: {
    employeeInfos: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(thunk),
});
export const persistor = persistStore(store);
