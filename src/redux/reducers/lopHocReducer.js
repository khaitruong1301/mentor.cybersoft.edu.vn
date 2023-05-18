//rxslice
import { createSlice } from '@reduxjs/toolkit';
import { LopHocService } from '../../services/LopHocService';

const initialState = {
  danhSachLop: [],
  dsChiNhanh: [],
  dsBaiTapDaCham:null,
  danhSachLopObject: {}
};

const lopHocReducer = createSlice({
  name: "lopHocReducer",
  initialState,
  reducers: {
    getDanhSachLop: (state, { type, payload }) => {
      state.danhSachLopObject = Object.fromEntries(payload.map((x) => [x.id, x]))
      state.danhSachLop = payload;

    },
    getDanhSachChiNhanh: (state, { type, payload }) => {
      state.dsChiNhanh = payload;

    },
    getBaiTapDaCham: (state, { type, payload }) => {
      state.dsBaiTapDaCham = payload;

    },
  }
});

//quản lý actions
export const {
  getDanhSachLop,
  getDanhSachChiNhanh,
  getBaiTapDaCham
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

export const callApiBaiTapDaCham= () => async (dispatch) => {
  const apiBaiTapDaCham = await LopHocService.layBaiTapDaCham();

  dispatch(getBaiTapDaCham(apiBaiTapDaCham.data.content));
}