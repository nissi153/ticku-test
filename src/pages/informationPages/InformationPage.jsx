// InformationPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import BottomNavBar from "../../components/common/bottomNavBars/BottomNavBar";
import Navigation from "../../components/information/Navigation";
import InfoFirst from "../../components/information/InfoFirst";
import TopScrollBtn from "../../components/common/TopScrollBtn";
import Chart from "../../components/information/Chart";
import Finance from "../../components/information/Finance";
import VolumePage from "../../components/information/Volume";
import Result from "../../components/information/Result";
import Search from "../../components/information/Search";
import NewsPage from "./NewsPage";
import DividendPage from "./DividendPage";

const Wrap = styled.div`
  width: 390px;
`;

const ContentWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh); // 뷰포트 높이 전체 사용
  position: relative; // 상대 위치 지정
  padding-bottom: 100px;
`;

const SearchContainer = styled.div`
  /* padding: 10px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6; */
`;

function Information({ display, hideSearch }) {
  const location = useLocation();

  const [financeData, setFinanceData] = useState(null);
  const [yearResultData, setYearResultData] = useState(null);
  const [stockCode, setStockCode] = useState(null);
  const [corpCode, setCorpCode] = useState(null);
  const [volumeData, setVolumeData] = useState(null);
  const [dividendData, setDividendData] = useState(null);
  const [yearSalesData, setYearSalesData] = useState(null); // 연간 매출 데이터 상태
  const [quarterlySalesData, setQuarterlySalesData] = useState(null); // 분기별 데이터 상태 추가
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    if (location.state && location.state.financeData) {
      setFinanceData(location.state.financeData);
    }
    if (location.state && location.state.yearResultData) {
      setYearResultData(location.state.yearResultData);
    }
    if (location.state && location.state.salesData) {
      setYearSalesData(location.state.salesData); // 이 부분은 필요 없을 수 있음
    }
    if (location.state && location.state.stockCode) {
      setStockCode(location.state.stockCode);
    }
    if (location.state && location.state.corpCode) {
      setCorpCode(location.state.corpCode);
    }
    if (location.state && location.state.quarterlySalesData) {
      // 분기별 데이터 설정
      setQuarterlySalesData(location.state.quarterlySalesData);
    }
  }, [location.state]);

  // 연간 매출 데이터 가져오기 (useEffect 추가)
  useEffect(() => {
    const fetchYearSalesData = async () => {
      if (corpCode) {
        try {
          const response = await fetch(
            `http://localhost:5000/salesyear/${corpCode}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();

          // 데이터 포맷 변환
          const formattedData = [];
          const sales = { category: "매출액(억)" };
          const operatingProfit = { category: "영업이익(억)" };
          const netIncome = { category: "순이익(억)" };

          data.forEach((item) => {
            sales[item.reportYear] = item.data["매출액"]
              ? item.data["매출액"].toLocaleString()
              : "N/A";
            operatingProfit[item.reportYear] = item.data["영업이익"]
              ? item.data["영업이익"].toLocaleString()
              : "N/A";
            netIncome[item.reportYear] = item.data["당기순이익"]
              ? item.data["당기순이익"].toLocaleString()
              : "N/A";
          });
          formattedData.push(sales, operatingProfit, netIncome);
          setYearSalesData(formattedData);
        } catch (error) {
          console.error("Error fetching year sales data:", error);
          setYearSalesData([]); // 에러 발생 시 빈 배열로 설정
        }
      }
    };

    fetchYearSalesData();
  }, [corpCode]); // corpCode가 변경될 때마다 실행

  //거래량 데이터 가져오기
  useEffect(() => {
    const fetchVolumeData = async () => {
      if (stockCode) {
        try {
          const response = await fetch(
            `http://localhost:5000/volumes/${stockCode}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();

          if (!data.chartData || data.chartData.length === 0) {
            setVolumeData([]); // No data, set empty array
            return;
          }
          // Calculate changeRate here, *before* setting volumeData
          const processedData = data.chartData.map((item, index, array) => {
            let changeRate = null;
            //  *** Change here: Use < array.length - 1 ***
            if (index < array.length - 1) {
              // Check if it's NOT the *last* element
              const prevClose = array[index + 1].종가; //  + 1, *next* day's close
              const currentClose = item.종가;
              if (prevClose !== null && currentClose !== null) {
                changeRate =
                  (((currentClose - prevClose) / prevClose) * 100).toFixed(2) +
                  "%";
              }
            }
            return {
              date: item.날짜,
              closingPrice: item.종가 ? item.종가.toFixed(0) + "원" : null,
              changeRate: changeRate,
              volume: item.거래량 ? item.거래량.toLocaleString() : null,
            };
          });
          processedData.pop();
          setVolumeData(processedData);
        } catch (error) {
          console.error("Error fetching volume data:", error);
        }
      }
    };
    fetchVolumeData();
  }, [stockCode]);

  // 배당 데이터 가져오기
  useEffect(() => {
    const fetchDividendData = async () => {
      if (!corpCode) {
        console.log("corpCode가 음슴");
        return;
      } // corpCode가 없으면 아무것도 하지 않음

      try {
        console.log("corpCode : ", corpCode);

        const response = await fetch(
          `http://localhost:5000/dividend/${corpCode}`
        ); // *** 수정: corpCode 사용
        console.log("Response : ", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("dividendData:", data);

        // 데이터 포맷 변환 (배열 형태)
        const formattedData = data.map((item) => ({
          year: item.year.toString(),
          dividendPrice:
            item.commonStockDividend !== null
              ? `${item.commonStockDividend.toLocaleString()}원`
              : "N/A",
          dividendRate:
            item.commonStockYield !== null
              ? `${item.commonStockYield.toFixed(2)}%`
              : "N/A",
        }));

        setDividendData(formattedData);
      } catch (error) {
        console.error("Error fetching dividend data:", error);
        setDividendData([]); // 에러 발생 시 빈 배열로 설정
      }
    };

    fetchDividendData();
  }, [corpCode]); // corpCode가 변경될 때마다 실행

  // 뉴스 데이터
  useEffect(() => {
    const fetchNewsData = async () => {
      const corpCode = location.state?.corpCode;
      const corpName = location.state?.corp_name;
      console.log("corpCode:", corpCode, "corpName:", corpName); // 로그 추가
      if (!corpCode || !corpName) {
        console.log("뉴스의 회사 코드 또는 이름이 없습니다."); // 로그 추가
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/news/${corpCode}?corp_name=${encodeURIComponent(
            corpName
          )}`
        );
        console.log("News API Response:", response); // 응답 객체 로그
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`); // 에러 로그
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // JSON 응답 파싱
        setNewsData(data); // 파싱된 데이터를 newsData 상태에 설정
        console.log("News API Data:", data); // 파싱된 데이터 로그
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setNewsData([]); // 에러 발생 시 빈 배열로 설정
      }
    };

    fetchNewsData();
  }, [location.state?.corpCode, location.state?.corp_name]);

  return (
    <Wrap>
      <ContentWrapper>
        <Navigation />
        {/* 현재 경로가 /information이면 Search 숨김 */}
        {!hideSearch &&
          location.pathname !== "/information" &&
          location.pathname !== "/information/" && (
            <SearchContainer>
              <Search />
            </SearchContainer>
          )}
        <Routes>
          <Route index element={<InfoFirst />} />
          <Route path="chart" element={<Chart />} />
          <Route
            path="finance"
            element={
              <Finance
                financeData={financeData}
                yearResultData={yearResultData}
              />
            }
          />
          <Route
            path="volume"
            element={<VolumePage volumeData={volumeData} />}
          />
          <Route path="news" element={<NewsPage newsData={newsData} />} />
          <Route
            path="dividend"
            element={<DividendPage dividendData={dividendData} />}
          />
          <Route
            path="result"
            element={
              <Result
                yearlyData={yearSalesData}
                quarterlyData={quarterlySalesData}
              />
            }
          />
          {/* /information 자체로 들어왔을 때 /search로 이동 */}
          <Route path="/" element={<Navigate to="/information/search" />} />
        </Routes>
      </ContentWrapper>
      <TopScrollBtn display={display} />
      <BottomNavBar display={display} />
    </Wrap>
  );
}

export default Information;
