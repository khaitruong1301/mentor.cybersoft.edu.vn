import { Tag } from 'antd';
import { dinhDangNgayCheck } from './DateFormat';

export function ClassStatusSwitch(value) {
    switch (value) {
        case 1:
            return <Tag color="#2db7f5">Sắp mở</Tag>
        case 2:
            return <Tag color="#87d068">Đang mở</Tag>
        case 3:
            return <Tag color="#f50">Kết thúc</Tag>
        default:
            return null;
    }
}

export const diemTiemNangOptions = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 90, label: '90%' },
]

export const mucTieuOptions = [
    { value: 'FrontEnd', label: 'FrontEnd' },
    { value: 'BackEnd', label: 'BackEnd' },
    { value: 'FullStack', label: 'FullStack' },
    { value: 'English', label: 'English' },
    { value: 'FullStack_English', label: 'FullStack + English' },
    { value: 'Data_Science', label: 'Data Science' },

]

export const trangThaiKHOptions = [
    { value: 0, label: 'Lưu trữ' },
    { value: 1, label: 'Bảo Lưu' },
    { value: 3, label: 'Thu tiền' },
    { value: 4, label: 'Không học' }

]

export const nguonGioiThieuOptions = [
    { value: 'FACEBOOK', label: 'Facebook' },
    { value: 'FORM', label: 'Form' },
    { value: 'HOTLINE', label: 'Hot line' },
    { value: 'ZALO', label: 'Zalo' },
    { value: 'BANBE', label: 'Bạn bè' },
    { value: 'GOOGLE', label: 'Google' },
    { value: 'TOIDICODEDAO', label: 'Tôi đi code dạo' },
    { value: 'KHAC', label: 'Khác' }
]

export const trangThaiLopHocOptions = [
    // { value: 1, label: 'Sắp mở' },
    { value: 2, label: 'Đang mở' },
    { value: 3, label: 'Kết thúc' },
]

export const kichHoatOptions = [
    { value: false, label: 'Chưa mở' },
    { value: true, label: 'Mở sẵn' }
]

export const lichHocOptions = [
    { value: 1, label: 'Tối thứ 2' },
    { value: 2, label: 'Tối thứ 3' },
    { value: 3, label: 'Tối thứ 4' },
    { value: 4, label: 'Tối thứ 5' },
    { value: 5, label: 'Tối thứ 6' },
    { value: 6, label: 'Tối thứ 7' },

    { value: 7, label: 'Sáng thứ 2' },
    { value: 8, label: 'Sáng thứ 3' },
    { value: 9, label: 'Sáng thứ 4' },
    { value: 10, label: 'Sáng thứ 5' },
    { value: 11, label: 'Sáng thứ 6' },
    { value: 12, label: 'Sáng thứ 7' },
    { value: 13, label: 'Sáng CN' },

    { value: 14, label: 'Chiều thứ 2' },
    { value: 15, label: 'Chiều thứ 3' },
    { value: 16, label: 'Chiều thứ 4' },
    { value: 17, label: 'Chiều thứ 5' },
    { value: 18, label: 'Chiều thứ 6' },
    { value: 19, label: 'Chiều thứ 7' },
    { value: 20, label: 'Chiều CN' }
]

export const layTenBuoi = (idBuoi) => {
    switch (idBuoi) {
        case 1: return "Tối thứ 2";

        case 2: return "Tối thứ 3";

        case 3: return "Tối thứ 4";

        case 4: return "Tối thứ 5";

        case 5: return "Tối thứ 6";

        case 6: return "Tối thứ 7";

        //sang 
        case 7: return "Sáng thứ 2";

        case 8: return "Sáng thứ 3";

        case 9: return "Sáng thứ 4";

        case 10: return "Sáng thứ 5";

        case 11: return "Sáng thứ 6";

        case 12: return "Sáng thứ 7";

        case 13: return "Sáng CN";

        //chieu
        case 14: return "Chiều thứ 2";

        case 15: return "Chiều thứ 3";

        case 16: return "Chiều thứ 4";

        case 17: return "Chiều thứ 5";

        case 18: return "Chiều thứ 6";

        case 19: return "Chiều thứ 7";

        case 20: return "Chiều CN";

        default: return "";

    }
}

export const layTrangThaiKH = (maTrangThai) => {
    switch (maTrangThai) {
        case 0: return "Lưu trữ";

        case 1: return "Bảo Lưu";

        case 3: return "Thu tiền";

        case 4: return "Không học";


        default: return "";

    }
}

export const khoaHocOptions = [
    { value: 0, label: 'Bootcamp' },
    { value: 1, label: 'Front End' },
    { value: 2, label: 'Back End' },
    { value: 3, label: 'NodeJS' },
    { value: 4, label: 'React native' },
    { value: 5, label: 'Online Tư duy' },
    { value: 6, label: 'Online React Foundation' },
    { value: 7, label: 'Online React Master' },
    { value: 8, label: 'Online NodeJS' },
    { value: 9, label: 'Data Science' },
]

export const hinhThucThuTienOptions = [
    { value: 0, label: 'Chưa đóng' },
    { value: 1, label: 'Chuyển khoản' },
    { value: 2, label: 'Tiền mặt' },
    { value: 3, label: 'MoMo' },
]

export const danhSachLyDo = ['Xe hư', 'nghỉ ốm', 'bận việc']


export const checkQuyenUser = (dsQuyen, quyen) => {

    if (dsQuyen.length != 0) {

        let lstQuyen = [];
        lstQuyen = JSON.parse(dsQuyen);

        let check = lstQuyen.findIndex(n => n == quyen);
        if (check != -1)
            return true;
        else
            return false;
    }

}


export const soLuongHocVienVang = (dsLop, dsDiemDanh, dsGhiChu) => {
    let soLuongVang = 0;
    let nameVang = [];
    let dNow = new Date();
    let lstLop = dsLop.filter(n => n.maTrangThai == 2 && new Date(dinhDangNgayCheck(n.ngayBatDau)) <= new Date(dNow));

    lstLop.map(itemLop => {
        let lstGhiChu = dsGhiChu.filter(n => n.maLop == itemLop.id);
        let lstDiemDanh = dsDiemDanh.filter(n => n.maLopHoc == itemLop.id).sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao))

        let lstHaveDiemDanh = [];

        lstDiemDanh.slice(0, 2).map(item => {
            let danhSachHocVien = JSON.parse(item.danhSachHocVien);

            danhSachHocVien.map(itemHV => {

                if (!lstHaveDiemDanh.find(n => n == itemHV)) {
                    lstHaveDiemDanh.push(itemHV);

                }

            })

        });

        itemLop.danhSachHocVien.map(item => {

            if (!lstHaveDiemDanh.find(n => n == item)) {
                let ghiChuUser = lstGhiChu.find(n => n.maNguoiDung == item);

                if (!ghiChuUser || ghiChuUser?.xuLyVang == false)
                    soLuongVang++;
            }
        })
    })

    return soLuongVang;

}