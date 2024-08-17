import { createSlice } from "@reduxjs/toolkit";
import { authThunk } from "../thunks/auth.thunks";
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { User } from "../../interfaces/user.interface";
import { localUser } from "../../utils/localUser";

/*interface User {
    id:           string;
    username:     string;
    name:         string;
    lastname:     string;
    email:        string;
    password:     string;
    jobPositions: string;
    numberPhone:  number;
    role:         string;
}
*/

interface AuthState {
    isAuth: boolean;
    success: boolean;
    error: RejectedActionFromAsyncThunk<any> | null;
    loading: boolean;
    userData: User | null;
    accessToken: string | null;
    isExpired: boolean;
} 


const initialState: AuthState = {
    isAuth: localUser.existe(), //localStorage.getItem("userInfo") !== null ? true:false,//localUser.existe(),
    accessToken: localUser.accessToken(), /*localStorage.getItem("userInfo") !== null ? 
        JSON.parse((localStorage.getItem("userInfo"))!).accessToken :
        null, */
    userData: localUser.User(), /*localStorage.getItem("userInfo") !== null ? 
        JSON.parse((localStorage.getItem("userInfo"))!).user:
        null,*/ 
    success: localUser.existe(), //localStorage.getItem("userInfo") !== null ? true: false, 
    error: null,
    isExpired: false,
    loading: false,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //login no se usa
        login: (state) => {
            //console.log("desde reducer login -> state= ", state );
            state.isAuth = true;
        },
        logout: (state) => {
            state.isAuth = false;
            state.accessToken = null;
            state.userData = null;
            state.success = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.pending,(state)=>{
            return (state = {
                ...initialState,
                loading: true,
            });
        });
        builder.addCase(authThunk.fulfilled,(state, action)=>{
            return (state = {
                ...initialState,
                loading: false,
                success: true,
                accessToken: action.payload.accessToken,
                userData: action.payload.user,
                isAuth: true,
                isExpired: false,
            });
        });
        builder.addCase(authThunk.rejected,(state, action)=>{
            return (state = {
                ...initialState,
                loading: false,
                error: action.payload,
            });
        });
    }
});

export const {login, logout} = authSlice.actions