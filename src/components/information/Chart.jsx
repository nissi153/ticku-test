// pages/Chart.jsx
import React, { useState } from "react";
import AllChart from "./AllChart";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#00ffc3e0" : "#1c2f43a5")};
  color: #ffffff;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border: 1px solid;
  border-color: ${(props) => (props.active ? "#00ffc3e0" : "#1c2f43a5")};
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => (props.active ? "#00ffc3ae" : "#1c2f4370")};
  }
`;

function ChartPage() {
  const location = useLocation();
  const { stockCode, stockName } = location.state || {};

  console.log("ChartPage - stockCode:", stockCode); // stockCode 확인

  const [period, setPeriod] = useState("1w"); // 기본값: 1주일

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div>
      {/* <Search />  제거: InformationPage에서 이미 렌더링 */}
      <ButtonWrap>
        <Button
          active={period === "1w"}
          onClick={() => handlePeriodChange("1w")}
        >
          1주일
        </Button>
        <Button
          active={period === "3m"}
          onClick={() => handlePeriodChange("3m")}
        >
          3개월
        </Button>
        <Button
          active={period === "1y"}
          onClick={() => handlePeriodChange("1y")}
        >
          1년
        </Button>
      </ButtonWrap>

      {stockCode && (
        <AllChart stockCode={stockCode} stockName={stockName} period={period} />
      )}
    </div>
  );
}

export default ChartPage;
