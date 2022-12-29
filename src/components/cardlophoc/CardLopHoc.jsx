import React, { useState } from 'react'
import { Card, Tag, Drawer } from 'antd';
import { DateFormat } from '../../utils/DateFormat';
import { layTenBuoi, ClassStatusSwitch } from '../../utils/SelectOption';
import { ClassForm } from './ClassForm';

export const CardLopHoc = (props) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [lopHoc, setLopHoc] = useState({});

    const showDrawer = (lopHoc) => {
        setLopHoc(lopHoc);
        setOpenDrawer(true);
    };

    const onClose = () => {
        setOpenDrawer(false);
    };

    let { danhSachLop, dsChiNhanh, dsNguoiDung, dsMentor } = props;

    return (<div className='row overflow-auto bg-secondary' style={{ height: "100vh" }}>
        {danhSachLop.map(lopHoc => {

            let chiNhanh = dsChiNhanh.find(n => n.id == lopHoc.chiNhanh);
            return <div class="col-lg-6  col-xl-3">
                <div class="card mt-2">
                    <div class="card-header font-weight-bold">{lopHoc.tenLopHoc}</div>
                    <div class="card-body row">
                        <div className="col-6">
                            <Tag color='blue'>Bắt đầu: {DateFormat(lopHoc.ngayBatDau)}</Tag>
                            <p></p>
                            <Tag color='red'>Kết thúc: {DateFormat(lopHoc.ngayKetThuc)}</Tag>
                        </div>
                        <div className="col-6">
                            {lopHoc.thoiKhoaBieu ? JSON.parse(lopHoc.thoiKhoaBieu).map((item, index) => {
                                return <Tag color="purple" key={index}>{layTenBuoi(item)}</Tag>
                            }) : null}
                            <p></p>
                            <Tag color='green'>{chiNhanh ? chiNhanh.tenChiNhanh : "Chưa có"}</Tag>
                            {ClassStatusSwitch(lopHoc.maTrangThai)}
                        </div>
                        <div className=" col-6">
                            {lopHoc.danhSachMentor ? lopHoc.danhSachMentor.map((item, index) => {
                                let nguoiDung = dsNguoiDung.find(n => n.id == item);
                                return <Tag >{nguoiDung?.hoTen}</Tag>
                            }) : null}

                            <a onClick={() => showDrawer(lopHoc)}><Tag color='#108ee9'>+ Thêm mentor</Tag></a>
                        </div>

                    </div>
                </div>
            </div>

        }

        )}
        <Drawer size="large" title="Basic Drawer" placement="right" onClose={onClose} open={openDrawer}>
            <ClassForm lopHoc={lopHoc} dsMentor={dsMentor} dsChiNhanh={dsChiNhanh} onClose={onClose} />
        </Drawer>
    </div >

    )


}
