import React from 'react'
import { Input, Tag, Tooltip } from 'antd';
import { DateFormat } from '../../utils/DateFormat';

const { Search } = Input;

const lopToiDa = 4;
export const CardMentor = (props) => {

    let { dsMentor, dsKhachHang, dsLop, mentorTrong } = props;

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

                return <div class="col-sm-3 ">
                    <div class="card mt-2 ">
                        <div class="card-header font-weight-bold">
                            {<>
                                {item.hoTen}  <button className='btn btn-sm btn-success'><i className='fa fa-pencil'></i></button><br />

                                {khachHang[0]?.linkFacebook ? <a href={khachHang[0]?.linkFacebook} target="_blank"> <Tag color="blue" >Facebook</Tag></a> : <Tag>Chưa có face</Tag>}
                            </>}
                        </div>
                        <div class="card-body">
                            <Tooltip color="blue" title={
                                lstLopMentor.map(itemLop => <Tag className='mb-2' color='volcano'>{itemLop.tenLopHoc} (end: {DateFormat(itemLop.ngayKetThuc)})</Tag>)
                            } >
                                <Tag color="blue">Lớp mentor: {lstLopMentor.length}/{lopToiDa} (view) </Tag>
                            </Tooltip>
                            <p></p>
                            <Tag color='magenta'>Đánh giá: 0/0</Tag>
                        </div>
                    </div>
                </div>


            })}
        </div >
    )


}
