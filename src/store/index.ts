import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import postSlice from './postSlice';
export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        posts: postSlice.reducer
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
