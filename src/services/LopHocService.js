import { BaseApi } from './BaseService';

const API_URL = "/api/lophoc";

const layDanhSachLopService = () => {
    return BaseApi.get(API_URL + "/lay-danh-sach-lop-and-check-road-map");
}
const layDanhSachChiNhanhService = () => {
    return BaseApi.get(`/api/chinhanh`);
}

const capNhatLopHocService = (model) => {
    return BaseApi.put(`${API_URL}/${model.id}`, model);
}

export const LopHocService = {
    layDanhSachLopService,
    layDanhSachChiNhanhService,
    capNhatLopHocService
}