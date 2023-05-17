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
} from "antd";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";



const { Option } = Select;
const { Search } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


const initialState = {
    isLoading: false
};

  //   const arrayTypeReducers = 'SET_IS_LOADING,SET_TYPE_SEARCH'

  // let arrayType = arrayTypeReducers.trim().split(',');

  // let CONSTANTS = arrayType.reduce((prev, next) => {
  //   return Object.assign(prev, {[next]: next})
  // }, {})

  const CONSTANTS = {
    SET_IS_LOADING: "SET_IS_LOADING"
  }

  const reducer = (state, {type, payload}) => {
    switch (type) {
      case CONSTANTS.SET_IS_LOADING:
        return {
          ...state,
          isLoading: true
        }
      default:
        return state;
    }
  };
  

export default function DanhGiaMentorV2() {
  const [state, dispatchLocal] = useReducer(reducer, initialState);

  const dsNguoiDung = useSelector((state) => state.userReducer.dsNguoiDung);
  const danhMucDanhGia = useSelector((state) => state.danhGiaMentorReducer.danhMucDanhGia);
  const danhSachDanhGia = useSelector((state) => state.danhGiaMentorReducer.danhSachDanhGia);

  let [searchParams, setSearchParams] = useSearchParams();


  const handleSearchIconClick = (value) => {
    // if (value != "") {
    //   switch (searchType) {
    //     case "hoTen":
    //       searchText(value, searchType);
    //       break;
    //     case "emailHocVien":
    //       searchText(value, searchType);
    //       break;
    //     case "soDienThoai":
    //       searchText(value, searchType);
    //       break;
    //     case "tenLop":
    //       searchText(value, searchType);
    //       break;
    //   }
    // } else {
    //   setDataTable(dataAfterMap);
    // }
  };

  const onRangePickerChange = (date, dateString) => {
    // if (date != null) {
    //   let dataAfterDateFilter = dataAfterMap?.filter((record) => {
    //     let isLonHonNgayBatDau = moment(record.ngayHoi).isAfter(
    //       moment(date[0])
    //     );
    //     let isNhoHonNgayKetThuc = moment(record.ngayHoi).isBefore(
    //       moment(date[1])
    //     );

    //     if (isLonHonNgayBatDau && isNhoHonNgayKetThuc) return record;
    //   });

    //   setDataTable(dataAfterDateFilter);
    //   return;
    // }
    // sortDataChuaXuLyLenTruoc(dataAfterMap)
  };

 

//   const columns = [
//     {
//       title: "Tên lớp",
//       render: (text, record) => {
//         return record.tenLop;
//       },
//       key: "tenLop",
//       dataIndex: "tenLop",
//       onFilter: (value, record) => record.tenLop.indexOf(value) === 0,
//     },
//     {
//       title: "Họ tên học viên",
//       render: (text, record) => {
//         return record.hoTen;
//       },
//       key: "hoTen",
//       dataIndex: "hoTen",
//     },
//     {
//       title: "Email",
//       render: (text, record) => {
//         return record.emailHocVien;
//       },
//       key: "emailHocVien",
//       dataIndex: "emailHocVien",
//     },
//     {
//       title: "Số điện thoại",
//       render: (text, record) => {
//         return record.soDienThoai;
//       },
//       key: "soDienThoai",
//     },
//     {
//       title: "Facebook",
//       render: (text, record) => {
//         return (
//           <a target="_blank" href={record.linkFacebook}>
//             {record.linkFacebook}
//           </a>
//         );
//       },
//       key: "linkFacebook",
//     },
//     {
//       title: "Thời gian học",
//       render: (text, record) => {
//         return `${record.thoiGianHoc} tháng`;
//       },
//       key: "thoiGianHoc",
//     },
//     {
//       title: "Khó khăn",
//       render: (text, record) => {
//         return record.noiDungTraLoi;
//       },
//       key: "noiDungTraLoi",
//     },
//     {
//       title: "Ngày gửi khó khăn",
//       render: (text, record) => {
//         return moment(record.ngayHoi).format("DD/MM/YYYY");
//       },
//       key: "ngayHoi",
//     },
//     {
//       title: "Hành động",
//       render: (text, record) => {
//         return (
//           <>
//           <ButtonXuLy record={record} handleXuLyKhoKhan={handleXuLyKhoKhan} />
//           <br />
//           <ButtonNhanXuLy record={record} handleNhanXuLy={handleNhanXuLy} />
//           </>
//         );
//       },
//       key: "hanhDong",
//       align: "center",
//     },
//   ];

const columns = [
    {
      title: "Tên lớp",
      render: (text, record) => {
        return record.tenLop;
      },
      key: "tenLop",
      dataIndex: "tenLop",
      onFilter: (value, record) => record.tenLop.indexOf(value) === 0,
    },
  ];

  

  return (
    <>
      <div className="container row">
        <div className="col-md-3">
          <Input.Group compact>
            <Select
              defaultValue={"hoTen"}
              style={{ width: "40%" }}
              onSelect={(value) => console.log(value)}
            >
              <Option value="hoTen">Họ tên</Option>
              <Option value="tenLop">Lớp</Option>
              <Option value="email">Email</Option>
              <Option value="soDienThoai">SDT</Option>
          
            </Select>
            <Search
              className="input-search"
              onSearch={(value) => handleSearchIconClick(value)}
              style={{ width: "59%" }}
            />
          </Input.Group>
        </div>
        <div className="col-md-5">
          <Input.Group compact>
            <Radio.Button>Ngày đánh giá</Radio.Button>
            <RangePicker
              format="DD/MM/YYYY"
              placeholder={["Start Time", "End Time"]}
              onChange={onRangePickerChange}
            />
          </Input.Group>
        </div>
        {/* <div className="col-md-3">
          <Input.Group compact>
            <Select
              defaultValue={filterXuLy}
              style={{ width: "50%" }}
              onSelect={(value) => setFilterXuLy(value)}
            >
              <Option value="tatCa">Tất cả</Option>
              <Option value="chuaXuLy">Chưa có lớp</Option>
              <Option value="daXuLy">Đã có lớp</Option>
              <Option value="dangXuLy">Đang xử lý</Option>
            </Select>
          </Input.Group>
        </div> */}
      </div>
      {state.isLoading ? (
        <div className="text-center">
        <Spin />
      </div>
      ) : (
        <Table
          bordered
          dataSource={[]}
          columns={columns}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: ["10","15","20","30","50"],
            showSizeChanger: true,
          }}
          className="pr-3"
        ></Table>
      )}

      {/* <Modal
        title="Xem đánh giá của học viên"
        visible={isModalVisible}
        onOk={handleLuu}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Đóng"
      >
        {khoKhanDangChon?.tenNguoiXuLy !== "" && (
          <p>Người xử lý: {khoKhanDangChon?.tenNguoiXuLy}</p>
        )}
        <div className="form-group">
          <span>Nội dung xử lý </span>
          <br />
          <AreaField
            className="form-group"
            label=" "
            name="noiDungXuLy"
            onChange={(e, editor) => {
              setNoiDungXuLy(editor);
            }}
            value={khoKhanDangChon?.noiDungXuLy}
            style={{ width: "100%" }}
          />
        </div>
      </Modal> */}
    </>
  );
}

