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
} from "antd";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { BulbFilled } from "@ant-design/icons";
import { removeVietnameseTones } from "../../utils";
import _ from "lodash";

const { Option } = Select;
const { Search } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const initialState = {
  isLoading: false,
  data: [],
  isModalChiTietDanhGiaVisible: false,
  recordDangChon: {}
};

const CONSTANTS = {
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_DATA: "SET_DATA",
  SET_MODAL_CHI_TIET_DANH_GIA_VISIBLE: "SET_MODAL_CHI_TIET_DANH_GIA_VISIBLE",
  SET_RECORD_XEM_CHI_TIET_DANH_GIA: "SET_RECORD_XEM_CHI_TIET_DANH_GIA"
};

function asyncThing(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 100);
  });
}

export default function DanhGiaMentorV2() {
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

  const danhSachDanhGiaCrm = useSelector(
    (state) => state.danhGiaMentorReducer.danhSachDanhGiaCrm
  );

  const danhSachMentorChuaChamBai = useSelector(
    (state) => state.danhGiaMentorReducer.danhSachMentorChuaChamBai
  );


  let [searchParams, setSearchParams] = useSearchParams({
    type_search: "tenLop",
    value_search: "",
    theo_day: "null",
    theo_month: "null",
    nx: "0",
    tieuChi: "[0,1,2,3,4,5]",
    diemTu: "-1",
    diemDen: "-1"
  });

  //get range date value
  let rangeValue = null;
  if (searchParams.get("theo_day") != "null") {
    rangeValue = JSON.parse(searchParams.get("theo_day"));
    rangeValue = [moment(rangeValue[0]), moment(rangeValue[1])];
  }
  let inputSearchType = searchParams.get("type_search");
  let theoThang = searchParams.get("theo_month");
  let inputSearchValue = searchParams.get("value_search");
  let tieuChi = null;
  if (searchParams.get("tieuChi") != "null") {
    tieuChi = JSON.parse(searchParams.get("tieuChi"));
  }
  let diemTu = Number(searchParams.get("diemTu"))
  let diemDen = Number(searchParams.get("diemDen"))

  function tinhDiemDuaTheoTieuChi(dataDiem, tieuChiArray) {
    let count = 0;
    let tongDiem = 0;

    dataDiem.map((item) => {
      //moi item la mot array
      item.map((item, index) => {
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

  async function mergeDuLieu(data) {
    let arrayData = [];

    data.map(async (record) => {
      let index = arrayData.findIndex((item) => {
        return item.MentorId === record.MentorId;
      });

      if (index === -1) {
        let model = {
          ...record,
          dsDanhGiaGiangVien: [],
          dsDanhGiaMentor: [],
          dsDanhGiaHocVien: [],
        };
        let noiDungDanhGia = JSON.parse(record.NoiDungDanhGia);
        switch (record.LoaiDanhGia) {
          case "MENTOR":
            model.dsDanhGiaMentor.push(noiDungDanhGia);
            break;
          case "GIANGVIEN":
            model.dsDanhGiaGiangVien.push(noiDungDanhGia);
            break;
          default:
            model.dsDanhGiaHocVien.push(noiDungDanhGia);
        }

        arrayData.push(model);
      } else {
        let model = arrayData[index];
        let noiDungDanhGia = JSON.parse(record.NoiDungDanhGia);
        switch (record.LoaiDanhGia) {
          case "MENTOR":
            model.dsDanhGiaMentor.push(noiDungDanhGia);
            break;
          case "GIANGVIEN":
            model.dsDanhGiaGiangVien.push(noiDungDanhGia);
            break;
          default:
            model.dsDanhGiaHocVien.push(noiDungDanhGia);
        }
      }
    });

    function tinhDiemDanhGia(arrayData) {
      return arrayData.map((item) => {
        let diemMentor =
          item.dsDanhGiaMentor.length === 0
            ? 0
            : tinhDiemDuaTheoTieuChi(item.dsDanhGiaMentor, tieuChi);
        let diemHocVien =
          item.dsDanhGiaHocVien.length === 0
            ? 0
            : tinhDiemDuaTheoTieuChi(item.dsDanhGiaHocVien, tieuChi);
        let diemGiangVien =
          item.dsDanhGiaGiangVien.length === 0
            ? 0
            : tinhDiemDuaTheoTieuChi(item.dsDanhGiaGiangVien, tieuChi);

        let tongDiem = (
          diemMentor * 0.3 +
          diemHocVien * 0.4 +
          diemGiangVien * 0.3
        ).toFixed(2);

        let model = {
          tongDiem,
          diemMentor,
          diemHocVien,
          diemGiangVien,
        };

        item.DiemTrungBinhDanhGia = model;

        return item;
      });
    }

    dispatchLocal({
      type: CONSTANTS.SET_DATA,
      payload: tinhDiemDanhGia(arrayData),
    });
  }

  

  useEffect(() => {
    let isMount = true;
    if (isMount && danhSachDanhGiaCrm?.length > 0) {
      mergeDuLieu(danhSachDanhGiaCrm);
    }
    return () => {
      isMount = false;
    };
  }, [danhSachDanhGiaCrm.length]);

  async function locTheoThang(data, dateCheck) {
    let formatMonth = "MM/yyyy";
    let strMonthCheck = moment(dateCheck).format(formatMonth);
    const arrTemp = await Promise.all(await asyncThing(data));
    return arrTemp.filter((item) => {
      return moment(item.NgayTao).format(formatMonth) === strMonthCheck;
    });
  }

  async function locTheoKhoangThoiGian(data, rangeValue) {
    const arrTemp = await Promise.all(await asyncThing(data));
    return arrTemp.filter((item) => {
      return moment(item.NgayTao).isBetween(
        moment(rangeValue[0]),
        moment(rangeValue[1])
      );
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

      let isKiemTraDiemDanhGia = diemTu !== -1
      let isDuDieuKien = true
      if (isKiemTraDiemDanhGia) {
          isDuDieuKien = (JSON.parse(item.NoiDungDanhGia)?.some((item) => item.DiemDanhGia >= diemTu && item.DiemDanhGia <= diemDen))
          
          
          
      }

      switch (type) {
        case "tenLop":
          return isDuDieuKien && checkString(item.TenLopHoc, inputValue) ;
        case "hoTen":
          return isDuDieuKien && checkString(item.HoTen, inputValue);

        case "email":
          return isDuDieuKien && checkString(item.Email, inputValue);

        case "soDienThoai":
          return isDuDieuKien && checkString(item.SoDT, inputValue);

        default:
          return false;
      }
    });
  }

  const handleFilterData = async () => {
    try {
      let dataFiltered = [];

      if (danhSachDanhGiaCrm?.length > 0) {
        dataFiltered = danhSachDanhGiaCrm;
      }

      // Kiem tra xem co filter theo ngay thang gi khong
      if (searchParams.get("theo_day") !== "null") {
        locTheoKhoangThoiGian(dataFiltered, rangeValue).then((res) => {
          dataFiltered = res;
        });
      }

      if (searchParams.get("theo_month") !== "null") {
        locTheoThang(dataFiltered, theoThang).then((res) => {
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
            mergeDuLieu(res);
            //  dispatchLocal({type:CONSTANTS.SET_DATA, payload: res})
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllTime = () => {
    searchParams.set("theo_month", "null");
    searchParams.set("theo_day", "null");
    setSearchParams(searchParams);
    handleFilterData()
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

      default: {
        searchParams.set(name, value);
        break;
      }
    }

    setSearchParams(searchParams);
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
      title: "SoDienThoai",
      render: (text, record) => {
        return record.SoDT;
      },
      key: "soDT",
      dataIndex: "soDT",
    },
    {
      title: "TenLop",
      render: (text, record) => {
        return record.TenLopHoc;
      },
      key: "tenLopHoc",
      dataIndex: "tenLopHoc",
    },
    {
      title: "Ngày đánh giá",
      render: (text, record) => {
        return moment(record.NgayTao).format("DD/MM/YYYY");
      },
      key: "ngayTao",
      dataIndex: "ngayTao",
    },
    {
      title: "Điểm trung bình đánh giá",
      render: (text, record) => {
        return (
          <Tooltip
            title={`Điểm Mentor: ${record.DiemTrungBinhDanhGia?.diemMentor.toFixed(
              2
            )}, Điểm Học Viên: ${record.DiemTrungBinhDanhGia?.diemHocVien.toFixed(
              2
            )}, Điểm Giảng viên: ${record.DiemTrungBinhDanhGia?.diemGiangVien.toFixed(
              2
            )}`}
          >
            {record.DiemTrungBinhDanhGia?.tongDiem}
          </Tooltip>
        );
      },
      key: "DiemTrungBinh",
      dataIndex: "DiemTrungBinh",
      sorter: (a, b) =>
        a.DiemTrungBinhDanhGia?.tongDiem - b.DiemTrungBinhDanhGia?.tongDiem,
    },
    {
      title: "Action",
      render: (text, record) => {
        let soLuongDanhGiaGiangVien = record.dsDanhGiaGiangVien.length;
        let soLuongDanhGiaMentor = record.dsDanhGiaMentor.length;
        let soLuongDanhGiaHocVien = record.dsDanhGiaHocVien.length;
        return (
          <Tooltip
            title={`Đánh giá Mentor: ${soLuongDanhGiaMentor}, Đánh giá Học Viên: ${soLuongDanhGiaHocVien}, Đánh giá Giảng viên: ${soLuongDanhGiaGiangVien}`}
          >
            <button className="btn btn-success" onClick={() => dispatchLocal({type: CONSTANTS.SET_RECORD_XEM_CHI_TIET_DANH_GIA, payload: record})}>Xem đánh giá</button>
          </Tooltip>
        );
      },
      key: "Action",
      dataIndex: "Action",
    },
  ];

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
          <div className="col-md-5">
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
          </div>
          <div className="col-md-4">
            <Input.Group compact>
              <Radio.Button>Theo tháng</Radio.Button>
              <MonthPicker
                format={"MM/YYYY"}
                value={theoThang != "null" && moment(theoThang)}
                onChange={(date, dateS) => handleSearch(date, "theo_month")}
              />
            </Input.Group>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-2">
            <Tooltip title="Lấy tất cả khoảng thời gian đánh giá">
              <Input.Group compact>
                <button className="btn btn-primary" onClick={handleGetAllTime}>
                  Lấy tất cả
                </button>
              </Input.Group>
            </Tooltip>
          </div>
          <div className="col-md-2">
            <Input.Group compact>
              <button className="btn btn-primary" onClick={handleFilterData}>
                Lọc dữ liệu
              </button>
            </Input.Group>
          </div>
          <div className="col-md-8">

          <Input.Group compact>
     
      <Input
      addonBefore="Điểm đánh giá từ"
        style={{
          width: 185,
          textAlign: 'center',
        }}
        onChange={(e) => handleSearch(e.target.value, "diemTu")}
        defaultValue={diemTu}
      />
     
      <Input
      addonBefore="Đến"
        className="site-input-right"
        style={{
          width: 100,
          textAlign: 'center',
        }}
        onChange={(e) => handleSearch(e.target.value, "diemDen")}
        defaultValue={diemDen}
      />
    </Input.Group>
          </div>
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
            onCancel={() => dispatchLocal({type: CONSTANTS.SET_MODAL_CHI_TIET_DANH_GIA_VISIBLE, payload: false})}
            footer={null}
            width="90vw"
            height="90vh"
            style={{ top: 10 }}
          >
            <div className="container">
              <div className="row">
                <div className="col-8">
                  
                  {
                    state.recordDangChon && state.recordDangChon.dsDanhGiaGiangVien?.length > 0 ? 
                    <>
                      <h4 className="mb-2"
                        >Giảng viên đánh giá</h4>
                      <br />
                      <br />
                      {state.recordDangChon.dsDanhGiaGiangVien.map((item, indexCha) => {
                      return <ChiTietDanhGiaMentorComponent  danhGia={item} danhMucDanhGia={danhMucDanhGia} indexCha={indexCha} key={`mentor_${indexCha}`}/>
                    }) }
                    </>
                    : null
                  }

                  {
                    state.recordDangChon && state.recordDangChon.dsDanhGiaHocVien?.length > 0 ? 
                    
                    <>
                      <h4 className="mb-2"
                        >Học viên đánh giá</h4>
                      <br />
                      {state.recordDangChon.dsDanhGiaHocVien.map((item, indexCha) => {
                      return <ChiTietDanhGiaMentorComponent danhGia={item} danhMucDanhGia={danhMucDanhGia} indexCha={indexCha} key={`hocVien_${indexCha}`} />
                    })  }
                    </>
                    
                    : null
                  }

{
                    state.recordDangChon && state.recordDangChon.dsDanhGiaMentor?.length > 0 ? 
                    
                    <>
                    <h4 className="mb-2"
                      >Mentor đánh giá</h4>
                    <br />
                    <br />
                    {state.recordDangChon.dsDanhGiaMentor.map((item, indexCha) => {
                      return <ChiTietDanhGiaMentorComponent danhGia={item} danhMucDanhGia={danhMucDanhGia} indexCha={indexCha} key={`giangVien_${indexCha}`} />
                    }) }
                  </>
                    : null
                  }
                </div>
                <div className="col-4">
                  <CheckBaiTapChuaCham record={state.recordDangChon} danhSachMentorChuaChamBai={danhSachMentorChuaChamBai} />
                </div>
              </div>
            </div>
          </Modal>
        </>
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

function CheckBaiTapChuaCham(props) {
  const {MentorId, MaLop} = props.record
  const {danhSachMentorChuaChamBai} = props 
 
  if (danhSachMentorChuaChamBai) {
    let isCoTenTrongDanhSach = danhSachMentorChuaChamBai.hasOwnProperty(MentorId);
   
    let isLopChuaCham = false

    if (isCoTenTrongDanhSach) 
    {
      isLopChuaCham = danhSachMentorChuaChamBai[MentorId].danhSachCacLopQuaHanCham.hasOwnProperty(MaLop)
    }
    
   
    if (isCoTenTrongDanhSach && isLopChuaCham)
    {
      return <Tag style={{fontSize:"18px", fontWeight:"700"}} color="red">
    {`Có ${Object.keys(danhSachMentorChuaChamBai[MentorId].danhSachCacLopQuaHanCham).length
} bài tập quá hạn chưa chấm`}
    </Tag>
    }
    
  }

  return null
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
        style={{
          background: "orange",
          color: "black",
          borderColor: "orange",
          marginTop: "10px",
        }}
        onClick={() => handleNhanXuLy(record)}
      >
        Nhận xử lý
      </Button>
    );
  }

  if (isDangXuLy) {
    return (
      <p>
        {record.tenNguoiXuLy} đang xử lý -{" "}
        {moment(record.ngayXuLy).format("DD/MM/YYYY")}
      </p>
    );
  }
  return (
    <p>
      {record.tenNguoiXuLy} đã xử lý -{" "}
      {moment(record.ngayXuLy).format("DD/MM/YYYY")}
    </p>
  );
}

function ChiTietDanhGiaMentorComponent(props) {
  const { danhGia, danhMucDanhGia, indexCha } = props;

  return (
    <ul className="list-group mb-2 shadow rounded">
      <Tag color="red" style={{width: "35px", fontSize:"16px"}} >{indexCha + 1}</Tag>
      {danhMucDanhGia?.map((danhMuc, index) => {
        let isCoNhanXet = danhGia[index].NhanXet.trim() !== "";

        return (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={`sao_${indexCha}_${index}`}
          >
            <b>{danhMuc}</b>
            <div>
           
              <span className="badge badge-secondary badge-pill">
                {isCoNhanXet ? ( <Tooltip title={danhGia[index].NhanXet}>
                  <Badge
                    count={
                      <BulbFilled
                        style={{
                          color: "#f5222d",
                        }}
                      />
                    }
                  >
                    
                      <Rate value={danhGia[index].DiemDanhGia} disabled={true}/>
                   
                  </Badge> </Tooltip>
                ) : (
                  <Rate value={danhGia[index].DiemDanhGia} disabled={true}/>
                )}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
