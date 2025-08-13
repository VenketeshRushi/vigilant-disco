import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/axios/instance";
import Cookies from "js-cookie";
import { getAuthCookies, removeAuthCookies } from "@/utils/ext";

// Cookie options (toggle for prod/local)
const cookieOptions =
	import.meta.env.NODE_ENV === "production"
		? { secure: true, sameSite: "Strict" }
		: { secure: false }; // local dev

const initialState = {
	id: "",
	token: getAuthCookies().token || "",
	refreshToken: getAuthCookies().refreshToken || "",
	role: getAuthCookies().role || "",
	name: "",
	email: "",
	profilePic: "",
	loading: false,
	error: "",
};

// LOGIN
export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post("/auth/login", { email, password });
			const { token, refreshToken, user } = res.data;

			// Store tokens in cookies
			Cookies.set("token", token, cookieOptions);
			Cookies.set("refreshToken", refreshToken, cookieOptions);
			Cookies.set("role", user.role, cookieOptions);

			return {
				token,
				refreshToken,
				id: user.id || user._id || "",
				name: user.name || "",
				email: user.email || "",
				role: user.role || "",
				profilePic: user.profilePic || "",
			};
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || error.message || "Login failed."
			);
		}
	}
);

// SIGNUP
export const signupUser = createAsyncThunk(
	"auth/signupUser",
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post("/auth/register", {
				name,
				email,
				password,
			});
			return {
				success: true,
				message: res.data.message || "Signup successful.",
			};
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || error.message || "Signup failed."
			);
		}
	}
);

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
	removeAuthCookies();
	return true;
});

//  REFRESH TOKEN
export const refreshAccessToken = createAsyncThunk(
	"auth/refreshAccessToken",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post("/auth/refresh");
			const { token } = res.data;
			Cookies.set("token", token, cookieOptions);
			return token;
		} catch {
			return rejectWithValue("Session expired. Please log in again.");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// LOGIN
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = "";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload.token;
				state.refreshToken = action.payload.refreshToken;
				state.id = action.payload.id;
				state.name = action.payload.name;
				state.email = action.payload.email;
				state.role = action.payload.role;
				state.profilePic = action.payload.profilePic;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Login failed.";
			})

			// SIGNUP
			.addCase(signupUser.pending, (state) => {
				state.loading = true;
				state.error = "";
			})
			.addCase(signupUser.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Signup failed.";
			})

			// LOGOUT
			.addCase(logoutUser.fulfilled, () => ({
				id: "",
				token: "",
				refreshToken: "",
				role: "",
				name: "",
				email: "",
				profilePic: "",
				loading: false,
				error: "",
			}))

			// REFRESH
			.addCase(refreshAccessToken.fulfilled, (state, action) => {
				state.token = action.payload;
			})
			.addCase(refreshAccessToken.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export default authSlice.reducer;
