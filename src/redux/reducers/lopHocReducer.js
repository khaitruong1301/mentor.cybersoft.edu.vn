//rxslice
import { createSlice } from '@reduxjs/toolkit';
import { LopHocService } from '../../services/LopHocService';

const initialState = {
  danhSachLop: [],
  dsChiNhanh: []
};

const lopHocReducer = createSlice({
  name: "lopHocReducer",
  initialState,
  reducers: {
    getDanhSachLop: (state, { type, payload }) => {
      state.danhSachLop = payload;

    },
    getDanhSachChiNhanh: (state, { type, payload }) => {
      state.dsChiNhanh = payload;

    },
  }
});

//quản lý actions
export const {
  getDanhSachLop,
  getDanhSachChiNhanh
} = lopHocReducer.actions

export default lopHocReducer.reducer


//setup redux thunk

//rxslice


//closure function
export const callApiLopHoc = () => async (dispatch) => {

  const apiLopHoc = await LopHocService.layDanhSachLopService();

  dispatch(getDanhSachLop(apiLopHoc.data.content));
}

export const callApiChiNhanh = () => async (dispatch) => {
  const apiChiNhanh = await LopHocService.layDanhSachChiNhanhService();

  dispatch(getDanhSachChiNhanh(apiChiNhanh.data.content));
}