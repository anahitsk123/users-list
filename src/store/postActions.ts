import postSlice from './postSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { PostModel } from '../models/postModel';
import PostsService from '../services/postsService';

export const postActions = postSlice.actions;

export const fetchUserPosts = (userId: number):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        if(getState().posts.allPosts.length === 0) {
            const response: PostModel[] = await PostsService.getUserPosts(userId);
            dispatch(postActions.setPosts(response))
        }
    }
};

export const removePost = (postId: number): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        dispatch(postActions.removePost({ id: postId }))
    }
}
