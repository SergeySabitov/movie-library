import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userFilmsSlice from "./userFilmsSlice";
import searchingSlice from "./searchingSlice";


const store = configureStore({
    reducer: {auth: authSlice.reducer, user: userFilmsSlice.reducer, search: searchingSlice.reducer}
});

export default store;
export type RootState = ReturnType<typeof store.getState>