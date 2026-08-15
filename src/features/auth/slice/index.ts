import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	fullName: string;
	email: string;
	role:string;
	phoneNumber:string;
	googleId:boolean;
	isVerified:{
		email:boolean;
		phone:boolean;
	};
}

type initialStateType = {
	user: UserState | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	token: string | null;
};

const initialState: initialStateType = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	token: null
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ user: UserState; token: string }>) => {
			state.user = action.payload.user;
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.isLoading = false;
		},
		clearUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			state.token = null;
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		setLoading: (state) => {
			state.isLoading = true;
		}
	}
});
export default userSlice.reducer;
export const { setUser, clearUser, setLoading, setToken } = userSlice.actions;
