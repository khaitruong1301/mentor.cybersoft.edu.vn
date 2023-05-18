import { BaseApi } from './BaseService';

const API_URL = "/api/nguoidung";

const layDanhSachNguoiDungService = () => {
    return BaseApi.get(API_URL);
}
const checkPassService = (model) => {

    return BaseApi.post(API_URL + "/check-pass", model);
}


const layDanhSachKhachHangService = () => {
    return BaseApi.get(`/api/khachhang`);
}

export const NguoiDungService = {
    layDanhSachNguoiDungService,
    checkPassService,
    layDanhSachKhachHangService
}