import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "../../helpers";
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
    ? { isLoggedIn: true, user, status:RequestStatus.Idle }
    : { isLoggedIn: false, user: null, status:RequestStatus.Idle };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [auth.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.status = RequestStatus.Succeeded
        },
        [auth.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.status = RequestStatus.Failed
        },
        [auth.pending]: (state, action) => {
            state.status = RequestStatus.Loading
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export default authSlice.reducer;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;