function ButtonXuLy(props) {
  const { record, handleXuLyKhoKhan } = props;

  let isDaXuLy = record?.noiDungXuLy !== "";

  if (isDaXuLy) {
    return (
      <Button
        type="primary"
        style={{ background: "green", color: "white", borderColor: "green" }}
        onClick={() => handleXuLyKhoKhan(record)}
      >
        Xem thông tin xử lý
      </Button>
    );
  }
  return (
    <Button type="primary" onClick={() => handleXuLyKhoKhan(record)}>
      Xử lý
    </Button>
  );
}

function ButtonNhanXuLy(props) {
  const { record, handleNhanXuLy } = props;
  
  let isChuaXuLy = record?.tenNguoiXuLy === "" && record?.noiDungXuLy === "";

  let isDangXuLy = record?.tenNguoiXuLy !== "" && record?.noiDungXuLy === "";

  let isDaXuLy = record?.tenNguoiXuLy !== "" && record?.noiDungXuLy !== "";

  if (isChuaXuLy) {
    return (
      <Button
        type="default"
        style={{ background: "orange", color: "black", borderColor: "orange", marginTop: "10px" }}
        onClick={() => handleNhanXuLy(record)}
      >
       Nhận xử lý
      </Button>
    );
  }

  if (isDangXuLy) {
    return (
      <p>{record.tenNguoiXuLy} đang xử lý - {moment(record.ngayXuLy).format("DD/MM/YYYY")}</p>
    );
  }
  return (
    <p>{record.tenNguoiXuLy} đã xử lý - {moment(record.ngayXuLy).format("DD/MM/YYYY")}</p>
  );
}
