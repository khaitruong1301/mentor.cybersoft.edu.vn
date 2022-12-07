//rxslice
import { createSlice } from '@reduxjs/toolkit';

const initialState = 10;

const demoReducer = createSlice({
  name: "demoReducer",
  initialState,
  reducers: {
    changeNumber: (state, { type, payload }) => {
      state += payload;
      return state;
    },
  }
});

//quản lý actions
export const { changeNumber } = demoReducer.actions

export default demoReducer.reducer


// //closure function
// export const callApiLopHoc = () => async (dispatch) => {
//   const apiLopHoc = await LopHocService.layDanhSachLopService();

//   dispatch(getDanhSachLop(apiLopHoc.data.content));
// }