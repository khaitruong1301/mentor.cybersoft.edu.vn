import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { DateFormat } from '../../utils/DateFormat';
import { layTenBuoi, ClassStatusSwitch } from '../../utils/SelectOption';
import { message, Select } from 'antd';
import { LopHocService } from '../../services/LopHocService';
import { callApiLopHoc } from '../../redux/reducers/lopHocReducer';

export const ClassForm = (props) => {
    const { lopHoc, dsMentor, dsChiNhanh, onClose } = props;
    const [lopHocModel, setLopHocModel] = useState(lopHoc);
    const dispatch = useDispatch();

    let chiNhanh = dsChiNhanh.find(n => n.id == lopHoc.chiNhanh);

    const dropMentor = [];
    dsMentor.map(item => {
        dropMentor.push({
            label: item.hoTen,
            value: item.id,
        });
    })

    useEffect(() => {
        let dataTam = { ...lopHoc, mentorVuotMuc: JSON.parse(lopHoc.mentorVuotMuc) };

        setLopHocModel(dataTam);
    }, [lopHoc])


    const handleChange = (value, id) => {
        const lopHocChange = { ...lopHocModel };

        lopHocChange[id] = value;

        setLopHocModel(lopHocChange)
    }

    const saveData = () => {


        const temp = {
            ...lopHocModel,
            mentorVuotMuc: JSON.stringify(lopHocModel.mentorVuotMuc),
            ngayBatDau: DateFormat(lopHocModel.ngayBatDau),
            ngayKetThuc: DateFormat(lopHocModel.ngayKetThuc)

        }
        LopHocService.capNhatLopHocService(temp).then(res => {

            message.success("Cập nhật thành công !");
            onClose();
            dispatch(callApiLopHoc());
        }).catch(err => {
            console.log(err)
            message.error("Đã xãy ra lỗi ! Báo IT")
        }
        );

    }

    return (
        <>
            <div className='row'>

                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Tên lớp học: </label>
                    <p><b>{lopHoc.tenLopHoc}</b></p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Trạng thái: </label>
                    <p><b> {ClassStatusSwitch(lopHoc.maTrangThai)}</b></p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Lịch học: </label>
                    <p> {lopHoc.thoiKhoaBieu ? JSON.parse(lopHoc.thoiKhoaBieu).map((item, index) => {
                        return layTenBuoi(item)
                    }) : null}</p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Chi nhánh: </label>
                    <p><b>{chiNhanh ? chiNhanh.tenChiNhanh : "Chưa có"}</b></p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Ngày khai giảng: </label>
                    <p><b>{DateFormat(lopHoc.ngayBatDau)}</b></p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Ngày kết thúc: </label>
                    <p><b>{DateFormat(lopHoc.ngayKetThuc)}</b></p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Giảng viên: </label>
                    <p>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Chọn giảng viên"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }

                            value={lopHocModel.danhSachGiangVien}
                            onChange={(value) => handleChange(value, "danhSachGiangVien")}
                            options={dropMentor}
                        />
                    </p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Mentor chính: </label>
                    <p>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Chọn mentor"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }

                            value={lopHocModel.danhSachMentor}
                            onChange={(value) => handleChange(value, "danhSachMentor")}
                            options={dropMentor}
                        />
                    </p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Mentor phụ: </label>
                    <p>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Chọn mentor"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }

                            value={lopHocModel.mentorVuotMuc}
                            onChange={(value) => handleChange(value, "mentorVuotMuc")}
                            options={dropMentor}
                        />
                    </p>
                </div>
            </div>
            <button className="btn btn-primary" onClick={saveData}>Cập nhật</button>
        </>


    )
}
