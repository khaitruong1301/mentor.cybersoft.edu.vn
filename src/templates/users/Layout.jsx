import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import { callApiQuyen } from "../../redux/reducers/adminReducer";
import Header from "./Header";
import { checkQuyenUser } from "../../utils/SelectOption";
import axios from "axios";

export default function Layout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("inf");
  const getQuyenUserVaCheck = async (tokenLocal) => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://apicrm.cybersoft.edu.vn/api/quyen/lay-quyen-user",
        headers: {
          Authorization: `Bearer ${tokenLocal}`,
        },
      });
      console.log(res)
      const checkQuyen = checkQuyenUser(res.data.content, "XL_MT");
      if (!checkQuyen) {
        // alert("Bạn không có quyền xem lớp học này");
        window.location = "https://www.google.com/";
      }
    } catch (error) {
      console.log(error);
      window.location = "https://www.google.com/";
    }
  };

  useEffect(() => {
    // check local xem có token chưa
    // 4 case : có local mà không có url, có local và có url, có url không có local, không có cả 2
    const tokenLocal = localStorage.getItem("USER_TOKEN");
    if (!tokenLocal && token) {
      localStorage.setItem("USER_TOKEN", token);
      getQuyenUserVaCheck(tokenLocal);
    } else if (!tokenLocal && !token) {
      // window.location = "https://www.google.com/";
    } else if (tokenLocal && !token) {
      getQuyenUserVaCheck(tokenLocal);
    } else if (tokenLocal && token) {
      localStorage.setItem("USER_TOKEN", token);
      getQuyenUserVaCheck(token || tokenLocal);
    }
  }, [token]);

  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}
