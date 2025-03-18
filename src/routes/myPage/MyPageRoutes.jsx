import { Routes, Route } from "react-router-dom";

import ScrapNews from "../../components/myPage/ScrapNews";
import FavoriteCompanies from "../../components/myPage/FavoriteCompanies";
import MyPortfolio from "../../components/myPage/MyPortfolio";

function MyPageRoutes() {
  return (
    <Routes>
      <Route path="/mypage/scrapnews" element={<ScrapNews />}></Route>
      <Route path="/mypage/favorites" element={<FavoriteCompanies />}></Route>
      <Route path="/mypage/myportfolio" element={<MyPortfolio />}></Route>
    </Routes>
  );
}

export default MyPageRoutes;
