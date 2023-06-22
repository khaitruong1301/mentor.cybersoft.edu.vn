//rxslice
import { createSlice } from "@reduxjs/toolkit";
import { QuanLyMentorService } from "../../services/QuanLyMentorService";

const initialState = {
  danhSachMentorChiNhanh: []
};

const quanLyMentorReducer = createSlice({
  name: "quanLyMentorReducer",
  initialState,
  reducers: {
    getDanhSachMentorChiNhanh: (state, { type, payload }) => {
      state.danhSachMentorChiNhanh = payload;
      return state;
    }
  },
});

//quản lý actions
export const {
    getDanhSachMentorChiNhanh,

} = quanLyMentorReducer.actions;

export default quanLyMentorReducer.reducer;

// closure function

export const callApiGetDanhSachMentorChiNhanh =
  () => async (dispatch) => {

    // dispatch(updateLoading(true))

    const getTatCaDanhSachMentorChiNhanh =
      await QuanLyMentorService.layToanBoDanhSachMentorChiNhanh();

    dispatch(
        getDanhSachMentorChiNhanh(
        getTatCaDanhSachMentorChiNhanh.data.content
      )
    );
  };
