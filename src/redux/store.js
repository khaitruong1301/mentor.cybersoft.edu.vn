//redux toolkit
import { configureStore } from '@reduxjs/toolkit'
import lopHocReducer from './reducers/lopHocReducer';
import adminReducer from './reducers/adminReducer';
import userReducer from './reducers/userReducer';
import danhGiaMentorReducer from './reducers/danhGiaMentorReducer';
import quanLyMentorReducer from './reducers/quanLyMentorReducer';




export const store = configureStore({
  reducer: {
    lopHocReducer,
    adminReducer,
    userReducer,
    danhGiaMentorReducer,
    quanLyMentorReducer
  },
})