import { useEffect, useState } from "react";
import styled from "styled-components";

import BackButton from "../common/BackButton";
import NewsCard from "../common/NewsCard";

// 맨 위 이름있는 곳
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

/*useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);*/

// 스크랩한 뉴스를 가져오는 함수
function ScrapNews() {
  const [newsList, setNewsList] = useState([]);

  const fetchNews = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("유저 ID가 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/user/scrapnews?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error("뉴스 데이터를 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [newsList]);

  return (
    <>
      <PageContainer>
        <BackButton width="40" height="40" link="/mypage" />
        <PageTitle>스크랩한 뉴스</PageTitle>
      </PageContainer>

      {newsList.map((item) => (
        <NewsCard
          key={item._id}
          title={item.title}
          link={item.link}
          pubDate={item.pubDate}
          sourceName={item.sourceName}
        />
      ))}
    </>
  );
}

export default ScrapNews;
