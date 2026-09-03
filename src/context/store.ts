/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/auth/slice/index";
import productsSlice from "../context/slices/products.slice";
import cartSlice from "../context/slices/cart.slice";
import addressBookSlice from "./slices/addressBook.slice";
import homepageSlice from "./slices/homepage.slice";

const safeStorage = (storage as any).default || storage;

const userConfig = {
	key: "user",
	storage: safeStorage
};

const userReducer = persistReducer<ReturnType<typeof userSlice>>(userConfig, userSlice);


const store = configureStore({
	reducer: {
		auth: userReducer,
		products: productsSlice,
		cart: cartSlice,
		addressBook: addressBookSlice,
		homepage: homepageSlice
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
