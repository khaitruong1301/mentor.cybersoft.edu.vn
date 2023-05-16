import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApiQuyen } from "../../redux/reducers/adminReducer";
import {
  callApiBaiTapDaCham,
  callApiChiNhanh,
  callApiLopHoc,
} from "../../redux/reducers/lopHocReducer";
import { USER_LOGIN } from "../../utils/constant";
import { history } from "../../utils/history";

import {
  callApiKhachHang,
  callApiNguoiDung,
} from "../../redux/reducers/userReducer";
import {
  callApiDanhSachDanhGia,
  callApiMucDanhGia,
} from "../../redux/reducers/danhGiaMentorReducer";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { checkQuyenUser } from "../../utils/SelectOption";

export default function TrangChu(props) {
  const dispatch = useDispatch();
  const dsQuyen = useSelector((state) => state.adminReducer.dsQuyen);

  const dsBaiTapDaCham = useSelector(
    (state) => state.lopHocReducer.dsBaiTapDaCham
  );

  useEffect(() => {
    //call lay ds quyen
    dispatch(callApiQuyen());

    //call lop hoc
    dispatch(callApiLopHoc());

    //call user
    dispatch(callApiNguoiDung());

    //call khach hang
    dispatch(callApiKhachHang());

    //call chi nhanh
    dispatch(callApiChiNhanh());

    //call bai tap da cham
    if (dsBaiTapDaCham == null) dispatch(callApiBaiTapDaCham());

    //call lay danh muc danh gia
    dispatch(callApiMucDanhGia());

    //call lay danh sach danh gia mentor
    dispatch(callApiDanhSachDanhGia());
  }, []);

  //check đá về page_redirect
  let pathName = localStorage.getItem("url_redirect");
  if (pathName != "/login" && pathName != "/" && dsQuyen.length > 0) {
    history.push(pathName);
  }
  useEffect(() => {}, []);

  return <h1>Hello</h1>;
}
