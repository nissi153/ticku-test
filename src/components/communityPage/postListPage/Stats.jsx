import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: ${(props) => props.marginLeft || "160px"};
  box-sizing: border-box;
  gap: 13px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Picture = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const CountText = styled.p`
  margin-left: 4px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
`;

function Stats(props) {
  const { likes = [], marginLeft = "160px", commentsCount = 0, post } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikesCount, setCurrentLikesCount] = useState(likes.length);

  const userId = localStorage.getItem("userId");
  const postId = post._id;

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 상태 불러오기
  useEffect(() => {
    const storedLikeStatus = localStorage.getItem(`${postId}_isLiked`);
    const storedLikesCount = localStorage.getItem(`${postId}_likesCount`);

    if (storedLikeStatus !== null) {
      setIsLiked(JSON.parse(storedLikeStatus)); // 로컬 스토리지에서 가져온 값
    }

    if (storedLikesCount !== null) {
      setCurrentLikesCount(Number(storedLikesCount)); // 로컬 스토리지에서 가져온 값
    }
  }, [postId]);

  const handleLikeClick = async (event) => {
    event.stopPropagation();

    if (!userId) {
      console.log("로그인되지 않은 사용자입니다.");
      return;
    }

    if (!postId) {
      console.error("게시글 ID가 누락되었습니다.");
      return;
    }

    try {
      // 백엔드에 좋아요/좋아요 취소 요청 보내기
      const response = await fetch(
        `http://localhost:5000/community/${postId}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // userId를 전송
        }
      );

      if (response.ok) {
        const updatedPost = await response.json(); // 서버 응답을 JSON으로 처리

        const newLikeStatus = updatedPost.likes.includes(userId); // 좋아요 상태
        setIsLiked(newLikeStatus); // 상태 업데이트
        setCurrentLikesCount(updatedPost.likes.length); // 좋아요 수 업데이트

        // 로컬 스토리지에 상태 저장
        localStorage.setItem(
          `${postId}_isLiked`,
          JSON.stringify(newLikeStatus)
        );
        localStorage.setItem(`${postId}_likesCount`, updatedPost.likes.length);
      } else {
        console.error(
          "좋아요 상태 업데이트 실패: 응답 상태 코드",
          response.status
        );
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  return (
    <Div marginLeft={marginLeft}>
      <Container>
        <Picture
          src={
            isLiked
              ? "../../../public/images/heart.png" // 꽉 찬 하트 이미지
              : "../../../public/images/heartline.png" // 빈 하트 이미지
          }
          onClick={handleLikeClick}
        />
        <CountText>{currentLikesCount}</CountText>
      </Container>
      <Container>
        <Picture src="../../../public/images/comment.png" />
        <CountText>{commentsCount}</CountText>
      </Container>
    </Div>
  );
}

export default Stats;
