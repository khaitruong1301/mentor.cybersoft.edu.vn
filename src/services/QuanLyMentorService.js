import { BaseApi } from './BaseService';

const API_URL = "/api/quan-ly-mentor"; 

const layToanBoDanhSachMentorChiNhanh = () => {
    return BaseApi.get(`${API_URL}/lay-toan-bo-danh-sach-mentor-chi-nhanh`);
}







export const QuanLyMentorService = {
    layToanBoDanhSachMentorChiNhanh
}