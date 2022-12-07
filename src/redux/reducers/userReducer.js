//rxslice
import { createSlice } from '@reduxjs/toolkit';
import { NguoiDungService } from '../../services/NguoiDungService';

const initialState = {
  dsNguoiDung:[],
  dsKhachHang:[]
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getDanhSachNguoiDung: (state, { type, payload }) => {
      state.dsNguoiDung = payload;
     
    },
    getDanhSachKhachHang: (state, { type, payload }) => {
      state.dsKhachHang = payload;
    
    },
  }
});

//quản lý actions
export const { 
  getDanhSachNguoiDung,
   getDanhSachKhachHang
   } = userReducer.actions

export default userReducer.reducer


//closure function
export const callApiNguoiDung = () => async (dispatch) => {
  const apiNguoiDung = await NguoiDungService.layDanhSachNguoiDungService();

  dispatch(getDanhSachNguoiDung(apiNguoiDung.data.content));
}

export const callApiKhachHang = () => async (dispatch) => {
  const apiKhachHang = await NguoiDungService.layDanhSachKhachHangService();

  dispatch(getDanhSachKhachHang(apiKhachHang.data.content));
}