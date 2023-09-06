import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../components/types";

const initialState: Post[] = [];

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState, 
    reducers: {
        addPost: (state, action) =>{
            const newPost: Post = {
                id: state.length + 1,
                title: action.payload.title,
                content: action.payload.content,
                author: {
                    id: 103,
                    name: 'New Author',
                    photo: 'https://example.com/new-author-profile.jpg',
                    accountPlan: 'Premium',
                  },
                  comments: [],
            };
            state.push(newPost);
            // return [...state, newPost];
        },
        addComment: (state, action) => {
            const { postId, text } = action.payload;
            const post = state.find((post) => post.id === postId);
          
            if (post) {
              const updatedPost = {
                ...post,
                comments: [
                  ...post.comments,
                  { id: post.comments.length + 1, text, author: 'Current User' },
                ],
              };
          
              const index = state.indexOf(post);
          
              state[index] = updatedPost;
            }
          },
        removePost: (state, action) => {
            const postId = action.payload;

            return state.filter(post => post.id !== postId)
          },

        removeComment: (state, action) =>{
          const { postId, commentId } = action.payload;
          const post = state.find((post) => post.id === postId);

          if(post) {
            const updatedComments = post.comments.filter(comment => comment.id !== commentId);
            const updatedPost = {
              ...post,
              comments: updatedComments,
            };

            const index = state.indexOf(post);
            state[index] = updatedPost;
          }
        },
        editPost: (state, action) =>{
          const { postId, updatedContent} = action.payload;
          const post = state.find((post) => post.id === postId);

          if (post) {
            const updatedPost = {
              ...post,
              content: updatedContent,
            };

            const index = state.indexOf(post);
            state[index] =  updatedPost;
          }
        },
        editComment: (state, action) => {
          const { postId, commentId, text } = action.payload;
          const post = state.find((post) => post.id === postId);
        
          if (post) {
            const updatedPost = {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId ? { ...comment, text } : comment
              ),
            };
        
            const index = state.indexOf(post);
        
            state[index] = updatedPost;
          }
        },
        
          
    },
});

export const { addPost, addComment, removePost, removeComment, editPost, editComment} =  postsSlice.actions;
export default postsSlice.reducer;