import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoleCom } from '../../redux/reducers/adminReducer';
import { Divider, Select, DatePicker, Input, Switch } from 'antd';
import { CardMentor } from '../../components/cardmentor/CardMentor';
import { CardLopHoc } from '../../components/cardlophoc/CardLopHoc';
import { dinhDangNgayCheck, dinhDangThangCheck } from '../../utils/DateFormat';
import { useSearchParams } from 'react-router-dom';
import { lichHocOptions } from '../../utils/SelectOption';
import moment from 'moment';
import { ListChuaCham } from '../../utils/ListChuaCham';
import { MentorChuaCham } from '../../components/cardmentor/MentorChuaCham';

const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
const { Search } = Input;

export default function DanhGiaMentorr(props) {
    const dispatch = useDispatch();
    const [chuaCham, setChuaCham] = useState(false);

    let [searchParams, setSearchParams] = useSearchParams({
        time: new Date
    });

    useEffect(() => {
        dispatch(setRoleCom(props.role));
    }, [])


    const danhSachLop = useSelector(state => state.lopHocReducer.danhSachLop);
    const dsChiNhanh = useSelector(state => state.lopHocReducer.dsChiNhanh);
    const dsNguoiDung = useSelector(state => state.userReducer.dsNguoiDung);
    const dsKhachHang = useSelector(state => state.userReducer.dsKhachHang);


    //order mentor
    let dsMentor = dsNguoiDung.filter(n => (n.maNhomQuyen == "MENTOR" || n.maNhomQuyen == "DEV") && n.hoTen.toLowerCase().indexOf("data") == -1);
    let dsMentorCreate = dsNguoiDung.filter(n => n.maNhomQuyen == "MENTOR" || n.maNhomQuyen == "DEV" || n.maNhomQuyen == "GIANGVIEN" || n.maNhomQuyen == "ADMIN" || n.maNhomQuyen == "SPADMIN");

    dsMentor = dsMentor.sort((a, b) => ('' + a.hoTen).localeCompare(b.hoTen));




    //hanlde search class
    const handleSearch = (value, name) => {
        switch (name) {
            case "bh": {
                searchParams.set(name, JSON.stringify(value));
                break;
            }
            case "time": {

                searchParams.set(name, JSON.stringify(value));

                searchParams.set("kg", "null");

                break
            }
            case "kg": {

                searchParams.set(name, value);

                searchParams.set("time", "null");
                break;
            }

            case "emp": {

                searchParams.set(name, value ? 1 : 0);

                searchParams.set("tmt", "");
                break;
            }
            case "tmt": {

                searchParams.set(name, value);

                searchParams.set("emp", false);
                break;
            }
            default: {
                searchParams.set(name, value);
                break;
            }
        }


        setSearchParams(searchParams);

    }


    //get range date value
    let rangeValue = null;
    if (searchParams.get("time") != "null") {
        rangeValue = JSON.parse(searchParams.get("time"))
    }


    

   


    dataMain = dataMain.sort((a, b) => new Date(dinhDangNgayCheck(b.ngayKetThuc)) - new Date(dinhDangNgayCheck(a.ngayKetThuc)));


    //mentor filter
    if (tenMentor) {

        dsMentor = dsMentor.filter(n => n.hoTen.trim().toLowerCase().indexOf(tenMentor.trim().toLowerCase()) != -1);
    }

    //end mentor filter
    return (
        <div className='mx-5 row'>
            <Divider orientation="left">Danh sách mentor</Divider>

            <div className='col-3'>
                {!chuaCham && <>

                    <Search placeholder="Tên mentor" onSearch={(value) => handleSearch(value, "tmt")} enterButton />
                    <p></p>
                    <b>Còn trống:</b> <Switch checked={mentorTrong} onChange={(value) => handleSearch(value, "emp")} />
                </>}
                <p></p>
                <b>Chưa chấm bài:</b> <Switch onChange={(value) => setChuaCham(value)} />
            </div>
            <div className='col-9'>

                {!chuaCham ?
                    <CardMentor mentorTrong={mentorTrong} dsLop={dsLop} dsMentor={dsMentor} dsKhachHang={dsKhachHang} dsNguoiDung={dsNguoiDung} danhSachLop={danhSachLop} />
                    :
                    <MentorChuaCham dsKhachHang={dsKhachHang} dsMentorCreate={dsMentorCreate}  dsNguoiDung={dsNguoiDung}/>
                }
            </div>

            <Divider orientation="left">Danh sách lớp học đang & sắp mở</Divider>
            <div className='col-3'>
                <b>Khai giảng: </b>
                <MonthPicker format={"MM/YYYY"} value={khaiGiang != "null" && moment(khaiGiang)} onChange={(date, dateS) => handleSearch(date, "kg")} />

                <p></p>
                <b>Date: </b>
                <RangePicker value={rangeValue} format={"DD/MM/YYYY"} onChange={(date, dateS) => handleSearch(date, "time")} />

                <p></p>

                <b>Chi nhánh: </b>   <Select
                    style={{ width: 200 }}
                    onChange={(value) => handleSearch(value, "cn")}
                    value={chiNhanh}

                >
                    <Option value={0}>Tất cả</Option>
                    {dsChiNhanh.map(item => {
                        return <Option value={item.id}>{item.tenChiNhanh}</Option>
                    })}
                </Select>

                <p></p>
                <b>Buổi học: </b>   <Select
                    style={{ width: 200 }}
                    onChange={(value) => handleSearch(value, "bh")}
                    value={buoiHoc}
                    optionFilterProp="children"
                    mode="multiple"
                >
                    {lichHocOptions.map(item => {
                        return <Option value={item.value}>{item.label}</Option>
                    })}
                </Select>


            </div>
            <div className='col-9'>
                <CardLopHoc danhSachLop={dataMain} dsChiNhanh={dsChiNhanh} dsNguoiDung={dsNguoiDung} dsMentor={dsMentorCreate} />
            </div>


        </div>
    )
}
