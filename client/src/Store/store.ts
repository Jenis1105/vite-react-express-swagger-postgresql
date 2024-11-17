import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts"; // Example reducer

const store = configureStore({
    reducer: {
        user: userReducer, // Add your reducers here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
