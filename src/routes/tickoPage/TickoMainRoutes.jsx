import { Routes, Route } from "react-router-dom";

import BasicWordPage from "../../pages/tickoPages/tickoMenuPages/BasicWordPage";
import BasicChartPage from "../../pages/tickoPages/tickoMenuPages/BasicChartPage";
import BasicAccountPage from "../../pages/tickoPages/tickoMenuPages/BasicAccountPage";
import Explain from "../../components/tickoPage/tickoPage/Explain";

export default function TickoMainRoutes() {
  return (
    <Routes>
      {/* 주식 기초 지식 설명 페이지 */}
      <Route path="/ticko/basic" element={<BasicWordPage />}></Route>
      {/* 차트 설명 페이지 */}
      <Route path="/ticko/chart" element={<BasicChartPage />}></Route>
      {/* 계좌 설명 페이지 */}
      <Route path="/ticko/account" element={<BasicAccountPage />}></Route>
      {/* 세부 설명 페이지 */}
      <Route path="/ticko/:menu/:title" element={<Explain />}></Route>
    </Routes>
  );
}
