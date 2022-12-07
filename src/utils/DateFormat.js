export function DateFormat(date) {
    const temp = new Date(date);
    const day = temp.getDate() < 10 ? `0${temp.getDate()}` : temp.getDate();
    let month = temp.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const year = temp.getFullYear();
    return `${day}-${month}-${year}`;
}

export function DateTimeFormat(date) {
    const temp = new Date(date);
    const day = temp.getDate() < 10 ? `0${temp.getDate()}` : temp.getDate();
    let month = temp.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const year = temp.getFullYear();
    const hour = temp.getHours() < 10 ? `0${temp.getHours()}` : temp.getHours();
    const minute = temp.getMinutes() < 10 ? `0${temp.getMinutes()}` : temp.getMinutes();
    return `${day}-${month}-${year} ${hour}h${minute}`;
}


export const dinhDangNgay = (inputdate) => {
    var date = new Date(inputdate);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = gg + "/" + mm + "/" + aaaa;



    return cur_day

}

//dinh dang ngay gio de so sanh (MM/DD/YYYY HH:mm)
export const dinhDangNgayGioCheck = (inputdate) => {
    const temp = new Date(inputdate);
    const day = temp.getDate() < 10 ? `0${temp.getDate()}` : temp.getDate();
    let month = temp.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const year = temp.getFullYear();
    const hour = temp.getHours() < 10 ? `0${temp.getHours()}` : temp.getHours();
    const minute = temp.getMinutes() < 10 ? `0${temp.getMinutes()}` : temp.getMinutes();
    return `${month}/${year}/${day} ${hour}:${minute}`;

}

//dinh dang ngay de so sanh (MM/DD/YYYY)
export const dinhDangNgayCheck = (inputdate) => {
    var date = new Date(inputdate);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = mm + "/" + gg + "/" + aaaa;



    return cur_day

}


//dinh dang thang de so sanh (MM/YYYY)
export const dinhDangThangCheck = (inputdate) => {
    var date = new Date(inputdate);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = mm + "/" + aaaa;



    return cur_day

}

//dinh dang nam de so sanh (YYYY)
export const dinhDangNamCheck = (inputdate) => {
    var date = new Date(inputdate);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = aaaa;



    return cur_day

}

//dinh dang ngay de so sanh (YYYY/MM/DD)
export const dinhDangSQLCheck = (inputdate) => {
    var date = new Date(inputdate);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = aaaa + "/" + mm + "/" + gg;



    return cur_day

}

//
export const layDinhDangThu = (input) => {
    switch (input) {
        case 0: return "Chủ nhật";
        case 1: return "Thứ 2";
        case 2: return "Thứ 3";
        case 3: return "Thứ 4";
        case 4: return "Thứ 5";
        case 5: return "Thứ 6";
        case 6: return "Thứ 7";

    }
}

export const convertNgay = (input) => {

    // thu 2
    if (input == 1 || input == 7 || input == 14)
        return 1;
    // thu 3
    if (input == 2 || input == 8 || input == 15)
        return 2;
    // thu 4
    if (input == 3 || input == 9 || input == 16)
        return 3;
    // thu 5
    if (input == 4 || input == 10 || input == 17)
        return 4;
    // thu 6
    if (input == 5 || input == 11 || input == 18)
        return 5;
    // thu 7
    if (input == 6 || input == 12 || input == 19)
        return 6;
    // CN
    if (input == 13 || input == 20)
        return 0;

}

export const locDanhSachNgay = (buoiHoc, ngayBatDau, ngayKetThuc) => {

    let daysOfRange = [];

    for (var d = new Date(ngayBatDau); d <= new Date(ngayKetThuc); d.setDate(d.getDate() + 1)) {
        daysOfRange.push(new Date(d));
    }

    //loc danh sach theo thoi khoa bieu

    daysOfRange.map(item => {
        let d = new Date(item).getDay();

        let check = buoiHoc.find(n => n == d);

        if (check == undefined)
            daysOfRange = daysOfRange.filter(n => n != item);

    })

    return daysOfRange;
}

export const layMonday = (value) => {
    let d = new Date(value);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}


export const rutGonTien = (value) => {

    let tien = value;

    if (tien.length <= 3) {
        return 0;
    }

    if (tien.length <= 6) {
        let chuoiCat = tien.substr(0, tien.length - 3);
        return chuoiCat + "," + tien.substr(chuoiCat.length, tien.length - chuoiCat.length - 1) + " Ng";
    }

    if (tien.length <= 12) {
        let chuoiCat = tien.substr(0, tien.length - 6);
        return chuoiCat + "," + tien.substr(chuoiCat.length, tien.length - chuoiCat.length - 4) + " Tr";

    }

    // if (tien.length <= 12) {
    //     let chuoiCat = tien.substr(0, tien.length - 9);
    //     return chuoiCat + "," + tien.substr(chuoiCat.length, tien.length - chuoiCat.length - 8) + " Tỷ";

    // }

    if (tien.length > 12) {
        return Number(tien).toLocaleString();
    }


}

export const tinhKhoangCachHaiNgay = (date1, date2) => {
    const d = new Date(date1);
    const dN = new Date(date2);
    const diffTime = Math.abs(dN - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

