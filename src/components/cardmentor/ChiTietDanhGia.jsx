import React from 'react';
import { Table, Tag, Rate, Tooltip } from 'antd';
import { useSelector } from 'react-redux';

export const ChiTietDanhGia = (props) => {

    const { danhGiaTheoMentor, danhMucDanhGia } = props;

    const danhSachLop = useSelector(state => state.lopHocReducer.danhSachLop);
    const dsNguoiDung = useSelector(state => state.userReducer.dsNguoiDung);

    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const columns = [

        {
            title: 'Người đánh giá',
            key: 'nguoidanhgia',
            render: (_, record) => {
                let nguoiDung = dsNguoiDung.find(n => n.id == record.maNguoiDanhGia);
                let lopHoc = danhSachLop.find(n => n.id == record.maLop);
                let noiDung = record.noiDung ? JSON.parse(record.noiDung) : [];

                if (nguoiDung)
                    return <span>
                        {nguoiDung.hoTen} {nguoiDung.maNhomQuyen == "GIANGVIEN" && <Tag color='blue'>Giảng viên</Tag>}
                        <p >
                            <Tag color='pink'>{lopHoc.tenLopHoc}</Tag>
                        </p>
                        <b> Điểm tốt:{noiDung.filter(n => n >= 3).length}</b>
                        <br />
                        <b> Điểm xấu:{noiDung.filter(n => n > 0 && n < 3).length}</b>
                        <br />
                        <b> Chưa có:{noiDung.filter(n => n == 0).length}</b>
                        <br />
                        {noiDung[0] && noiDung[0] != 0 && noiDung[0] != "" ?
                            <Tooltip title={noiDung[0]}  trigger="click" color='green'>
                                <button className='btn btn-primary btn-sm'>Nhận xét</button>
                            </Tooltip>
                            : ""
                        }
                    </span>
            },
        },

        {
            title: 'Thông tin',
            key: 'thongtin',
            render: (_, record) => {
                let noiDung = record.noiDung ? JSON.parse(record.noiDung) : [];
                let index = 0;

                return <table>
                    {danhMucDanhGia.map(item => {
                        index++;
                        return <tr>
                            <td>{item}</td>
                            <td><Rate tooltips={desc} value={noiDung[index]} />
                                {noiDung[index] ? <span className="ant-rate-text">{desc[noiDung[index] - 1]}</span> : ''}
                            </td>
                        </tr>
                    })
                    }
                </table>

            },
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={danhGiaTheoMentor.sort((a, b) => b.maLop - a.maLop)} />

        </div>
    )
}
