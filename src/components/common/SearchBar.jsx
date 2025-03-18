// SearchBar.jsx
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const Div = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  z-index: 5;
`;

const Box = styled.div`
  background-color: #1c2f43a5;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  height: 50px;
  width: 300px;
  ::placeholder {
    color: #d3d3d376;
  }
`;

const SearchIcon = styled.img`
  height: 30px;
  width: 30px;
  margin-left: 30px;
`;

const StyledTextInput = styled.input`
  margin-top: 3px;
  width: 60%;
  height: 10px;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;

const SearchResults = styled.ul`
  position: absolute;
  font-size: 18px;
  top: 55px;
  background: #1c2f43;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
`;

const SearchResultItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:active {
    background-color: #f0f0f0;
  }
`;

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const fetchSearchResults = debounce(async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/search?query=${searchQuery}`
      );
      const data = await response.json();

      if (response.status === 404 || data.length === 0) {
        setResults([]);
      } else {
        setResults(data);
      }
    } catch (error) {
      console.error("검색 API 요청 중 오류 발생: ", error);
      setResults([]);
    }
  }, 300);

  // fetchData 함수 (handleKeyDown과 handleSelectResult에서 공통으로 사용)
  const fetchData = async (corpCode, stockName, stockCode, corpName) => {
    try {
      // 1. 회사 정보 가져오기 (companyInfo API)
      const companyInfoResponse = await fetch(
        `http://localhost:5000/companyInfo/${corpCode}`
      );
      const companyInfoData = await companyInfoResponse.json();

      if (companyInfoResponse.status !== 200) {
        alert("회사 정보를 가져오는 데 실패했습니다."); // 또는 다른 오류 처리
        return;
      }

      // 2. 연간 실적 가져오기
      const yearResultResponse = await fetch(
        `http://localhost:5000/yearResult/${corpCode}`
      );
      const yearResultData = await yearResultResponse.json();

      if (!yearResultResponse.ok) {
        alert("연간 실적 정보를 가져오는 데 실패했습니다.");
        return;
      }

      // 3. 연간 매출액 가져오기
      const yearSalesResponse = await fetch(
        `http://localhost:5000/salesyear/${corpCode}`
      );
      const yearSalesData = await yearSalesResponse.json();

      if (!yearSalesResponse.ok) {
        alert("연간 매출 정보를 가져오는 데 실패했습니다.");
        return;
      }

      // 데이터 형식 변환
      const transformedYearSalesData = [];
      const sales = { category: "매출액(억)" };
      const operatingProfit = { category: "영업이익(억)" };
      const netIncome = { category: "순이익(억)" };

      yearSalesData.forEach((item) => {
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

      transformedYearSalesData.push(sales, operatingProfit, netIncome);

      // 4. 분기별 매출액 가져오기
      const quarterlySalesResponse = await fetch(
        `http://localhost:5000/quarterlySales/${corpCode}`
      );
      const quarterlySalesData = await quarterlySalesResponse.json();

      if (!quarterlySalesResponse.ok) {
        alert("분기별 매출 정보를 가져오는 데 실패했습니다.");
        return;
      }

      // Recharts에 맞는 데이터 형식으로 변환
      const transformedQuarterlySalesData = [];
      const Qsales = { category: "매출액(억)" };
      const QoperatingProfit = { category: "영업이익(억)" };
      const QnetIncome = { category: "순이익(억)" };

      quarterlySalesData.forEach((item) => {
        Qsales[item.quarter] = item.data["매출액"]
          ? item.data["매출액"].toLocaleString()
          : "N/A";
        QoperatingProfit[item.quarter] = item.data["영업이익"]
          ? item.data["영업이익"].toLocaleString()
          : "N/A";
        QnetIncome[item.quarter] = item.data["당기순이익"]
          ? item.data["당기순이익"].toLocaleString()
          : "N/A";
      });

      transformedQuarterlySalesData.push(Qsales, QoperatingProfit, QnetIncome);

      // 5. navigate (with companyInfoData)
      navigate(`/information/search`, {
        state: {
          stockCode,
          stockName, // 여전히 필요
          corpCode,
          corp_name: corpName,
          financeData: {
            // financeData 객체 전달
            ceo: companyInfoData.대표이사,
            establishedDate: companyInfoData.설립일,
            stockCode: companyInfoData.종목코드,
            homepage: companyInfoData.홈페이지,
          },
          yearResultData,
          yearSalesData: transformedYearSalesData,
          quarterlySalesData: transformedQuarterlySalesData,
        },
      });
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
      alert("데이터를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && query) {
      try {
        const searchResponse = await fetch(
          `http://localhost:5000/search?query=${query}`
        );
        const searchData = await searchResponse.json();

        if (searchResponse.status === 404 || searchData.length === 0) {
          setQuery("");
          setResults([]);
          alert("검색 결과가 없습니다.");
          return;
        }

        const corpCode = searchData[0].corp_code;
        const stockName = searchData[0].corp_name;
        const stockCode = searchData[0].stock_code;
        const corpName = searchData[0].corp_name;

        // fetchData 함수 호출
        await fetchData(corpCode, stockName, stockCode, corpName);
      } catch (error) {
        console.error("검색 요청 중 오류 발생:", error);
        alert("검색 중 오류가 발생했습니다.");
      }
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    fetchSearchResults(e.target.value);
  };

  const handleSelectResult = async (company) => {
    setQuery(company.corp_name);
    setResults([]);

    // fetchData 함수 호출
    await fetchData(
      company.corp_code,
      company.corp_name,
      company.stock_code,
      company.corp_name
    );
  };

  return (
    <Div>
      <Box>
        <SearchIcon src="/images/search.png" alt="Search Icon" />
        <StyledTextInput
          ref={inputRef}
          placeholder="종목 검색"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Box>
      {results.length > 0 && (
        <SearchResults>
          {results.map((company) => (
            <SearchResultItem
              key={company.id}
              onClick={() => handleSelectResult(company)}
            >
              {company.corp_name}
            </SearchResultItem>
          ))}
        </SearchResults>
      )}
    </Div>
  );
}

export default SearchBar;
