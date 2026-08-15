/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/auth/slice/index";
const safeStorage = (storage as any).default || storage;

const userConfig = {
	key: "user",
	storage: safeStorage
};

const userReducer = persistReducer(userConfig, userSlice);


const store = configureStore({
	reducer: {
		auth: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
