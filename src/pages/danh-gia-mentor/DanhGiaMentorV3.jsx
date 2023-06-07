import React, { useEffect, useState, useMemo, useReducer } from "react";
import {
  DatePicker,
  Tag,
  Select,
  Checkbox,
  Table,
  Input,
  InputNumber,
  Button,
  Modal,
  message,
  Radio,
  Spin,
  Tooltip,
  Rate,
  Badge,
  Switch,
  Popconfirm,
} from "antd";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { BulbFilled } from "@ant-design/icons";
import { removeVietnameseTones } from "../../utils";
import _ from "lodash";
import {
  callApiDanhSachDanhGiaCrmTheoThang, updateNhacNhoMentor
} from "../../redux/reducers/danhGiaMentorReducer";

import {AdminService} from '../../services/AdminService'
import { ClassStatusSwitch } from "../../utils/SelectOption";

const { Option } = Select;
const { Search } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const initialState = {
  isLoading: false,
  data: [],
  isModalChiTietDanhGiaVisible: false,
  recordDangChon: {},
};

const CONSTANTS = {
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_DATA: "SET_DATA",
  SET_MODAL_CHI_TIET_DANH_GIA_VISIBLE: "SET_MODAL_CHI_TIET_DANH_GIA_VISIBLE",
  SET_RECORD_XEM_CHI_TIET_DANH_GIA: "SET_RECORD_XEM_CHI_TIET_DANH_GIA",
};

function asyncThing(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 100);
  });
}

