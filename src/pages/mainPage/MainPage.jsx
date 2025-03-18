import React from "react";

import BottomNavBar from "../../components/common/bottomNavBars/BottomNavBar";
import SearchBar from "../../components/common/SearchBar";
import LiveSearchRank from "../../components/mainPage/LiveSearchRank";
import LiveIndexChart from "../../components/mainPage/LiveIndexChart";
import MainPortfolio from "../../components/mainPage/MainPortfolio";

import styled from "styled-components";
const Wrap = styled.div`
  width: 390px;
`;

function MainPage({ display }) {
  return (
    <Wrap>
      <BottomNavBar display={display} />
      <SearchBar />
      <LiveSearchRank />
      <LiveIndexChart />
      <MainPortfolio />
    </Wrap>
  );
}
export default MainPage;
