import React from "react";
import styled from "styled-components";

const ContentDiv = styled.div`
  width: 350px;
  height: 450px;
  background-color: #1c2f43a5;
  border-radius: 10px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-wrap: wrap; */
  flex-direction: column;
`;

const Character = styled.img`
  width: 230px;
  height: 230px;
`;

const ContentText = styled.p`
  font-size: 25px;
`;

function FirstContent() {
  return (
    <ContentDiv>
      <Character src="/images/ticko.png"></Character>
      <ContentText>궁금한 기업, 바로 검색!</ContentText>
    </ContentDiv>
  );
}

export default FirstContent;
