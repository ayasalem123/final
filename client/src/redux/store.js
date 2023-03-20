import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserReducer';
import adminReducer from './slices/AdminReducer';
const store = configureStore({
  reducer: { userAuth: userReducer, admin: adminReducer },
});

export default store;
