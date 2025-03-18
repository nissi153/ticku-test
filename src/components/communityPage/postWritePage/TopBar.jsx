import React from "react";
import styled from "styled-components";
import Button from "../Button";
import BackButton from "../../common/BackButton";

const Div = styled.div`
  width: 100vw;
  height: 50px;
  background-color: #0d1b2a;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledText = styled.p`
  padding-left: 24px;
  font-size: 26px;
  font-weight: 600;
  color: white;
`;
function TopBar({ handleSubmit }) {
  return (
    <Div>
      <BackButton
        width={28}
        height={28}
        src="../../../../public/images/cross-mark.png"
        link="/communityposts"
      />
      <StyledText>글 쓰기</StyledText>
      <Button
        title="완료"
        fontsize={22}
        width={70}
        onClick={handleSubmit}
        background="transparent"
      />
    </Div>
  );
}

export default TopBar;
