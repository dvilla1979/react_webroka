import { createAsyncThunk } from "@reduxjs/toolkit";
import { user } from "../../api/user";
import { localUser } from "../../utils/localUser";

export const authThunk = createAsyncThunk(
    'login',
    async (
        {username, password}: {username: string, password: string},
        {rejectWithValue},
    ) => {
        try {


            const AuthData = await user.login(username, password);

            const resData = AuthData.data;           

            localStorage.setItem("userInfo", JSON.stringify(resData));

            return resData;

        } catch (error) {
            return rejectWithValue(error);
        }
    },
)