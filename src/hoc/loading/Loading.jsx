import React from 'react'
import './loading.css';

export const Loading = () => {
    return (
        <div hidden className="div_loading" style={{ textAlign: "center", position: "fixed", top: 0, left: 0, zIndex: 9999, width: "100%", height: "100%", display: "flex", justifyContent: "center", backgroundColor: "rgba(0,0,0,.2)", flexWrap: "wrap" }}>

        <div className="loader" aria-hidden="true">
            <div className="loader__sq"></div>
            <div className="loader__sq"></div>

        </div>

        <div className="loader_text">Đang kiểm tra thông tin load dữ liệu...</div>
    </div>
    )
}

// var div_loading = document.getElementsByClassName("div_loading");
// div_loading[0].removeAttribute("hidden", "");
// div_loading[0].setAttribute("hidden", "");

