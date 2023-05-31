import { PostModel, PostArrayModel } from '../models/postModel';
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialPostsState: PostArrayModel = {
    allPosts: [],
}

const postSlice = createSlice({
    name: 'posts',
    initialState: initialPostsState,
    reducers:{
        setPosts(state, action: PayloadAction<PostModel[]>){
            state.allPosts = action.payload;
        },
        removePost(state, action: PayloadAction<{ id: number }>){
            state.allPosts = state.allPosts.filter((post: PostModel) => post.id !== action.payload.id);
        },
    }
})
export default postSlice;
