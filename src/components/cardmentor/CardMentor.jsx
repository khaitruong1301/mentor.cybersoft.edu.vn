import React, { useState } from 'react'
import { Input, Tag, Tooltip, Drawer } from 'antd';
import { DateFormat } from '../../utils/DateFormat';
import { layTenBuoi } from '../../utils/SelectOption';
import { useSelector } from 'react-redux';
import { ListXepHangDanhGia } from '../../utils/ListChuaCham';
import { ChiTietDanhGia } from './ChiTietDanhGia';

const { Search } = Input;

const lopToiDa = 4;
export const CardMentor = (props) => {

    let { dsMentor, dsKhachHang, dsLop, mentorTrong } = props;

    const [openDrawer, setOpenDrawer] = useState(false);
    const [danhGiaTheoMentor, setDanhGiaTheoMentor] = useState([]);

    const danhMucDanhGia = useSelector(state => state.danhGiaMentorReducer.danhMucDanhGia);
    const danhSachDanhGia = useSelector(state => state.danhGiaMentorReducer.danhSachDanhGia);
    const listDanhGia = ListXepHangDanhGia(danhSachDanhGia);

    const showDrawer = (mentorId) => {
        let danhSachDanhGiaTheoMentor = danhSachDanhGia.filter(n => n.mentorId == mentorId);
        setDanhGiaTheoMentor(danhSachDanhGiaTheoMentor)
        setOpenDrawer(true);
    };

    const onClose = () => {
        setOpenDrawer(false);
    };




    const groupLopMentor = (mentorId) => {

        let dataLop = [];
        dsLop.map(item => {
            if (item.danhSachMentor.find(n => n == mentorId)) {
                dataLop.push(item);
            }
        })
        return dataLop;
    }

    return (
        <div className='row overflow-auto bg-light' style={{ height: "100vh" }}>
            {dsMentor.map(item => {

                let khachHang = dsKhachHang?.filter(n => n.thongTinKH.email == item.email);
                let lstLopMentor = groupLopMentor(item.id);
                if (mentorTrong == true && lstLopMentor.length >= lopToiDa) {
                    return;
                }

                let danhGia = listDanhGia.find(n => n.mentorId == item.id);

                return <div className="col-lg-6  col-xl-3">
                    <div className={`card mt-2  ${danhGia && danhGia.top && 'rainbow'}`}>
                        <div className="card-header font-weight-bold">
                            {<>
                                {/* <button className='btn btn-sm btn-success'><i className='fa fa-pencil'></i></button> */}
                                {item.hoTen} {danhGia && danhGia.top && <Tag color='red'>TOP {danhGia.top}</Tag>} <br />

                                {khachHang[0]?.linkFacebook ? <a href={khachHang[0]?.linkFacebook} target="_blank"> <Tag color="blue" >Facebook</Tag></a> : <Tag>Ch??a c?? face</Tag>}
                            </>}
                        </div>
                        <div className="card-body">
                            <Tooltip color="blue" title={
                                lstLopMentor.map(itemLop => {
                                    const thoiKhoaBieu = itemLop.thoiKhoaBieu ? JSON.parse(itemLop.thoiKhoaBieu) : [];
                                    return <Tag className='mb-2' color='volcano'>{itemLop.tenLopHoc} {thoiKhoaBieu.map(itemTKB => `, ${layTenBuoi(itemTKB)}`)}
                                        <br />
                                        (end: {DateFormat(itemLop.ngayKetThuc)})</Tag>
                                })
                            } >
                                <Tag color="blue">L???p mentor: {lstLopMentor.length}/{lopToiDa} <i className='fa fa-eye'></i> </Tag>
                            </Tooltip>
                            <p></p>
                            <Tooltip  placement="bottom" title="T???ng ??i???m v?? s??? l?????ng l?????t ????nh gi??. Ch??? c???ng ??i???m ????nh gi?? kh?? tr??? l??n (4 v?? 5 ??i???m).">
                                <Tag color='magenta'> {danhGia ? <a onClick={() => showDrawer(item.id)}> {danhGia.tongDiem} ??i???m / {danhGia.soLuong} l?????t  ????nh gi?? </a> : `Ch??a c?? ????nh gi??`} </Tag>
                            </Tooltip>
                        </div>
                    </div>
                </div>


            })}

            <Drawer size="large" title="Chi ti???t ????nh gi??" placement="right" onClose={onClose} open={openDrawer}>
                <ChiTietDanhGia danhMucDanhGia={danhMucDanhGia} danhGiaTheoMentor={danhGiaTheoMentor}/>
            </Drawer>
        </div >
    )


}
