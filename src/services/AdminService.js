import { BaseApi } from './BaseService';

const API_URL = "/api/quyen"; 

const layQuyenUserService = () => {
    return BaseApi.get(`/api/quyen/lay-quyen-user`);
}

const layNhomQuyenService = () =>{
    return BaseApi.get(`/api/NhomQuyen`);
}

export const AdminService = {
    layQuyenUserService,
    layNhomQuyenService
}