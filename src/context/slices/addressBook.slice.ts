import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserAddressBook } from "../../types/addressBook";

const initialState = null as IUserAddressBook[] | null;

const addressBookSlice = createSlice({
	name: "addressBook",
	initialState,
	reducers: {
		setAddressBook: (_state, action: PayloadAction<IUserAddressBook[]>) => {
			return action.payload;
		},
		removeAddressBook: () => {
			return initialState;
		}
	}
});

export const { setAddressBook, removeAddressBook } = addressBookSlice.actions;
export default addressBookSlice.reducer;
