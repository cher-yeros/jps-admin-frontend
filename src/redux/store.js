import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "./slices/authSlice";
import systemSlice from "./slices/systemSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  system: systemSlice,
  // user: userSlice,
  // map: mapSlice,
  // event: eventSlice,
  // schedule: scheduleSlice,
  // productionSchedule: productionScheduleSlice,
  // notification: notificationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
