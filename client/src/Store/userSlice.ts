// userSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: string | null;
    userId: string | null;
    token: string | null;
    picture: string | null;
}
// we have four states that will be used all over the website
const initialState: UserState = {
    user:  null, // store user email
    userId: null, // store user's unique id that is in the database
    token: null, // jwt token
    picture: null, // user's profile picture
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setPicture: (state, action: PayloadAction<string>) => {
            state.picture = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        // clear all states when user logs out
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.picture = null;
            state.userId = null;
        },
    },
});

export const { setUser, setUserId, setToken, setPicture, clearUser } = userSlice.actions;
export default userSlice.reducer;