export default function DanhGiaMentorV3() {
  const dispatch = useDispatch();

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case CONSTANTS.SET_IS_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case CONSTANTS.SET_DATA:
        return {
          ...state,
          data: payload,
        };
      case CONSTANTS.SET_MODAL_CHI_TIET_DANH_GIA_VISIBLE:
        return {
          ...state,
          isModalChiTietDanhGiaVisible: payload,
        };
      case CONSTANTS.SET_RECORD_XEM_CHI_TIET_DANH_GIA:

        return {
          ...state,
          isModalChiTietDanhGiaVisible: true,
          recordDangChon: payload,
        };
      default:
        return state;
    }
  };



  const [state, dispatchLocal] = useReducer(reducer, initialState);

  const dsNguoiDung = useSelector((state) => state.userReducer.dsNguoiDung);
  const danhMucDanhGia = useSelector(
    (state) => state.danhGiaMentorReducer.danhMucDanhGia
  );

  const danhSachDanhGiaCrmTheoThang = useSelector(
    (state) => state.danhGiaMentorReducer.danhSachDanhGiaCrmTheoThang
  );

  const isLoading = useSelector(
    (state) => state.danhGiaMentorReducer.isLoading
  );

  const danhSachMentorChuaChamBai = useSelector(
    (state) => state.danhGiaMentorReducer.danhSachMentorChuaChamBai
  );

 

  let thangTruoc = new Date();
    thangTruoc.setDate(1);
    thangTruoc.setMonth(thangTruoc.getMonth()-1);

  let [searchParams, setSearchParams] = useSearchParams({
    type_search: "tenLop",
    value_search: "",
    theo_day: "null",
    theo_month: thangTruoc,
    nx: 0,
    tieuChi: "[0,1,2,3,4,5]",
    diemTu: "-1",
    diemDen: "-1",
    loai_gv: 2,
    cb: 0,
  });



  //get range date value
  let rangeValue = null;
  if (searchParams.get("theo_day") != "null") {
    rangeValue = JSON.parse(searchParams.get("theo_day"));
    rangeValue = [moment(rangeValue[0]), moment(rangeValue[1])];
  }

  let inputSearchType = searchParams.get("type_search");
  let theoThang = searchParams.get("theo_month") ? searchParams.get("theo_month") : "null" ;
  let inputSearchValue = searchParams.get("value_search");
  let tieuChi = null;
  if (searchParams.get("tieuChi") != "null") {
    tieuChi = JSON.parse(searchParams.get("tieuChi"));
  }
  let diemTu = Number(searchParams.get("diemTu"));
  let diemDen = Number(searchParams.get("diemDen"));
  let isCoNhanXet = +searchParams.get("nx");
  let loaiNguoiDung = searchParams.get("loai_gv") ? +searchParams.get("loai_gv") : 2;
  let isChuaChamBai = +searchParams.get("cb");

  function tinhDiemDuaTheoTieuChi(dataDiem, tieuChiArray) {
    let count = 0;
    let tongDiem = 0;


    dataDiem.map((item) => {
   
      //moi item la mot array
      item.ChiTietDanhGia.map((item, index) => {
       
        //chi nhung index o vao tieu chi thi moi push vao arrayDiem
        if (tieuChiArray === null) {
          tongDiem += item.DiemDanhGia;
          count += 1;
        } else if (tieuChiArray.includes(index)) {
          tongDiem += item.DiemDanhGia;
          count += 1;
        }
      });

    });

    return tongDiem / count;
  }

  // async function mergeDuLieu(data) {
  //   let arrayData = [];

  //   data.map(async (record) => {
  //     let index = arrayData.findIndex((item) => {
  //       return item.MentorId === record.MentorId;
  //     });
  //     let noiDungDanhGia = 
  //     {
  //       TenNguoiDanhGia: record.TenNguoiDanhGia,
  //       ChiTietDanhGia : []
  //     } 
  //     if (index === -1) {
  //       let model = {
  //         ...record,
  //         dsDanhGiaGiangVien: [],
  //         dsDanhGiaMentor: [],
  //         dsDanhGiaHocVien: [],
  //       };
        
  //       switch (record.LoaiDanhGia) {
  //         case "MENTOR":
  //           model.dsDanhGiaMentor.push(noiDungDanhGia);
  //           break;
  //         case "GIANGVIEN":
  //           model.dsDanhGiaGiangVien.push(noiDungDanhGia);
  //           break;
  //         default:
  //           model.dsDanhGiaHocVien.push(noiDungDanhGia);
  //       }

  //       arrayData.push(model);
  //     } else {
  //       let model = arrayData[index];
  //       switch (record.LoaiDanhGia) {
  //         case "MENTOR":
  //           model.dsDanhGiaMentor.push(noiDungDanhGia);
  //           break;
  //         case "GIANGVIEN":
  //           model.dsDanhGiaGiangVien.push(noiDungDanhGia);
  //           break;
  //         default:
  //           model.dsDanhGiaHocVien.push(noiDungDanhGia);
  //       }
  //     }
  //   });

  //   function tinhDiemDanhGia(arrayData) {
     
  //     return arrayData.map((item) => {
   
  //       let diemMentor =
  //         item.dsDanhGiaMentor?.length === 0
  //           ? 0
  //           : tinhDiemDuaTheoTieuChi(item.dsDanhGiaMentor, tieuChi);
  //       let diemHocVien =
  //         item.dsDanhGiaHocVien?.length === 0
  //           ? 0
  //           : tinhDiemDuaTheoTieuChi(item.dsDanhGiaHocVien, tieuChi);
  //       let diemGiangVien =
  //         item.dsDanhGiaGiangVien?.length === 0
  //           ? 0
  //           : tinhDiemDuaTheoTieuChi(item.dsDanhGiaGiangVien, tieuChi);

  //       let tongDiem = (
  //         diemMentor * 0.3 +
  //         diemHocVien * 0.4 +
  //         diemGiangVien * 0.3
  //       ).toFixed(2);

  //       let model = {
  //         tongDiem,
  //         diemMentor,
  //         diemHocVien,
  //         diemGiangVien,
  //       };

  //       item.DiemTrungBinhDanhGia = model;

  //       return item;
  //     });
  //   }

  //   dispatchLocal({
  //     type: CONSTANTS.SET_DATA,
  //     payload: tinhDiemDanhGia(arrayData),
  //   });
  // }

  // useEffect(() => {
  //   let isMount = true;
  //   if (isMount && danhSachDanhGiaCrmTheoThang?.length > 0) {
  //     mergeDuLieu(danhSachDanhGiaCrmTheoThang);
  //   }
  //   return () => {
  //     isMount = false;
  //   };
  // }, [danhSachDanhGiaCrmTheoThang.length]);

 
  async function locTheoLoaiNguoiDung(data, loaiNguoiDung) {
    let loaiNguoiDungCanCheck = loaiNguoiDung === 1 ? "GIANGVIEN" : "MENTOR";
    const arrTemp = await Promise.all(await asyncThing(data));
    return arrTemp.filter((item) => {
      return item.MaNhomQuyen === loaiNguoiDungCanCheck;
    });
  }


  async function locChuaChamBai(data, danhSachMentorChuaChamBai) {
    const arrTemp = await Promise.all(await asyncThing(data));
    return arrTemp.filter((item) => {
      let isCoTenTrongDanhSach = danhSachMentorChuaChamBai.hasOwnProperty(
        item.MentorId
      );

      let isLopChuaCham = false;

      if (isCoTenTrongDanhSach) {
        isLopChuaCham = danhSachMentorChuaChamBai[
          item.MentorId
        ].danhSachCacLopQuaHanCham.hasOwnProperty(item.MaLop);
      }

      return isCoTenTrongDanhSach && isLopChuaCham;
    });
  }

  function checkString(dataCheck, inputValue) {
    return removeVietnameseTones(dataCheck.toString())
      .toLowerCase()
      .includes(removeVietnameseTones(inputValue).toLowerCase());
  }

  async function locTheoInputKiemTra(data, type, inputValue) {
    const arrTemp = await Promise.all(await asyncThing(data));

    return arrTemp.filter((item) => {
      // let isKiemTraDiemDanhGia = diemTu !== -1;

      // let isDuDieuKien = true;
      // if (isKiemTraDiemDanhGia) {
      //   isDuDieuKien = JSON.parse(item.NoiDungDanhGia)?.some(
      //     (item) => item.DiemDanhGia >= diemTu && item.DiemDanhGia <= diemDen
      //   );
      // }

      // if (isCoNhanXet) {
      //   isDuDieuKien = JSON.parse(item.NoiDungDanhGia)?.some(
      //     (item) => item.NhanXet.trim() !== ""
      //   );
      // }

      switch (type) {
        case "tenLop":
          return  checkString(item.TenLopHoc, inputValue);
        case "hoTen":
          return  checkString(item.HoTen, inputValue);

        case "email":
          return  checkString(item.Email, inputValue);

        case "soDienThoai":
          return  checkString(item.SoDT, inputValue);

        default:
          return false;
      }
    });
  }

  const handleFilterData = async () => {
    try {
      let dataFiltered = [];

      if (danhSachDanhGiaCrmTheoThang?.length > 0) {
        dataFiltered = danhSachDanhGiaCrmTheoThang;
      }

      // Kiem tra xem co filter theo loai nguoi dung khong
      if (loaiNguoiDung > 0) {
        locTheoLoaiNguoiDung(dataFiltered, loaiNguoiDung).then((res) => {
          dataFiltered = res;
        });
      }

      // Kiem tra xem co filter theo ngay thang gi khong
      // if (searchParams.get("theo_day") !== "null") {
      //   locTheoKhoangThoiGian(dataFiltered, rangeValue).then((res) => {
      //     dataFiltered = res;
      //   });
      // }

      // if (searchParams.get("theo_month") !== "null") {
      //   locTheoThang(dataFiltered, theoThang).then((res) => {
      //     dataFiltered = res;
      //   });
      // }

      if (danhSachMentorChuaChamBai && isChuaChamBai) {
        locChuaChamBai(dataFiltered, danhSachMentorChuaChamBai).then((res) => {
          dataFiltered = res;
        });
      }

      asyncThing(dataFiltered).then((res) => {
        // Lọc xong theo khoảng thời gian rồi xem co filter theo ten hay lop gi khong
        if (inputSearchValue !== "null") {
          locTheoInputKiemTra(
            dataFiltered,
            inputSearchType,
            inputSearchValue
          ).then((res) => {
            // mergeDuLieu(res);
             dispatchLocal({type:CONSTANTS.SET_DATA, payload: res})
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleGetAllTime = () => {
  //   searchParams.set("theo_month", "null");
  //   searchParams.set("theo_day", "null");
  //   setSearchParams(searchParams);
  //   handleFilterData();
  // };

  useEffect(() => {
    let isMount = true

    if (isMount)
    {
      handleFilterData();
    }
  
    return () => {
      isMount = false
    }
  }, [danhSachDanhGiaCrmTheoThang])
  

  const handleResetFilter = () => {
    searchParams.set("theo_month", "null");
    searchParams.set("theo_day", "null");
    searchParams.set("value_search", "");
    searchParams.set("diemTu", "-1");
    searchParams.set("diemDen", "-1");
    searchParams.set("nx", 0);
    searchParams.set("loai_gv", 0);
    searchParams.set("cb", 0);
    setSearchParams(searchParams);
    handleFilterData();
  };

  //hanlde search class
  const handleSearch = (value, name) => {
    switch (name) {
      case "bh": {
        searchParams.set(name, JSON.stringify(value));
        break;
      }
      case "theo_day": {
        searchParams.set(name, JSON.stringify(value));
        searchParams.set("theo_month", "null");

        break;
      }
      case "theo_month": {
        searchParams.set(name, value);
        searchParams.set("theo_day", "null");
        break;
      }

      case "nx": {
        searchParams.set(name, value ? 1 : 0);
        break;
      }

      case "cb": {
        searchParams.set(name, value ? 1 : 0);
        break;
      }

      default: {
        searchParams.set(name, value);
        break;
      }
    }

    setSearchParams(searchParams);
  };

  function tinhSoBaiTapHetHanChuaCham(record) {
   
    const { MentorId, MaLop } = record;
    if (danhSachMentorChuaChamBai) {
      let isCoTenTrongDanhSach =
        danhSachMentorChuaChamBai.hasOwnProperty(MentorId);

      let isLopChuaCham = false;

      if (isCoTenTrongDanhSach) {
        isLopChuaCham =
          danhSachMentorChuaChamBai[
            MentorId
          ].danhSachCacLopQuaHanCham.hasOwnProperty(MaLop);
      }

      if (isCoTenTrongDanhSach && isLopChuaCham) {
        return Object.keys(
          danhSachMentorChuaChamBai[MentorId].danhSachCacLopQuaHanCham
        ).length;
      }
    }
    return 0;
  }

  function tinhTongDiemTrungBinhDanhGia(record) {
 
    const DanhSachDanhGia = JSON.parse(record?.DanhSachDanhGia)
    
    let lengthDanhSachDanhGia = danhMucDanhGia?.length
    let mangData = []

    //hoc vien 40%
    //mentor giang vien 30%


    for(let i = 0; i < lengthDanhSachDanhGia; i++) {
      let item = DanhSachDanhGia[i]
     
      let diem = 0

      let mangNoiDungDanhGia = []
      if (item.NoiDungDanhGia){
        mangNoiDungDanhGia = JSON.parse(item.NoiDungDanhGia);
      } 
      
      let mangDiem = []
      let lengthDanhSachDanhGia = mangNoiDungDanhGia.length

      if (lengthDanhSachDanhGia > 0) {
        for(let j = 0; j < mangNoiDungDanhGia.length; j++) {
        mangDiem.push(mangNoiDungDanhGia[j]?.DiemDanhGia)

      }
      }
      

      if (mangDiem.length > 0) {
        diem = _.mean(mangDiem)
      }
  

      if (item.LoaiDanhGia === "HOCVIEN") {
        diem *= 0.4
      } else {
        diem *= 0.3
      }
  
      mangData.push(diem)
    }

    return _.mean(mangData).toFixed(3)
    
  }

  function tinhSoLopDangMentor(record)  {
   
    let soLopMentor = 0

    let soLuongRecord = danhSachDanhGiaCrmTheoThang.length

    for (let i = 0; i < soLuongRecord; i++) {
      if (danhSachDanhGiaCrmTheoThang[i].MentorId === record.MentorId) {
        soLopMentor++
      }
    }
    return soLopMentor
  }

  function tinhTongDanhGiaGiangVien(record) {
 
    const DanhSachDanhGia = JSON.parse(record?.DanhSachDanhGia)
    
    let lengthDanhSachDanhGia = danhMucDanhGia?.length
    let mangData = []

    //hoc vien 40%
    //mentor giang vien 30%


    for(let i = 0; i < lengthDanhSachDanhGia; i++) {

      
      let item = DanhSachDanhGia[i]
     if (item.LoaiDanhGia === "HOCVIEN" ||  item.LoaiDanhGia === "MENTOR" ) {
      continue
     }
      let diem = 0

      let mangNoiDungDanhGia = []
      if (item.NoiDungDanhGia){
        mangNoiDungDanhGia = JSON.parse(item.NoiDungDanhGia);
      } 
      
      let mangDiem = []
      let lengthDanhSachDanhGia = mangNoiDungDanhGia.length

      if (lengthDanhSachDanhGia > 0) {
        for(let j = 0; j < mangNoiDungDanhGia.length; j++) {
        mangDiem.push(mangNoiDungDanhGia[j]?.DiemDanhGia)

      }
      }
      
 
      if (mangDiem.length > 0) {
        diem = _.mean(mangDiem)
      }

      mangData.push(diem)
    }
    if(mangData.length === 0) return 0
    return _.mean(mangData).toFixed(3)
    
  }

  function tinhTongDanhGiaHocVien(record) {
 
    const DanhSachDanhGia = JSON.parse(record?.DanhSachDanhGia)
    
    let lengthDanhSachDanhGia = danhMucDanhGia?.length
    let mangData = []

    //hoc vien 40%
    //mentor giang vien 30%


    for(let i = 0; i < lengthDanhSachDanhGia; i++) {

      
      let item = DanhSachDanhGia[i]
     if (item.LoaiDanhGia !== "HOCVIEN" ) {
      continue
     }
      let diem = 0

      let mangNoiDungDanhGia = []
      if (item.NoiDungDanhGia){
        mangNoiDungDanhGia = JSON.parse(item.NoiDungDanhGia);
      } 
      
      let mangDiem = []
      let lengthDanhSachDanhGia = mangNoiDungDanhGia.length

      if (lengthDanhSachDanhGia > 0) {
        for(let j = 0; j < mangNoiDungDanhGia.length; j++) {
        mangDiem.push(mangNoiDungDanhGia[j]?.DiemDanhGia)

      }
      }
      

      if (mangDiem.length > 0) {
        diem = _.mean(mangDiem)
      }
  

      
  
      mangData.push(diem)
    }

    return _.mean(mangData).toFixed(3)
    
  }

  function tinhTongDanhGiaMentor(record) {
 
    const DanhSachDanhGia = JSON.parse(record?.DanhSachDanhGia)
    
    let lengthDanhSachDanhGia = danhMucDanhGia?.length
    let mangData = []

    //hoc vien 40%
    //mentor giang vien 30%


    for(let i = 0; i < lengthDanhSachDanhGia; i++) {

      
      let item = DanhSachDanhGia[i]

      
     if (item.LoaiDanhGia !== "MENTOR" ) {
      continue
     }
      let diem = 0

      let mangNoiDungDanhGia = []
      if (item.NoiDungDanhGia){
        mangNoiDungDanhGia = JSON.parse(item.NoiDungDanhGia);
      } 
      
      let mangDiem = []
      let lengthDanhSachDanhGia = mangNoiDungDanhGia.length

      if (lengthDanhSachDanhGia > 0) {
        for(let j = 0; j < mangNoiDungDanhGia.length; j++) {
        mangDiem.push(mangNoiDungDanhGia[j]?.DiemDanhGia)

      }
      }
      

      if (mangDiem.length > 0) {
        diem = _.mean(mangDiem)
      }
  

      
  
      mangData.push(diem)
    }

    if(mangData.length === 0) return 0

    return _.mean(mangData).toFixed(3)
    
  }

  const columns = [
    {
      title: "Tên mentor",
      render: (text, record) => {
        return record.HoTen;
      },
      key: "hoTen",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      render: (text, record) => {
        return record.Email;
      },
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      render: (text, record) => {
        return record.SoDT;
      },
      key: "soDT",
      dataIndex: "soDT",
    },
    {
      title: "Tên lớp",
      render: (text, record) => {
        return record.TenLopHoc;
      },
      key: "tenLopHoc",
      dataIndex: "tenLopHoc",
      onFilter: (value, record) => removeVietnameseTones(record.TenLopHoc.toString())
      .toLowerCase()
      .includes(removeVietnameseTones(value).toLowerCase()),
    filterSearch: true
    },
    {
      title: "Số lượng bài quá hạn chưa chấm",
      render: (text, record) => {
        return tinhSoBaiTapHetHanChuaCham(record)
      },
      key: "SoLuongBaiQuaHanChuaCham",
      dataIndex: "SoLuongBaiQuaHanChuaCham",
      sorter: (a, b) => tinhSoBaiTapHetHanChuaCham(a) - tinhSoBaiTapHetHanChuaCham(b)
    }
    ,
    
      {
        title: "Điểm học viên",
        render: (text, record) => {
          return tinhTongDanhGiaHocVien(record)
        },
        key: "diemHocVien",
        dataIndex: "diemHocVien",
        sorter: (a, b) => tinhTongDanhGiaHocVien(a) - tinhTongDanhGiaHocVien(b)
      }

      ,
    
      {
        title: "Điểm mentor",
        render: (text, record) => {
          return tinhTongDanhGiaMentor(record)
        },
        key: "diemMentor",
        dataIndex: "diemMentor",
        sorter: (a, b) => tinhTongDanhGiaMentor(a) - tinhTongDanhGiaMentor(b)
      }

      ,
    
      {
        title: "Điểm giảng viên",
        render: (text, record) => {
          return tinhTongDanhGiaGiangVien(record)
        },
        key: "diemGiangVien",
        dataIndex: "diemGiangVien",
        sorter: (a, b) => tinhTongDanhGiaGiangVien(a) - tinhTongDanhGiaGiangVien(b)
      }
    ,
    
      {
        title: "Tổng điểm trung bình đánh giá",
        render: (text, record) => {
          return tinhTongDiemTrungBinhDanhGia(record)
        },
        key: "DiemTrungBinhDanhGia",
        dataIndex: "DiemTrungBinhDanhGia",
        sorter: (a, b) => tinhTongDiemTrungBinhDanhGia(a) - tinhTongDiemTrungBinhDanhGia(b)
      }
      ,
    
      {
        title: "Số lớp đang mentor ",
        render: (text, record) => {
          return tinhSoLopDangMentor(record)
        },
        key: "DiemTrungBinhDanhGia",
        dataIndex: "DiemTrungBinhDanhGia",
        sorter: (a, b) => tinhSoLopDangMentor(a) - tinhSoLopDangMentor(b)
      }
      
,
    {
      title: "Action",
      render: (text, record) => {
        return (
          <button
          className="btn btn-success"
          onClick={() =>
            dispatchLocal({
              type: CONSTANTS.SET_RECORD_XEM_CHI_TIET_DANH_GIA,
              payload: record,
            })
          }
        >
          Xem đánh giá
        </button>
        );
      },
      key: "Action",
      dataIndex: "Action",
    },
  ];
  function handleGetDanhGiaMentorTheoThang(date) {

  }
  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <Input.Group compact>
              <Select
                defaultValue={inputSearchType}
                style={{ width: "40%" }}
                onSelect={(value) => handleSearch(value, "type_search")}
              >
                <Option value="tenLop">Lớp</Option>
                <Option value="hoTen">Họ tên</Option>
                <Option value="email">Email</Option>
                <Option value="soDienThoai">SDT</Option>
              </Select>
              <Search
                className="input-search"
                onChange={(e) => {
                  handleSearch(e.target.value, "value_search");
                }}
                onSearch={(value) => handleFilterData()}
                style={{ width: "59%" }}
              />
            </Input.Group>
          </div>
          {/* <div className="col-md-5">
            <Input.Group compact>
              <Radio.Button>Theo thời gian</Radio.Button>
              <RangePicker
                value={
                  rangeValue && [moment(rangeValue[0]), moment(rangeValue[1])]
                }
                format="DD/MM/YYYY"
                placeholder={["Start Time", "End Time"]}
                onChange={(date, dateS) => handleSearch(date, "theo_day")}
              />
            </Input.Group>
          </div> */}
          <div className="col-md-4">
            <Input.Group compact>
              <Radio.Button>Theo tháng</Radio.Button>
              <MonthPicker
                format={"MM/YYYY"}
                value={theoThang == "null" ? moment().subtract(1, 'months'): moment(theoThang)}
                onChange={(date, dateS) => {
                  // set lại url
                  handleSearch(date, "theo_month")
                  dispatch(callApiDanhSachDanhGiaCrmTheoThang(date))
                }
                  }
              />
            </Input.Group>
          </div>
        </div>
        <div className="row mt-2">
          {/* <div className="col-md-2">
            <Tooltip title="Lấy tất cả khoảng thời gian đánh giá">
              <Input.Group compact>
                <button className="btn btn-primary" onClick={handleGetAllTime}>
                  Lấy tất cả
                </button>
              </Input.Group>
            </Tooltip>
          </div> */}
          <div className="col-md-2">
            <Input.Group compact>
              <button className="btn btn-primary" onClick={handleFilterData}>
                Lọc dữ liệu
              </button>
            </Input.Group>
          </div>
          <div className="col-md-2">
            <Input.Group compact>
              <button className="btn btn-primary" onClick={handleResetFilter}>
                Clear Filter
              </button>
            </Input.Group>
          </div>
          {/* <div className="col-md-3">
            <Input.Group compact>
              <Input
                addonBefore="Điểm đánh giá từ"
                style={{
                  width: 185,
                  textAlign: "center",
                }}
                onChange={(e) => handleSearch(e.target.value, "diemTu")}
                defaultValue={diemTu}
              />

              <Input
                addonBefore="Đến"
                className="site-input-right"
                style={{
                  width: 100,
                  textAlign: "center",
                }}
                onChange={(e) => handleSearch(e.target.value, "diemDen")}
                defaultValue={diemDen}
              />
            </Input.Group>
          </div> */}
          {/* <div className="col-md-2">
            <b>Có nhận xét:</b>{" "}
            <Switch
              checked={isCoNhanXet}
              onChange={(value) => handleSearch(value, "nx")}
            />
          </div> */}
        </div>
        <div className="row mt-2">
          <div className="col-md-2">
            <Input.Group compact>
              <Select
                defaultValue={loaiNguoiDung}
                style={{ width: "40%" }}
                onSelect={(value) => handleSearch(value, "loai_gv")}
              >
                <Option value={0}>Tất cả</Option>
                <Option value={1}>Giảng viên</Option>
                <Option value={2}>Mentor</Option>
              </Select>
            </Input.Group>
          </div>
          <div className="col-md-2">
            <b>Chưa chấm bài:</b>{" "}
            <Switch
              checked={isChuaChamBai}
              onChange={(value) => handleSearch(value, "cb")}
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spin />
        </div>
      ) : (
        <>
          <Table
            bordered
            dataSource={state.data}
            columns={columns}
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions: ["10", "15", "20", "30", "50"],
              showSizeChanger: true,
            }}
            className="pr-3"
          ></Table>
          <Modal
            open={state.isModalChiTietDanhGiaVisible}
            title="Chi tiết đánh giá mentor"
            onCancel={() =>
              dispatchLocal({
                type: CONSTANTS.SET_MODAL_CHI_TIET_DANH_GIA_VISIBLE,
                payload: false,
              })
            }
            footer={null}
            width="90vw"
            height="90vh"
            style={{ top: 10 }}
          >
            <div className="container">

            <ChiTietDanhGiaMentorComponent
                              record={state.recordDangChon}
                              danhMucDanhGia={danhMucDanhGia}
                            />
            </div>
          </Modal>
        </>
      )}

    </>
  );
}

function ChiTietDanhGiaMentorComponent(props) {
  const { record, danhMucDanhGia } = props;
  const dispatch = useDispatch();
  const [isHiddenName, setIsHiddenName] = useState(false)
  const [dataTable, setDataTable] = useState([])
  const [danhSachNhacNho, setDanhSachNhacNho] = useState([])
  const [isVisibleModalXemNhacNho, setIsVisibleModalXemNhacNho] = useState(false)
  const [isVisibleThemNhacNhoModal, setIsVisibleThemNhacNhoModal] = useState(false)
  const [modelNhacNho, setModelNhacNho] = useState({})

  const dsNguoiDung = useSelector((state) => state.userReducer.dsNguoiDung);
  const danhSachLop = useSelector((state) => state.lopHocReducer.danhSachLop);
  let danhSachDanhGia = JSON.parse(record?.DanhSachDanhGia)

  let lengthDanhSachDanhGia = danhSachDanhGia.length;

  let lengthDanhMucDanhGia = danhMucDanhGia.length;





  useEffect(() => {
    
    let isMount = true

  
    if (isMount && record.DanhSachNhacNho !== null ) {
      setDanhSachNhacNho(JSON.parse(record.DanhSachNhacNho))
  } else {
    setDanhSachNhacNho([])
  }
    return () => {
      isMount = false
    }
  }, [record.MentorId])
  


  useEffect(() => {
    let isMount = true

    if (isMount) {
      let mangData = []

    for(let i = 0; i < lengthDanhSachDanhGia; i++) {
      let item = danhSachDanhGia[i]
      item.isDanhGia = false
     
      let mangNoiDungDanhGia = []
      if (item.NoiDungDanhGia){
        mangNoiDungDanhGia = JSON.parse(item.NoiDungDanhGia);
        item.isDanhGia = true
      } 
  
      for(let j = 0; j < lengthDanhMucDanhGia; j++) {
        let tenKey = danhMucDanhGia[j];
        item[removeVietnameseTones(tenKey.replaceAll(" ",''))] = item.isDanhGia ? mangNoiDungDanhGia[j] : ""
      }
  
      mangData.push(item)
    }
    setDataTable(mangData)
    
    
  
  }
    

   
  
    return () => {
      isMount = false
    }
  }, [record.MentorId, record.MaLop])
    

  const handleLuuThongTin = () => {
    // console.log(record)
      let model = {
        MaLop: record.MaLop,
        MaNguoiNhacNho: record.MentorId,
        NoiDungNhacNho: modelNhacNho.noiDungNhacNho
      }

      AdminService.themNhacNhoMentorService(model)
      .then((res) => {
        // Set lai model
        message.info("Them thanh cong")

        // Loi do reducer update nhung khong update lai table nen trick o day la push vao cai mang data hien tai
        let newModelNhacNho = {
          ...model,
          Id: danhSachNhacNho.length+1,
          DaXoa: false,
          DateTime: new Date(),
          UpdateAt: new Date(),
          LyDoXoa: "",
          MaNguoiXoa: "",
        };
        let newDanhSachNhacNho = [...danhSachNhacNho, newModelNhacNho]
        setDanhSachNhacNho(newDanhSachNhacNho)

        setModelNhacNho({})
        setIsVisibleThemNhacNhoModal(false)
        dispatch(updateNhacNhoMentor(model))
      })
  }

  const columnNhacNho = [
    {
      title: "Tên người nhắc nhở",
      render: (text, record) => {
        console.log(dsNguoiDung, record)
        return dsNguoiDung?.find(x => x.id === record.MaNguoiNhacNho)?.hoTen;
      },
      key: "TenNguoiNhacNho",
      dataIndex: "TenNguoiNhacNho",
    },
    {
      title: "Lớp học",
      render: (text, record) => {
        
        return danhSachLop?.find(x => x.id === record.MaLop)?.tenLopHoc;;
      },
      key: "NgayNhacNho",
      dataIndex: "NgayNhacNho",
    },
    ,
    {
      title: "Ngày nhắc nhở",
      render: (text, record) => {
        return moment(record.NgayTao).format("DD/MM/yyyy");
      },
      key: "NgayNhacNho",
      dataIndex: "NgayNhacNho",
    },
    {
      title: "Nội dung nhắc nhở",
      render: (text, record) => {
        return record.NoiDungNhacNho;
      },
      key: "NoiDungNhacNho",
      dataIndex: "NoiDungNhacNho",
    }

  ];

  const columns = [
    {
      title: "Tên người dánh giá",
      render: (text, record) => {
        return isHiddenName ? "" : record.TenNguoiDanhGia;
      },
      key: "TenNguoiDanhGia",
      dataIndex: "TenNguoiDanhGia",
    },
    {
      title: "Loại đánh giá",
      render: (text, record) => {
        return record.LoaiDanhGia;
      },
      key: "LoaiDanhGia",
      dataIndex: "LoaiDanhGia",
      sorter: (a, b) => a.LoaiDanhGia.length - b.LoaiDanhGia.length,
    },
    {
      title: "Hỗ trợ trên lớp học",
      render: (text, record) => {
        return  <NhanXetHocVienComponent NhanXetHocVien={record.Hotrotrenlophoc} />;
      },
      key: "Hotrotrenlophoc",
      dataIndex: "Hotrotrenlophoc",
    },
    {
      title: "Ngôn từ giao tiếp",
      render: (text, record) => {

        return  <NhanXetHocVienComponent NhanXetHocVien={record.Ngontugiaotiep} />;
      },
      key: "Ngontugiaotiep",
      dataIndex: "Ngontugiaotiep",
    },
    {
      title: "Hỗ trợ ngoài giờ",
      render: (text, record) => {
       
        return  <NhanXetHocVienComponent NhanXetHocVien={record.Hotrongoaigio} />;
      },
      key: "Hotrongoaigio",
      dataIndex: "Hotrongoaigio",
    },
    {
      title: "Nhiệt tình",
      render: (text, record) => {

        return  <NhanXetHocVienComponent NhanXetHocVien={record.Nhiettinh} />;
      },
      key: "Nhiettinh",
      dataIndex: "Nhiettinh",
    },
    {
      title: "Chia sẻ kiến thức",
      render: (text, record) => {

        return  <NhanXetHocVienComponent NhanXetHocVien={record.Chiasekienthuc} />;
      },
      key: "Chiasekienthuc",
      dataIndex: "Chiasekienthuc",
    },
    {
      title: "Thái độ hỗ trợ",
      render: (text, record) => {

        return  <NhanXetHocVienComponent NhanXetHocVien={record.Thaidohotro} />;
      },
      key: "Thaidohotro",
      dataIndex: "Thaidohotro",
    },
    ,
    {
      title: "Đánh giá",
      render: (text, record) => {

        return  record?.isDanhGia ? <p>X</p> : null;
      },
      key: "Thaidohotro",
      dataIndex: "Thaidohotro",
      sorter: (a, b) => a.isDanhGia - b.isDanhGia
    }
  ];

  const handleChangeInput = (e) => {
    let newModelNhacNho = { ...modelNhacNho };
    newModelNhacNho[e.target.name] = e.target.value;
    setModelNhacNho(newModelNhacNho);
  };

  return (
    <> 
    <div>
      <div className="d-flex justify-content-between">
      <h5>{record.TenLopHoc} - {record.HoTen}</h5>
      <Badge count={record?.DanhSachNhacNho ? danhSachNhacNho.length : 0}>
      <button className="btn btn-primary" onClick={() => setIsVisibleModalXemNhacNho(true)}>Xem ghi chú</button>
    </Badge>
      </div>
      
      <h6>Có {dataTable?.filter(x => x.isDanhGia).length} / {dataTable.length} lượt đánh giá</h6>
      <div className="col-md-2">
            <b>Ẩn tên người đánh giá:</b>{" "}
            <Switch
              checked={isHiddenName}
              onChange={(value) => {
                setIsHiddenName(value)
              }}
            />
          </div>
    </div>
    <Table
            bordered
            dataSource={dataTable}
            columns={columns}
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions: ["10", "15", "20", "30", "50"],
              showSizeChanger: true,
            }}
            className="pr-3"
          ></Table>
            <Modal
            open={isVisibleModalXemNhacNho}
            title="Danh sách đã nhắc nhở"
            onCancel={() =>
              setIsVisibleModalXemNhacNho(false)
            }
            footer={null}
            width="90vw"
            height="90vh"
            style={{ top: 10 }}
          >
            <div className="text-right mb-2">
            <button className="btn btn-success " onClick={()=> setIsVisibleThemNhacNhoModal(true)}>Thêm nhắc nhở</button>
            </div>
           
            <Table
            bordered
            dataSource={danhSachNhacNho}
            columns={columnNhacNho}
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions: ["10", "15", "20", "30", "50"],
              showSizeChanger: true,
            }}
            className="pr-3"
          ></Table>
          <Modal
            open={isVisibleThemNhacNhoModal}
            title="Them Nhac Nho"
            onCancel={() =>
              setIsVisibleThemNhacNhoModal(false)
            }
            footer={null}
            width="50vw"
            height="50vh"
            style={{ top: 10 }}
          >
            <div className="container">
          <div className="row">
            <div className="col-12" id="editProjectForm">
              
              <div className="form-group">
                <label className="font-bold">Nội dung nhắc nhở: </label>
                <textarea
                  className="form-control"
                  name="noiDungNhacNho"
                  rows={6}
                  value={modelNhacNho?.noiDungNhacNho ? modelNhacNho.noiDungNhacNho : ""}
                  onChange={(e) => handleChangeInput(e)}
                  placeholder="Bạn hãy nhập nội dung đã nhắc nhở mentor"
                />
              </div>
              <Popconfirm title="Bạn có chắc muốn thêm nhắc nhở" onConfirm={() => handleLuuThongTin()}>
              <button
                className="btn btn-primary"
                
              >
                Thêm nhắc nhở
              </button>
              </Popconfirm>
              
            </div>
          </div>
        </div>

          </Modal>
          
          </Modal>
    </>
   
  );
}
function NhanXetHocVienComponent(props) {

  const {DiemDanhGia, NhanXet} = props?.NhanXetHocVien


  // }
  return (
    <>
    {
        DiemDanhGia  ?  <h6>Điểm: {DiemDanhGia}</h6> : null
      }
     
      {
        (NhanXet && NhanXet?.trim() !== "") ? <h6>
        Nhận xét : {NhanXet}
          </h6> : null
      }
      
    </>
  )
}
