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
};

const initialState: initialStateType = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		clearUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
		setLoading: (state) => {
			state.isLoading = true;
		}
	}
});
export default userSlice.reducer;
export const { setUser, clearUser, setLoading } = userSlice.actions;
