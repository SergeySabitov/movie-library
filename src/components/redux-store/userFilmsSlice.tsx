import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import movieItemType from "../../types/types";
import { movieDetailsType } from "../MovieList/MovieItem/MovieDetails/MovieDetails";

type storedItemType = {
    details: movieItemType,
    addingDate: string,
    rating: number|null,
    like: boolean,
    guiltyLike: boolean
}
const initialState: storedItemType[] = [];
const userFilmsSlice = createSlice({
    name: 'userFilms',
    initialState,
    reducers: {
        addNewFilm(state, {payload}: PayloadAction<{
            details: movieItemType,
            rating: number|null,
            like: boolean,
            guiltyLike: boolean
        }>) {
            let newItem = {
                details: payload.details, 
                addingDate: new Date().toISOString(),
                rating: payload.rating,
                like: payload.like,
                guiltyLike: payload.guiltyLike
            };
            state.push(newItem);
        },
        addSeveralFilms(state, {payload}: PayloadAction<storedItemType[]>) {
            if (state.length === 0) {
                payload.forEach(element => {
                    state.push(element);
                });
            }
        },
        setMovie(state, {payload}: PayloadAction<{
            imdbID: string,
            rating: number|null,
            like: boolean,
            guiltyLike: boolean
        }>) {
            const index = state.findIndex(item => item.details.imdbID === payload.imdbID);
            const changedItem = state[index];
            changedItem.rating = payload.rating;
            changedItem.like = payload.like;
            changedItem.guiltyLike = payload.guiltyLike;

        },
        removeMovie(state, {payload}: PayloadAction<{imdbID: string}>) {
            const index = state.findIndex(item => item.details.imdbID === payload.imdbID);
            state.splice(index, 1);
        },
        removeAll(state) {
            state.splice(0, state.length);
        }
    }
})

export default userFilmsSlice;
export const userFilmsActions = userFilmsSlice.actions;