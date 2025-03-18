import styled from "styled-components";
import { useState } from "react";

import MyPageTable from "../../components/myPage/MyPageTable";
import UserProfile from "../../components/common/UserProfile";
import MyPageModal from "../../components/myPage/MyPageModal";
import BottomNavBar from "../../components/common/bottomNavBars/BottomNavBar";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  margin: 10px 20px 0px 20px;
`;

const Hr = styled.hr`
  height: 11px;
  background-color: #1c2f43a5;
  border: none;
  margin-bottom: 20px;
`;

const Button = styled.button`
  font-size: 16px;
  color: #ffffff;
  background-color: #223243fe;
  border: none;
  border-radius: 10px;
  height: 45px;
  padding: 0px 15px;
`;

function MyPage() {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:5000/user/info/${userId}`);
      const userData = await response.json();

      setUserName(userData.name);
      setUserImage(userData.image);
    } catch (err) {
      console.error("사용자 데이터를 가져오는 데 실패했습니다.", err);
    }
  };

  fetchUserProfile();
  /*useEffect(() => {
    fetchUserProfile();
  }, [userName, userImage]);*/

  return (
    <>
      <Div>
        <UserProfile width="40" height="40" fontsize="28" isMypage={true} />
        <Button onClick={openModal}>회원정보</Button>
      </Div>
      <Hr />
      <MyPageTable
        link="/mypage/scrapnews"
        src="/images/scrapicon.png"
        text="뉴스 스크랩"
      />
      <MyPageTable
        link="/mypage/favorites"
        src="/images/staricon.png"
        text="관심 기업 목록"
      />
      <MyPageTable
        link="/mypage/myportfolio"
        src="/images/portfolioicon.png"
        text="내 포트폴리오"
      />
      <MyPageModal
        isOpen={modalOpen}
        onClose={closeModal}
        userName={userName}
        userImage={userImage}
      />

      <BottomNavBar />
    </>
  );
}
export default MyPage;
