import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  width: 80%;
  text-align: left;
`;

const Title = styled.h2`
  margin-top: 60px;
  margin-bottom: -15px;
  font-weight: bold;
  font-size: 30px;
  line-height: 0.9px;
  text-align: center;
  margin-left: -120px;

  &:nth-child(2)::before {
    content: "  ";
    display: inline-block;
    width: 110px;
  }
`;

function PortTitle() {
  return (
    <TitleWrapper>
      <Title>당신이 원하는</Title>
      <Title>포트폴리오는?</Title>
    </TitleWrapper>
  );
}
export default PortTitle;
