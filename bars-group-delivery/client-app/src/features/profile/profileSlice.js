import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestStatus } from "../../helpers";
import authHeader from "../../services/authHeader";
import { logout } from "../auth/authSlice";

export const fetchUserInfo = createAsyncThunk(
    "profile/fetchUserInfo",
    async () => {
        const response = await axios.get(
            `/api/Profile`,
            {
                headers: authHeader()
            }
        );
        return response.data;
    }
);

export const updateUserInfo = createAsyncThunk(
    "profile/updateUserInfo",
    async ({ phone, name }, { rejectWithValue }) => {
        const response = await axios.post(
            `/api/Profile`,
            { phone, name },
            {
                headers: authHeader()
            }
        ).catch(error => {
            if (error?.response?.data)
                throw rejectWithValue(error.response.data);
            throw error;
        });

        return response.data;
    }
)


const initialState = {
    phone: "",
    name: "",
    status: RequestStatus.Idle,
    errorCode: ""
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: {
        [logout.fulfilled]: (state, action) => {
            state.phone = "";
            state.name = "";
            state.entities = {};
        },
        [fetchUserInfo.pending]: (state, action) => {
            state.status = RequestStatus.Loading;
        },
        [updateUserInfo.pending]: (state, action) => {
            state.status = RequestStatus.Loading;
        },

        [fetchUserInfo.rejected]: (state, action) => {
            state.status = RequestStatus.Failed;
        },
        [updateUserInfo.rejected]: (state, action) => {
            state.errorCode = action?.payload[0]?.code ?? "";
            state.status = RequestStatus.Failed;
        },

        [fetchUserInfo.fulfilled]: (state, action) => {
            const { phone, name } = action.payload;
            state.phone = phone;
            state.name = name;

            state.errorCode=""
            state.status = RequestStatus.Succeeded;
        },
        [updateUserInfo.fulfilled]: (state, action) => {
            const { phone, name } = action.payload;
            state.phone = phone;
            state.name = name;
            state.status = RequestStatus.Succeeded;
            state.errorCode=""
        },
    },
});

export default profileSlice.reducer;
