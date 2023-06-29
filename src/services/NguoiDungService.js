import { BaseApi } from './BaseService';

const API_URL = "/api/nguoidung";

const layDanhSachNguoiDungService = () => {
    return BaseApi.get(API_URL);
}
const checkPassService = (model) => {

    return BaseApi.post(API_URL + "/check-pass", model);
}

const xoaMentorNguoiDungService = (maNguoiDung) => {

    return BaseApi.put(API_URL + "/xoa-mentor-nguoi-dung/"+maNguoiDung);
}



const layDanhSachKhachHangService = () => {
    return BaseApi.get(`/api/khachhang`);
}

export const NguoiDungService = {
    layDanhSachNguoiDungService,
    checkPassService,
    layDanhSachKhachHangService,
    xoaMentorNguoiDungService
}