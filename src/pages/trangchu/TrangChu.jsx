import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callApiQuyen } from '../../redux/reducers/adminReducer';
import { callApiChiNhanh, callApiLopHoc } from '../../redux/reducers/lopHocReducer';
import { USER_LOGIN } from '../../utils/constant';
import { history } from '../../utils/history';

import { callApiKhachHang, callApiNguoiDung } from '../../redux/reducers/userReducer';


export default function TrangChu(props) {

  const dispatch = useDispatch();
  const dsQuyen = useSelector(state => state.adminReducer.dsQuyen);

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

  }, [])

  let pathName = localStorage.getItem("url_redirect");

  if (pathName != "/login" && pathName != "/" && dsQuyen.length > 0) {

    history.push(pathName)

  }

  return (
    <h1>
      Hello

    </h1>
  )
}
