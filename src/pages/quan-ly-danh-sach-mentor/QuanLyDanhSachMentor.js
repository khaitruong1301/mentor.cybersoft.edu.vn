import { Spin, Table, message } from "antd";
import React, { useEffect, useState, useMemo, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import {NguoiDungService} from '../../services/NguoiDungService'

export default function QuanLyDanhSachMentor() {
  //Search params
  let [searchParams, setSearchParams] = useSearchParams({});

  //   let dsChiNhanhKiemTra = searchParams.get("dscnkt")
  //     ? JSON.parse(searchParams.get("dscnkt"))
  //     : [];
  //   let isChuaCoLopMentor = +searchParams.get("mtkcl");
  //   let isGroupByMentor = +searchParams.get("gbm");

  //Use Selector

  const dsNguoiDung = useSelector((state) => state.userReducer.dsNguoiDung);

  const danhSachMentorChiNhanh = useSelector((state) => state.quanLyMentorReducer.danhSachMentorChiNhanh);

  // CONST

  const [data, setData] = useState([]);

  const colsTableQuanLyMentor = [
    {
      title: "Tên mentor",
      render: (text, record) => {
        return record.hoTen;
      },
      key: "hoTen",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      render: (text, record) => {
        return record.email;
      },
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      render: (text, record) => {
        return record.soDT;
      },
      key: "soDT",
      dataIndex: "soDT",
    },
    {
      title: "Chưa đăng ký mentor",
      render: (text, record) => {
        return danhSachMentorChiNhanh?.findIndex((item) => item.id === record.id) === -1 ? (<span>X</span>) : "";
      },
      key: "chuaDangKyMentor",
      dataIndex: "chuaDangKyMentor",
      
    },
    {
      title: "Action",
      render: (text, record) => {
        return <button className="btn btn-success" onClick={() => handleXoaMentor(record.id) }>Xoá mentor</button>;
      },
      key: "Action",
      dataIndex: "Action",
    },
  ];

  //Use Effect

  useEffect(() => {
    let isMount = true;

    if (isMount && dsNguoiDung?.length > 0) {
      setData(locMentorTuNguoiDung(dsNguoiDung));
    }

    return () => {
      isMount = false;
    };
  }, [dsNguoiDung.length]);

  // Function
  function locMentorTuNguoiDung(dsNguoiDung) {
    let dsNguoiDungLength = dsNguoiDung.length;
    let dataFiltered = [];
    for (let i = 0; i < dsNguoiDungLength; i++) {
      let record = dsNguoiDung[i];
      if (record.maNhomQuyen !== "MENTOR") {
        continue;
      }
      dataFiltered.push(record);
    }
    return dataFiltered;
  }

  //handle
  function handleXoaMentor(idMentor) {

    //
    NguoiDungService.xoaMentorNguoiDungService(idMentor)
    .then((res) => {
        message.info("Đã xoá thành công")
        let newData = []

        for(let i = 0;i < data.length; i++) {
            let nguoiDung = data[i]
            // console.log(nguoiDung)
            if (nguoiDung.id === idMentor) {
                continue
            }
            newData.push(nguoiDung)
        }
        setData(newData)
    })
  }

  return (
    <>
      <h2>Danh Sách Mentor</h2>
      <Spin spinning={dsNguoiDung?.length > 0 ? false : true} tip="Loading....">
        <Table
        className="table table-striped"
          columns={colsTableQuanLyMentor}
          dataSource={data}
          bordered
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: ["10", "15", "20", "30", "50"],
            showSizeChanger: true,
          }}
        ></Table>
      </Spin>
    </>
  );
}
