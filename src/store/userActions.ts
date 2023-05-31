import userSlice from './userSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { UserModel } from '../models/userModels';
import UsersService from '../services/usersService';

export const userActions = userSlice.actions;

export const fetchUsers = ():ThunkAction<void,RootState,unknown,AnyAction> => {
    return async(dispatch,getState)=>{
        if(getState().users.allUsers.length === 0){
            const response:UserModel[] = await UsersService.getAllUsers();
            dispatch(userActions.setUsers(response))
        }
    }
};
