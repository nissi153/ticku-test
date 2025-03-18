import { Routes, Route } from "react-router-dom";

import StartPage from "../pages/startPage/StartPage";
import MainPage from "../pages/mainPage/MainPage";
import PortfolioMainPage from "../pages/portfolioPages/PortfolioMainPage";
import InformationPage from "../pages/informationPages/InformationPage";
import PostListPage from "../pages/communityPages/PostListPage";
import MyPage from "../pages/myPage/MyPage";
import StockCalenPage from "../pages/stockCalendarPages/StockCalenPage";
import TickoPage from "../pages/tickoPages/TickoPage";

export default function BottomNavBarRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />}></Route>
      <Route path="/main" element={<MainPage />}></Route>
      <Route path="/portmn" element={<PortfolioMainPage />}></Route>
      <Route path="/information/*" element={<InformationPage />}></Route>
      <Route path="/communityposts" element={<PostListPage />}></Route>
      <Route path="/mypage" element={<MyPage />}></Route>
      <Route path="/calen" element={<StockCalenPage />}></Route>
      <Route path="/ticko" element={<TickoPage />}></Route>
    </Routes>
  );
}
