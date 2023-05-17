import "./App.css";
import "antd/dist/antd.css";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./utils/history";
import Layout from "./templates/users/Layout";
import TrangChu from "./pages/trangchu/TrangChu";
import NotFound from "./pages/NotFound";
import LopHoc from "./pages/lophoc/LopHoc";
import { Loading } from "./hoc/loading/Loading";
import DanhGiaMentorV2 from "./pages/danh-gia-mentor/DanhGiaMentorV2";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/h" element={<TrangChu role="ANY" />} />
            <Route path="/lophoc" element={<LopHoc role="R_LOP" />} />
            <Route path="/lophoc/:token" element={<LopHoc role="R_LOP" />} />
            <Route path="/not" element={<NotFound role="C_LOP" />} />
            <Route path="/danh-gia-mentor" element={<DanhGiaMentorV2 role="R_LOP" />} />
            
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Loading />
      </HistoryRouter>
    </div>
  );
}

export default App;
