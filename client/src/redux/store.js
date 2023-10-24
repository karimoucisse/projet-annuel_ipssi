import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import addressReducer from './addressSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
  },
});
