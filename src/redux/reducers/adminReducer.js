//rxslice
import { createSlice, current } from '@reduxjs/toolkit';
import { AdminService } from '../../services/AdminService';
import { NguoiDungService } from '../../services/NguoiDungService';
import { USER_LOGIN } from '../../utils/constant';
import { history } from '../../utils/history';
import { checkQuyenUser } from '../../utils/SelectOption';
import { callApiChiNhanh, callApiLopHoc } from './lopHocReducer';
import { callApiKhachHang, callApiNguoiDung } from './userReducer';

const initialState = {
  roleCom: null,
  dsQuyen: [],
  dsConfig:[]
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    getDanhSachQuyen: (state, { type, payload }) => {
      state.dsQuyen = payload;
    },
    getDanhSachConfig: (state, { type, payload }) => {
      state.dsConfig = payload;
    },
    setRoleCom: (state, { type, payload }) => {


      let nguoiDung = { "id": "b9376497-1678-42e0-b8f8-d5ccaa03274f", "email": "admin@gmail.com", "hoTen": "Admin", "biDanh": "admin", "soDT": "0941237751", "facebookId": "", "avatar": "/static/user-icon.png", "urls": "$2b$10$/nRixjwK7lXUJ9M1jrjh4Oh0dfyyE4ecCkZWH0Yuh69NWoo0gkLhK", "token": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiIxMC8yMi8yMDQ1IDEwOjM3OjU1IFBNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImI5Mzc2NDk3LTE2NzgtNDJlMC1iOGY4LWQ1Y2NhYTAzMjc0ZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDX0tIIiwiQU5ZIiwiQ19MTCIsIkNfTE9QIiwiQ19ORCIsIkNIRUNLX01FTlRPUl9MT1AiLCJEX0RBTkgiLCJEX0tIIiwiRF9MTCIsIkRfTkQiLCJGX0dDIiwiRl9MT1AiLCJHRF9MSCIsIktfVFQiLCJOX1FVWUVOIiwiUUxfQkwiLCJRTF9CTSIsIlFMX0NMIiwiUUxfR0MiLCJRTF9ITVQiLCJRTF9LSCIsIlFMX0xUIiwiUUxfVFQiLCJSX0JIIiwiUl9LSCIsIlJfTEwiLCJSX0xPUCIsIlJfTkQiLCJSX1ZMIiwiVV9LSCIsIlVfTEwiLCJVX0xPUCIsIlVfTkQiLCJYX0tIX0wiLCJRTF9MQ04iLCJRTF9US0QiLCJRTF9DSFRMIiwiUUxfUk0iLCJEX0JUIl0sIm5iZiI6MTY2NjQ1MzA3NSwiZXhwIjoxNjY2NDU2Njc1fQ.fIwoFacMNwqu0nkUD7oXCUfusiBD9voE0PnQDtR1d3A", "thongTinMoRong": "", "danhSachLopHoc": "[\"258\",\"258\",\"254\",\"282\"]", "thongTinLopHoc": null, "maNhomQuyen": "SPADMIN", "ngayTao": "2/21/2020 1:22:51 AM", "color": "black", "nuocNgoai": false };

      NguoiDungService.checkPassService(nguoiDung).then(res => {

        if (res.data.content == "0") {
          localStorage.removeItem(USER_LOGIN);
          history.push("/login");
          return;
        }


      }).catch(err => {
        history.push("/login");
        return
      })

      const { dsQuyen } = current(state);

      if (dsQuyen.length > 0) {
        state.roleCom = payload;

        //check quyen hay ko
        if (!checkQuyenUser(dsQuyen, payload)) {
          history.push("/login")

        }
      } else {

        let { pathname, search } = window.location;
        pathname != "/" && localStorage.setItem("url_redirect", pathname + search);
        history.push("/h")
      }


    },
  }
});

//quản lý actions
export const {
  getDanhSachQuyen,
  getNhomQuyen,
  setRoleCom,
  getDanhSachConfig
} = adminReducer.actions

export default adminReducer.reducer


//setup redux thunk

//closure function
export const callApiQuyen = (userId) => async (dispatch) => {
  const apiQuyen = await AdminService.layQuyenUserService(userId);

  dispatch(getDanhSachQuyen(apiQuyen.data.content));
}

export const callApiConfig = () => async (dispatch) => {
  const apiConfig = await AdminService.layDanhSachConfigService();

  dispatch(getDanhSachConfig(apiConfig.data.content));
}
