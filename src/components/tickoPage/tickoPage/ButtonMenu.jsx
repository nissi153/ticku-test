import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 50px;
  gap: 20px;
`;

// 개별 메뉴
const MenuContainer = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid #1c2f43a5;
  background-color: #1c2f43a5;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fffffff4;
`;

export default function ButtonMenu() {
  return (
    <MenuWrap>
      <StyledLink to="/ticko/basic">
        <MenuContainer>주식 기초 지식</MenuContainer>
      </StyledLink>
      <StyledLink to="/ticko/chart">
        <MenuContainer>차트</MenuContainer>
      </StyledLink>
      <StyledLink to="/ticko/account">
        <MenuContainer>절세 계좌</MenuContainer>
      </StyledLink>
    </MenuWrap>
  );
}
