import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initAuthState = {
    isAuth: boolean;
    token: string | null; 
    userNickname: string | null;
    userEmail: string | null,
    isFirstTime: boolean | null
}
const initialState: initAuthState = {
    isAuth: false,
    token: null,
    userNickname: null,
    userEmail: null,
    isFirstTime: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginHandler(state, {payload}: PayloadAction<{token: string, userNickname: string, userEmail: string, isFirstTime: boolean}>) {
            state.isAuth = true;
            state.token = payload.token;
            state.userNickname = payload.userNickname;
            state.userEmail = payload.userEmail;
            state.isFirstTime = payload.isFirstTime;
        },
        logoutHandler(state) {
            state.isAuth = false;
            state.token = null;
            state.userNickname = null;
            state.userEmail = null
        }
    }
})

export default authSlice;
export const authActions = authSlice.actions;
