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

    return (<div className='row overflow-auto bg-secondary' style={{ height: 500 }}>
        {danhSachLop.map(lopHoc => {

            let chiNhanh = dsChiNhanh.find(n => n.id == lopHoc.chiNhanh);
            return <div class="col-sm-3 ">
                <div class="card mt-2">
                    <div class="card-header font-weight-bold">{lopHoc.tenLopHoc}</div>
                    <div class="card-body">
                        <table>
                            <tr>
                                <td>
                                    <Tag color='blue'>Bắt đầu: {DateFormat(lopHoc.ngayBatDau)}</Tag>
                                    <p></p>
                                    <Tag color='red'>Kết thúc: {DateFormat(lopHoc.ngayKetThuc)}</Tag>
                                </td>
                                <td>
                                    {lopHoc.thoiKhoaBieu ? JSON.parse(lopHoc.thoiKhoaBieu).map((item, index) => {
                                        return <Tag color="purple" key={index}>{layTenBuoi(item)}</Tag>
                                    }) : null}
                                    <p></p>
                                    <Tag color='green'>{chiNhanh ? chiNhanh.tenChiNhanh : "Chưa có"}</Tag>
                                    {ClassStatusSwitch(lopHoc.maTrangThai)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {lopHoc.danhSachMentor ? lopHoc.danhSachMentor.map((item, index) => {
                                        let nguoiDung = dsNguoiDung.find(n => n.id == item);
                                        return <Tag >{nguoiDung?.hoTen}</Tag>
                                    }) : null}

                                    <a onClick={() => showDrawer(lopHoc)}><Tag color='#108ee9'>+ Thêm mentor</Tag></a>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>

        }

        )}
        <Drawer size="large" title="Basic Drawer" placement="right" onClose={onClose} open={openDrawer}>
            <ClassForm lopHoc={lopHoc}  dsMentor={dsMentor} dsChiNhanh={dsChiNhanh} onClose={onClose}/>
        </Drawer>
    </div >

    )


}
