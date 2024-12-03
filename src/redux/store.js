import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import meetingsReducer from './meetingsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    meetings: meetingsReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});
