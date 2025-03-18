import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PortTitle from "../../components/portfolioPage/PortTitle";
import PortBox from "../../components/portfolioPage/PortBox";
import PortButton from "../../components/portfolioPage/PortButtons";
import BottomNavBar from "../../components/common/bottomNavBars/BottomNavBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 390px;
`;

function PortfolioMainPage({ display }) {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // localStorage에서 데이터 로드
    const storedData = localStorage.getItem("portfolio");
    if (storedData) {
      setPortfolioData(JSON.parse(storedData));
    }
  }, []);

  return (
    <Wrap>
      <BottomNavBar display={display} />
      <Container>
        <PortTitle />
        {portfolioData ? (
          <PortBox
            ticker={portfolioData.tickers.reduce((obj, item) => {
              obj[item.ticker] = item.ticker; // ticker를 키로 사용
              return obj;
            }, {})}
            percent={portfolioData.tickers.reduce((obj, item) => {
              obj[item.ticker] = item.percent; // ticker를 키로 사용
              return obj;
            }, {})}
            link="portfolio-link" // 적절한 링크 설정
          />
        ) : (
          <PortBox link={"make"} /> // 데이터가 없을 경우 "make" 링크 사용
        )}
        <PortButton />
      </Container>
    </Wrap>
  );
}

export default PortfolioMainPage;
