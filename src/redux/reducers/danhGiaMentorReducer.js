//rxslice
import { createSlice } from '@reduxjs/toolkit';
import { AdminService } from '../../services/AdminService';

const initialState = {
  danhMucDanhGia: [],
  danhSachDanhGia: [],
  danhSachDanhGiaCrm: [],
  danhSachMentorChuaChamBai: {}
};

const danhGiaMentorReducer = createSlice({
  name: "danhGiaMentorReducer",
  initialState,
  reducers: {
    getDanhMucDanhGia: (state, { type, payload }) => {
      state.danhMucDanhGia = payload;
      return state;
    },
    getDanhSachDanhGia: (state, { type, payload }) => {
      state.danhSachDanhGia = payload;
      return state;
    },
    getDanhSachDanhGiaCrm: (state, { type, payload }) => {
      state.danhSachDanhGiaCrm = payload;
      return state;
    },
    getLayDanhSachMentorChuaChamBai: (state, { type, payload }) => {
      state.danhSachMentorChuaChamBai = payload;
      return state;
    },
  }
});

//quản lý actions
export const {
  getDanhMucDanhGia,
  getDanhSachDanhGia,
  getDanhSachDanhGiaCrm,
  getLayDanhSachMentorChuaChamBai
} = danhGiaMentorReducer.actions

export default danhGiaMentorReducer.reducer


// closure function
export const callApiMucDanhGia = () => async (dispatch) => {
  const apiMucDanhGia = await AdminService.layDanhMucDanhGiaService();

  dispatch(getDanhMucDanhGia(apiMucDanhGia.data.content));
}

export const callApiDanhSachDanhGia = () => async (dispatch) => {
  const apiDanhSachDanhGia = await AdminService.layDanhSachDanhGiaService();

  dispatch(getDanhSachDanhGia(apiDanhSachDanhGia.data.content));
}

export const callApiDanhSachDanhGiaCrm = () => async (dispatch) => {
  const apiDanhSachDanhGiaCrm = await AdminService.layDanhSachDanhGiaCrmService();

  dispatch(getDanhSachDanhGiaCrm(apiDanhSachDanhGiaCrm.data.content));
}

export const callApiLayDanhSachMentorChuaChamBai = () => async (dispatch) => {
  const apiLayDanhSachMentorChuaChamBai = await AdminService.layDanhSachMentorChuaChamBaiService();

  dispatch(getLayDanhSachMentorChuaChamBai(apiLayDanhSachMentorChuaChamBai.data.content));
}
