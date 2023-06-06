//rxslice
import { createSlice } from "@reduxjs/toolkit";
import { AdminService } from "../../services/AdminService";

const initialState = {
  danhMucDanhGia: [],
  danhSachDanhGia: [],
  danhSachDanhGiaCrm: [],
  danhSachMentorChuaChamBai: {},
  danhSachDanhGiaCrmTheoThang: [],
  isLoading: false
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
    getDanhSachDanhGiaCrmTheoThang: (state, { type, payload }) => {
      state.danhSachDanhGiaCrmTheoThang = payload;
      state.isLoading = false
      return state;
    },
    updateNhacNhoMentor: (state, { type, payload }) => {
      let newDanhSachDanhGiaCrmTheoThang = [
        ...state.danhSachDanhGiaCrmTheoThang,
      ];

      const lengthDanhGia = newDanhSachDanhGiaCrmTheoThang.length;

      let newModelNhacNho = {
        ...payload,
        Id: 0,
        DaXoa: false,
        DateTime: new Date(),
        UpdateAt: new Date(),
        LyDoXoa: "",
        MaNguoiXoa: "",
      };
      let isTimThay = false;
      let strNewDanhSachNhacNho = null;

      for (let i = 0; i < lengthDanhGia; i++) {
        let recordCheck = newDanhSachDanhGiaCrmTheoThang[i];
        if (recordCheck.MentorId !== newModelNhacNho.MaNguoiNhacNho) {
          continue;
        }

        if (!isTimThay) {
          // Co nhac nho thi bind vao con khong thi tao moi
         let newArray = recordCheck.DanhSachNhacNho
            ? JSON.parse(recordCheck.DanhSachNhacNho)
            : [];
          newModelNhacNho.Id = newArray.length + 1;

          newArray.push(newModelNhacNho);

          strNewDanhSachNhacNho = JSON.stringify(newArray);
          recordCheck.DanhSachNhacNho = strNewDanhSachNhacNho;
          isTimThay = true
          continue;
        }

        recordCheck.DanhSachNhacNho = strNewDanhSachNhacNho;
      }
      state.danhSachDanhGiaCrmTheoThang = newDanhSachDanhGiaCrmTheoThang
      return state

    },
    updateLoading: (state, { type, payload }) => {
      state.isLoading = payload;
      return state;
    },
  },
});

//quản lý actions
export const {
  getDanhMucDanhGia,
  getDanhSachDanhGia,
  getDanhSachDanhGiaCrm,
  getLayDanhSachMentorChuaChamBai,
  getDanhSachDanhGiaCrmTheoThang,
  updateNhacNhoMentor,
  updateLoading
} = danhGiaMentorReducer.actions;

export default danhGiaMentorReducer.reducer;

// closure function
export const callApiMucDanhGia = () => async (dispatch) => {
  const apiMucDanhGia = await AdminService.layDanhMucDanhGiaService();

  dispatch(getDanhMucDanhGia(apiMucDanhGia.data.content));
};

export const callApiDanhSachDanhGia = () => async (dispatch) => {
  const apiDanhSachDanhGia = await AdminService.layDanhSachDanhGiaService();

  dispatch(getDanhSachDanhGia(apiDanhSachDanhGia.data.content));
};

export const callApiDanhSachDanhGiaCrm = () => async (dispatch) => {
  const apiDanhSachDanhGiaCrm =
    await AdminService.layDanhSachDanhGiaCrmService();

  dispatch(getDanhSachDanhGiaCrm(apiDanhSachDanhGiaCrm.data.content));
};

export const callApiLayDanhSachMentorChuaChamBai = () => async (dispatch) => {
  const apiLayDanhSachMentorChuaChamBai =
    await AdminService.layDanhSachMentorChuaChamBaiService();

  dispatch(
    getLayDanhSachMentorChuaChamBai(
      apiLayDanhSachMentorChuaChamBai.data.content
    )
  );
};

export const callApiDanhSachDanhGiaCrmTheoThang =
  (model) => async (dispatch) => {

    dispatch(updateLoading(true))

    const apiDanhSachDanhGiaCrmTheoThang =
      await AdminService.layDanhSachDanhGiaCrmTheoThangService(model);

    dispatch(
      getDanhSachDanhGiaCrmTheoThang(
        apiDanhSachDanhGiaCrmTheoThang.data.content
      )
    );
  };
