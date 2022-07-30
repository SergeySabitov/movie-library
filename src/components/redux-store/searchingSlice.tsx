import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initSearchingState = {
    searching: boolean;
    title: string;
    year: string;
}
const initialState: initSearchingState = {
    searching: false,
    title: '',
    year: ''
}

const searchingSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        find(state, {payload}: PayloadAction<{title: string, year: string}>) {
            state.searching = true;
            state.title = payload.title;
            state.year = payload.year;
        },
        finded(state) {
            state.searching = false;
        }
    }
})

export default searchingSlice;
export const searchActions = searchingSlice.actions;