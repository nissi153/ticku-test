import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import CompanyList from "./CompanyList";
import { useSearchParams } from "react-router-dom"; // useSearchParams import
import SearchBar from "../common/SearchBar";
import TopScrollBtn from "../common/TopScrollBtn";
import BottomNavBar from "../common/bottomNavBars/BottomNavBar";

//폴더 이름 수정

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  padding-bottom: 40px;
`;

const CompanyListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

function List() {
  const [companies, setCompanies] = useState([]);
  const [searchParams] = useSearchParams(); // useSearchParams 훅 사용
  const searchQuery = searchParams.get("query") || ""; // 쿼리 파라미터 가져오기 (기본값 '')

  // 데이터 가져오는 함수 (가짜 API 호출)
  const fetchCompanies = useCallback(async (query) => {
    const fakeData = [
      {
        id: 1,
        name: "삼성전자",
        isFavorite: true,
      },
      {
        id: 2,
        name: "삼성전자",
        logo: "../../../public/images/Information/삼성전자.png",
        isFavorite: true,
      },
      {
        id: 3,
        name: "삼성전자",
        logo: "../../../public/images/Information/삼성전자.png",
        isFavorite: false,
      },
      {
        id: 4,
        name: "삼성전자",
        logo: "../../../public/images/Information/삼성전자.png",
        isFavorite: true,
      },
      {
        id: 5,
        name: "삼성전자",
        logo: "../../../public/images/Information/삼성전자.png",
        isFavorite: true,
      },
      {
        id: 6,
        name: "삼성전자",
        logo: "../../../public/images/Information/삼성전자.png",
        isFavorite: true,
      },
      {
        id: 7,
        name: "삼성전자",
        logo: "../../../public/images/Information/삼성전자.png",
        isFavorite: true,
      },
      {
        id: 8,
        name: "LG전자",
        logo: "../../../public/images/Information/lg전자.png",
        isFavorite: false,
      },
    ];

    const filteredCompanies = fakeData.filter((company) =>
      company.name.toLowerCase().includes(query.toLowerCase())
    );
    setCompanies(filteredCompanies);
  }, []);

  useEffect(() => {
    fetchCompanies(searchQuery);
  }, [fetchCompanies, searchQuery]);

  // 즐겨찾기 토글 함수
  const handleToggleFavorite = useCallback((id) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === id
          ? { ...company, isFavorite: !company.isFavorite }
          : company
      )
    );
  }, []);

  return (
    <>
      <SearchDiv>
        <SearchBar />
      </SearchDiv>

      <CompanyListContainer>
        {companies.map((company) => (
          <CompanyList
            key={company.id}
            company={{ ...company, onToggleFavorite: handleToggleFavorite }}
          />
        ))}
      </CompanyListContainer>
      <TopScrollBtn />
      <BottomNavBar />
    </>
  );
}

export default List;
