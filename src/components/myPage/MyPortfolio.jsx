import React, { useState, useEffect } from "react";
import styled from "styled-components";

import BackButton from "../common/BackButton";
import MyPortfolioAccordion from "./MyPortfolioAccordion";

const PageContainer = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 30px;
  margin-left: 10px;
`;
const PageTitle = styled.p`
  font-size: 27px;
  margin: 0;
  padding: 0;
`;

function MyPortfolio() {
  // 각 포트폴리오가 열려 있는지 여부를 관리하는 상태
  const [openPortfolio, setOpenPortfolio] = useState(null);
  const [portfolioList, setPortfolioList] = useState([]);

  const fetchPortfolio = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("사용자 ID가 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/user/myportfolio?userId=${userId}`
      );
      const data = await response.json();
      setPortfolioList(data);
      console.log(data);
    } catch (err) {
      console.error("포트폴리오 데이터를 가져오는 데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // 포트폴리오의 내용을 열거나 닫는 함수
  const handleToggle = (id) => {
    setOpenPortfolio((prev) => (prev === id ? null : id));
  };

  // 핀을 누르면 상태가 업데이트
  const handlePinned = async (id) => {
    console.log("id : " + id);

    setPortfolioList((prevList) =>
      prevList.map(
        (item) =>
          item._id === id
            ? { ...item, isPinned: !item.isPinned } // 클릭한 포트폴리오는 핀을 고정
            : { ...item, isPinned: false } // 나머지는 핀을 해제
      )
    );

    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:5000/user/myportfolio-change`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, userId: userId }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("포트폴리오 데이터를 수정하는 데 실패했습니다.", err);
    }
  };

  // 핀이 선택된 포폴은 맨 위로 고정
  const sortedPorfolist = [
    ...portfolioList.filter((prev) => prev.isPinned),
    ...[...portfolioList].reverse().filter((prev) => !prev.isPinned),
  ];

  return (
    <>
      <PageContainer>
        <BackButton width="40" height="40" link="/mypage" />
        <PageTitle>내 포트폴리오</PageTitle>
      </PageContainer>

      {sortedPorfolist.map((item) => (
        <MyPortfolioAccordion
          key={item._id}
          id={item._id}
          isPinned={item.isPinned} // 핀 상태
          name={item.name} // 포폴 제목
          isOpen={openPortfolio === item._id} // 열린 상태인지 아닌지
          handleToggle={handleToggle} // 열거나 닫는 함수
          handlePinned={handlePinned} // 핀 누르는 함수
          tickers={item.tickers}
        />
      ))}
    </>
  );
}

export default MyPortfolio;
