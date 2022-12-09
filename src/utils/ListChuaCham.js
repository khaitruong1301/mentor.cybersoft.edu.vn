import { tinhKhoangCachHaiNgay } from "./DateFormat";


export const ListChuaCham = (dsBaiTapDaCham) => {

    let danhSachBaiTapChuaCham = [];

    const hanChamBai = 8;
    if (dsBaiTapDaCham != null)

        dsBaiTapDaCham.map(itemDaCham => {
            let ngayHeThong = new Date(itemDaCham.ngayHeThong);
          
            const { danhSachBuoiHocNew } = itemDaCham.lopHoc;
            const danhSachBuoiHoc = danhSachBuoiHocNew.length > 0 && danhSachBuoiHocNew != "" ? JSON.parse(danhSachBuoiHocNew) : [];

            const danhSachHocVien = itemDaCham.lopHoc.danhSachHocVien ? JSON.parse(itemDaCham.lopHoc.danhSachHocVien) : [];
            const danhSachMentor = itemDaCham.lopHoc.danhSachHocVien ? JSON.parse(itemDaCham.lopHoc.danhSachMentor) : [];

            const danhSachBaiTap = [];
            danhSachBuoiHoc.map(item => {

                danhSachBaiTap.push(...item.BaiTap.danhSachBaiHoc, ...item.Capstone.danhSachBaiHoc);

            })

            let { lstBaiTapNop } = itemDaCham;
            let lstBaiChuaCham = [];
            danhSachBaiTap.map(item => {
                let tongBaiNop = lstBaiTapNop.filter(n => n.maBaiHoc == item.Id);


                //loc cac hoc vien da nghi hoc nhung co nop bai
                tongBaiNop = tongBaiNop.filter(item => {

                    if (danhSachHocVien.findIndex(n => n == item.maNguoiDung) != -1)
                        return item;
                })

                let ngayHetHan = new Date(item.NgayHetHan);
                let soNgayCham = hanChamBai - tinhKhoangCachHaiNgay(ngayHeThong, ngayHetHan);

                if (ngayHeThong > ngayHetHan && soNgayCham <= 0) {

                    //loc bai tap chua cham 
                    let lstChuaCham = tongBaiNop.filter(n => n.diem == -1);

                    if (lstChuaCham.length > 0) {

                        //loc mentor cham bai chinh
                        let lstMentorChinh = [];
                        danhSachMentor.map(itemMentor => {
                            let demDaCham = tongBaiNop.filter(n => n.nguoiCham == itemMentor);
                            lstMentorChinh.push({ mentorId: itemMentor, soLuongDaCham: demDaCham.length });
                        })


                        //add class chua cham
                        lstBaiChuaCham.push({
                            ...item,
                            tongBaiNop: tongBaiNop.length,
                            chuaCham: lstChuaCham.length,
                            lstMentorChinh
                        });
                    }
                }
            })

            //them list chua cham và noi dung lop
            if (lstBaiChuaCham.length > 0)
                danhSachBaiTapChuaCham.push({
                    tenLopHoc: itemDaCham.lopHoc.tenLopHoc,
                    lstBaiChuaCham
                })
        });
    return danhSachBaiTapChuaCham;

}