import React from "react";
import styled from "styled-components";

// 스타일링 부분
const Div = styled.div`
  margin-top: 16px;
  margin-bottom: 4px;
  display: flex;
  padding: 0 26px;
`;

const StyledText = styled.p`
  font-size: 15px; /* 폰트 크기 증가 */
  font-weight: 500;
  color: #ffffff82;
`;

const Spacer = styled.div`
  width: 20px; /* 날짜와 시간 사이에 큰 공백 추가 */
`;

function PostDate({ post }) {
  // 1. Date 객체로 변환 (post.updatedAt이 ISO 8601 형식 문자열이라고 가정)
  const updatedAtDate = new Date(post.createdAt);

  // 2. 한국 시간으로 변환 (getTimezoneOffset()은 분 단위로 반환하므로, 9시간을 분으로 환산)
  const kstDate = new Date(updatedAtDate.getTime() + 9 * 60 * 60 * 1000);

  // 3. 년, 월, 일, 시, 분 추출 (padStart로 2자리 맞추기)
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(kstDate.getUTCDate()).padStart(2, "0");
  const hour = String(kstDate.getUTCHours()).padStart(2, "0");
  const min = String(kstDate.getUTCMinutes()).padStart(2, "0");

  const date = `${year}-${month}-${day}`;

  return (
    <Div>
      <StyledText>작성일 : {date}</StyledText>
      <Spacer />
      <StyledText>
        작성시간: {hour}시 {min}분
      </StyledText>
    </Div>
  );
}

export default PostDate;
