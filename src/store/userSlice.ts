import { UserModel, UserArrayModel } from '../models/userModels';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUsersState: UserArrayModel = {
    allUsers: [],
}

const userSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers:{
        setUsers(state, action: PayloadAction<UserModel[]>){
            state.allUsers = action.payload;
        },
    }
})
export default userSlice;
