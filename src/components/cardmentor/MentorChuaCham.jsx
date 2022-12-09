import React from 'react';
import { Empty, Tooltip, Tag, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { DateFormat } from '../../utils/DateFormat';
import { ListChuaCham } from '../../utils/ListChuaCham';

export const MentorChuaCham = (props) => {
    let { dsMentorCreate, dsKhachHang } = props;

    const dsBaiTapDaCham = useSelector(state => state.lopHocReducer.dsBaiTapDaCham);

    let listChuaCham = ListChuaCham(dsBaiTapDaCham);

    let listMentor = null;

    // loc lai thong tin
    if (listChuaCham && listChuaCham.length > 0) {
        listMentor = [];
        //lop
        listChuaCham.map(item => {

            //list chua cham co ten bai tap
            item.lstBaiChuaCham.map(itemBaiTap => {

                //danh mentor
                itemBaiTap.lstMentorChinh.map(itemMentor => {
                    let nguoiDung = dsMentorCreate.find(n => n.id == itemMentor.mentorId);

                    let khachHang = dsKhachHang?.filter(n => n.thongTinKH.email == nguoiDung?.email);

                    let checkTonTai = listMentor && listMentor.find(n => n.id == itemMentor.mentorId);

                    let trungBinhBaiCham = 0;
                    if (itemBaiTap.tongBaiNop > 0) {
                        //kiem tra so luong can cham: daCham >= Math.ceil(tongBaiNop / soLuongMentor); => lam tron len
                        trungBinhBaiCham = Math.ceil(itemBaiTap.tongBaiNop / itemBaiTap.lstMentorChinh.length);

                    }

                    if (trungBinhBaiCham > itemMentor.soLuongDaCham) {
                        if (checkTonTai) {

                            checkTonTai.listChuaCham = [...checkTonTai.listChuaCham, { tieuDe: itemBaiTap.TieuDe, chuaCham: itemBaiTap.chuaCham, tenLopHoc: item.tenLopHoc, }];

                        } else {


                            listMentor.push({
                                id: nguoiDung ? nguoiDung.id : itemMentor.mentorId,
                                hoTen: nguoiDung ? nguoiDung.hoTen : itemMentor.mentorId +" (xóa quyền)",
                                linkFacebook: khachHang[0] ? khachHang[0].linkFacebook : null,
                                listChuaCham: [{ tieuDe: itemBaiTap.TieuDe, chuaCham: itemBaiTap.chuaCham, tenLopHoc: item.tenLopHoc, }]
                            })
                        }
                    }



                })
            })

        })
    }


    if (listMentor)
        return (
            <div className='row overflow-auto bg-light' style={{ height: "100vh" }}>
                {listMentor.length > 0 ? listMentor.map(item => {

                    return <div class="col-sm-3 ">
                        <div class="card mt-2 ">
                            <div class="card-header font-weight-bold">
                                {<>
                                    {item.hoTen}  <br />
                                    {item.linkFacebook != null ? <a href={item.linkFacebook} target="_blank"> <Tag color="blue" >Facebook</Tag></a> : <Tag>Chưa có face</Tag>}
                                </>}
                            </div>
                            <div class="card-body">
                                {
                                    item.listChuaCham.map(itemChuaCham => {
                                        return <>
                                            <Tag color='red' >
                                                {itemChuaCham.tieuDe} <br />
                                                {itemChuaCham.tenLopHoc} <br />
                                                Tổng chưa chấm: {itemChuaCham.chuaCham}
                                            </Tag>
                                            <p></p>
                                        </>
                                    })
                                }
                                <Tag color='magenta'>Đánh giá: 0/0</Tag>
                            </div>
                        </div>
                    </div>


                })
                    :
                    <Empty />
                }
            </div >
        )
    else
        return (<Skeleton active />)
}
