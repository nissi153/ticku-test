import { BrowserRouter } from "react-router-dom";

import BottomNavBarRoutes from "./BottomNavBarRoutes"; // 하단 내브바
import TickoMainRoutes from "./tickoPage/TickoMainRoutes"; // 티코 페이지
import PortfolioPageRoutes from "./portfolioPage/PortfolioRoutes"; // 포트폴리오 페이지
import MyPageRoutes from "./myPage/MyPageRoutes"; // 마이 페이지
import LoginRoutes from "./loginPage/LoginRoutes"; // 로그인 페이지
import JoinRoutes from "./joinPage/JoinRoutes"; // 회원가입 페이지
import CommunityRoutes from "./communityPage/CommunityRoutes"; // 커뮤니티 페이지

export default function TotalRoutes() {
  return (
    <BrowserRouter>
      <BottomNavBarRoutes /> {/* 하단 내브바 */}
      <TickoMainRoutes /> {/* 티코 페이지 */}
      <PortfolioPageRoutes /> {/* 포트폴리오 제작 페이지 */}
      <MyPageRoutes /> {/* 마이 페이지 */}
      <LoginRoutes /> {/* 로그인 페이지 */}
      <JoinRoutes /> {/* 회원 가입 페이지 */}
      <CommunityRoutes /> {/* 커뮤니티 페이지 */}
    </BrowserRouter>
  );
}
