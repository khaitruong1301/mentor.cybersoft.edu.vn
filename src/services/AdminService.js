import { BaseApi } from './BaseService';

const API_URL = "/api/quyen"; 

const layQuyenUserService = () => {
    return BaseApi.get(`/api/quyen/lay-quyen-user`);
}

const layNhomQuyenService = () =>{
    return BaseApi.get(`/api/NhomQuyen`);
}

const layDanhMucDanhGiaService = () =>{
    return BaseApi.get(`/api/danhgiamentor/lay-muc-danh-gia`);
}
const layDanhSachDanhGiaService = () =>{
    return BaseApi.get(`/api/danhgiamentor`);
}

const layDanhSachDanhGiaCrmService = () => {
    return BaseApi.get(`/api/danhgiamentor/lay-danh-gia-mentor-crm`);
}

const layDanhSachDanhGiaCrmTheoThangService = (model) => {
    return BaseApi.post(`/api/danhgiamentor/lay-danh-gia-mentor-crm-theo-thang`, model);
}

const themNhacNhoMentorService = (model) => {
    return BaseApi.post(`/api/quan-ly-mentor/them-nhac-nho-mentor`, model);
}

const layDanhSachMentorChuaChamBaiService = () => {
    return BaseApi.get(`/api/quan-ly-mentor/lay-tat-ca-mentor-chua-cham`);
}





export const AdminService = {
    layQuyenUserService,
    layNhomQuyenService,
    layDanhMucDanhGiaService,
    layDanhSachDanhGiaService,
    layDanhSachDanhGiaCrmService,
    layDanhSachMentorChuaChamBaiService,
    layDanhSachDanhGiaCrmTheoThangService,
    themNhacNhoMentorService
}