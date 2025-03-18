// NewsCard.jsx (최종 수정)
import React, { useState, useEffect } from "react";
import BookMark from "../../components/common/BookMark";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

// ... (스타일 컴포넌트들) ...
const NewsCardWrapper = styled.div`
  width: 80%;
  border-radius: 20px;
  margin: 0 auto;
  padding: 20px 15px 10px 15px;
  display: flex;
  flex-direction: row;
  position: relative;
  border: none;
  margin-top: 20px;
  background-color: #1c2f43a5;
`;

// 뉴스 카드 왼쪽 섹션
const LeftSection = styled.div`
  width: 100%;
`;

const NewsTitle = styled.p`
  margin: 0;
  font-size: 17px;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 90%;
  color: white;
  font-weight: bold;
`;

const SourceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SourceName = styled.p`
  margin: 0;
  margin-top: 10px;
  font-size: 12px;
  color: #fffffff0;
`;

// 카드 오른쪽 섹션
const RightSection = styled.div`
  width: 20%;
`;

const BookmarkContainer = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
`;

const A = styled.a`
  text-decoration: none;
  color: black;
`;

const P = styled.p`
  font-size: 12px;
  color: #ffffffbf;
`;

function NewsCard({
  title, // 기사 제목
  link, // 기사 링크
  pubDate, // 기사 날짜
  sourceName, // 언론사
}) {
  const [bookMarkState, setBookMarkState] = useState(false);

  // 날짜 형식 변환 함수 (NewsCard 컴포넌트 내부)
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date)) {
        return date.toISOString(); // ISO 8601 형식으로 서버에 전송
      }
    } catch (error) {
      console.error("Invalid date format:", dateString);
    }
    return null; // 유효하지 않은 날짜는 null 반환
  };

  //북마크 상태 가져오기
  const fetchBookMarkrState = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:5000/bookmark/state?userId=${userId}&title=${title}`
      );
      const data = await response.json();

      if (data.isMarked) {
        setBookMarkState(true);
      } else {
        setBookMarkState(false);
      }
    } catch (err) {
      console.error("데이터를 가져오는 데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    fetchBookMarkrState();
  }, []);

  // 북마크 상태 업데이트
  const handleChangeBookMark = async () => {
    const userId = localStorage.getItem("userId");
    const formattedPubDate = formatDate(pubDate); // 날짜 형식 변환
    if (!formattedPubDate) {
      alert("날짜 형식이 올바르지 않습니다.");
      return;
    }
    setBookMarkState((prev) => !prev);

    // true -> 저장
    if (!bookMarkState) {
      try {
        const response = await fetch(`http://localhost:5000/bookmark/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            link: link,
            pubDate: formattedPubDate,
            sourceName: sourceName,
            isMarked: true,
            userId: userId,
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error("뉴스를 저장하는 데 실패했습니다.", err);
      }
    } // false -> 삭제
    else {
      try {
        const response = await fetch(`http://localhost:5000/bookmark/remove`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: title, userId: userId }),
        });

        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error("데이터를 삭제하는 데 실패했습니다.", err);
      }
    }
  };

  // pubDate를 Date 객체로 변환 (에러 처리 추가)
  let formattedDate = "";
  try {
    const date = new Date(pubDate);
    if (!isNaN(date)) {
      formattedDate = date.toLocaleDateString("ko-KR"); // YYYY년 MM월 DD일
    } else {
      formattedDate = "날짜 정보 없음"; //혹은 빈 문자열: ""
    }
  } catch (error) {
    console.error("Invalid date format:", pubDate);
    formattedDate = "날짜 정보 없음"; // 또는 다른 기본값
  }

  return (
    <NewsCardWrapper>
      <LeftSection>
        <A href={link} target="_blank" rel="noopener noreferrer">
          <NewsTitle>{title}</NewsTitle>
          <SourceContainer>
            <SourceName>{sourceName}</SourceName>
          </SourceContainer>
          {pubDate && <P>발행일: {formattedDate}</P>}
        </A>
      </LeftSection>
      <BookmarkContainer>
        <BookMark
          isMarked={bookMarkState}
          toggleBookMark={handleChangeBookMark}
        />
      </BookmarkContainer>
      <RightSection />
    </NewsCardWrapper>
  );
}

export default NewsCard;
