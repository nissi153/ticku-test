import React, { useState, useEffect } from "react";
import styled from "styled-components";

import BackButton from "../common/BackButton";
import CompanyList from "../information/CompanyList";

const PageContainer = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
`;
const PageTitle = styled.p`
  font-size: 27px;
  margin: 0;
  padding: 0;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

function FavoriteCompanies() {
  const [companies, setCompanies] = useState([]);

  // 회사 목록을 가져오는 함수
  const fetchCompanies = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("사용자 ID가 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/user/favorites?userId=${userId}`
      );
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("회사 데이터를 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [companies]);

  return (
    <>
      <PageContainer>
        <BackButton width="40" height="40" link="/mypage" />
        <PageTitle>관심 기업</PageTitle>
      </PageContainer>

      <ListContainer>
        {companies.map((company) => {
          return (
            <CompanyList
              key={company._id}
              company={{
                ...company,
              }}
            />
          );
        })}
      </ListContainer>
    </>
  );
}

export default FavoriteCompanies;
