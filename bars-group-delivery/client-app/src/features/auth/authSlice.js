import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";
const user = JSON.parse(localStorage.getItem("user"));

export const auth = createAsyncThunk(
    "auth/auth",
    async ({ phone, password }, thunkAPI) => {
        try {
            const data = await AuthService.auth(phone, password);
            return { user: data };
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);
export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [auth.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [auth.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export default authSlice.reducer;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;