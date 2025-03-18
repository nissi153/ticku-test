// YQButton.jsx (Corrected)
import React, { useState } from "react";
import styled from "styled-components";
import ResultTable from "./ResultTable";
import QuarterlyTable from "./QuarterlyTable"; // Import QuarterlyTable

const TabContainer = styled.div`
  display: flex;
  width: 300px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 40px;
  background-color: ${(props) => (props.active ? "#00ffc3c9" : "#1c2f43a5")};
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  margin: 10px;
  color: white;
  &:first-child {
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  position: relative;
  /* margin-left: 10px; */
  margin-right: 10px;
`;

function YQButton({ yearlyData, quarterlyData, onButtonClick }) {
  const [activeTab, setActiveTab] = useState("yearly"); // Add activeTab state

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onButtonClick(tab); // Call the onButtonClick prop
  };

  // 탭 내용 렌더링
  const content =
    activeTab === "yearly" ? (
      <ResultTable data={yearlyData} />
    ) : (
      <ResultTable data={quarterlyData} /> // Use QuarterlyTable here
    );

  const isYearlyActive = yearlyData && yearlyData.length > 0;
  const isQuarterlyActive = quarterlyData && quarterlyData.length > 0;

  return (
    <>
      <TabContainer>
        <TabButton
          active={activeTab === "yearly"} // Use activeTab for active state
          onClick={() => handleTabClick("yearly")}
          disabled={!isYearlyActive}
        >
          연간
        </TabButton>
        <TabButton
          active={activeTab === "quarterly"} // Use activeTab for active state
          onClick={() => handleTabClick("quarterly")}
          disabled={!isQuarterlyActive}
        >
          분기
        </TabButton>
      </TabContainer>
      <ContentContainer>{content}</ContentContainer>
    </>
  );
}

export default YQButton;
