// FinanceInfo.jsx
import React, { useState } from "react";
import styled from "styled-components";
import YearResultTable from "./YearResult"; // YearResultTable import
import YearResultChart from "./YearResultChart";

const MainContainer = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 20px;
    right: 20px;
    height: 2px;
    background-color: #394a5dcb;
  }
`;

const TabContainer = styled.div`
  display: flex;
  width: 250px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: ${(props) => (props.active ? "white" : "#B3B3B3")};
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  outline: none;

  &:first-child {
    border-right: 1px solid #394a5dcb;
  }

  &:hover {
    border-radius: 10px;
    background-color: #1c2f43a5;
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  position: relative;
  margin-right: 10px;
`;

const CompanyInfoContainer = styled.div``;

const InfoItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 5px;
  display: inline-block;
  width: 120px;
  /* color: #777; */
`;

const Value = styled.span`
  /* 홈페이지 a 태그 스타일 */
  a {
    color: white; /* 글자색을 흰색으로 */
    text-decoration: none; /* 밑줄 제거 (선택 사항) */

    &:hover {
      text-decoration: underline; /* 마우스 오버 시 밑줄 (선택 사항) */
    }
  }
`;

const NoData = styled.p`
  color: #999;
  font-style: italic;
`;

// 기업 정보 컴포넌트
function CompanyInfoContent({ ceo, establishedDate, stockCode, homepage }) {
  // 홈페이지 URL 보정 함수
  const getCorrectedHomepage = (homepage) => {
    if (!homepage) {
      return null; // 홈페이지 정보가 없으면 null 반환
    }
    // "www."가 이미 포함되어 있거나 "http"로 시작하면 그대로 반환
    if (homepage.startsWith("www.") || homepage.startsWith("http")) {
      return homepage;
    }
    // "www."가 없으면 추가
    return "www." + homepage;
  };

  const correctedHomepage = getCorrectedHomepage(homepage);

  return (
    <CompanyInfoContainer>
      <InfoItem>
        <Label>대표이사</Label>
        <Value>{ceo || <NoData>정보 없음</NoData>}</Value>
      </InfoItem>
      <InfoItem>
        <Label>설립일</Label>
        <Value>{establishedDate || <NoData>정보 없음</NoData>}</Value>
      </InfoItem>
      <InfoItem>
        <Label>주식 종목코드</Label>
        <Value>{stockCode || <NoData>정보 없음</NoData>}</Value>
      </InfoItem>
      <InfoItem>
        <Label>홈페이지</Label>
        <Value>
          {correctedHomepage ? (
            <a
              href={`http://${correctedHomepage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {correctedHomepage}
            </a>
          ) : (
            <NoData>정보 없음</NoData>
          )}
        </Value>
      </InfoItem>
    </CompanyInfoContainer>
  );
}

// 재무 제표 컴포넌트
function FinancialStatementsContent({ yearResultData }) {
  // yearResultData prop 받기
  return (
    <div>
      {/* yearResultData를 YearResultTable에 전달 */}
      <YearResultChart data={yearResultData} />
      <YearResultTable data={yearResultData} />
    </div>
  );
}

function FinanceInfo({ companyInfo, yearResultData }) {
  // yearResultData prop 추가
  const [activeTab, setActiveTab] = useState("companyInfo");

  const tabContents = {
    companyInfo: <CompanyInfoContent {...companyInfo} />,
    // yearResultData 전달
    financialStatements: (
      <FinancialStatementsContent yearResultData={yearResultData} />
    ),
  };

  return (
    <div>
      <MainContainer>
        <TabContainer>
          <TabButton
            active={activeTab === "companyInfo"}
            onClick={() => setActiveTab("companyInfo")}
          >
            기업 정보
          </TabButton>
          <TabButton
            active={activeTab === "financialStatements"}
            onClick={() => setActiveTab("financialStatements")}
          >
            재무 제표
          </TabButton>
        </TabContainer>
      </MainContainer>
      <ContentContainer>{tabContents[activeTab]}</ContentContainer>
    </div>
  );
}

export default FinanceInfo;
