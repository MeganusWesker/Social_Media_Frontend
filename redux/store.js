import { configureStore } from '@reduxjs/toolkit'
import { chatReducer } from './reducer/chatReducer';
import { postReducer } from './reducer/postReducer';
import { userReducer } from './reducer/userReducer';

export const store = configureStore({
  reducer: {
    user:userReducer,
    post:postReducer,
    chat:chatReducer,
  },
});


export const server =`https://social-media-backend-eight.vercel.app/api/v1`;