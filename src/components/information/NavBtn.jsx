import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import React from "react";

const NavDiv = styled.div`
  padding-top: 30px;
  cursor: pointer;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 8px;
  align-items: center;
`;

const NavComponentBtn = styled.button`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
const NavComponentImg = styled.img`
  width: 30px;
  height: 30px;
`;

const NavComponentText = styled.p`
  text-align: center;
  margin: 8px 0;
  font-weight: ${(props) =>
    props.active ? "bold" : "normal"}; // 폰트 굵기 스타일
`;

function NavBtn({ icon, text, bgColor, link, active, stockCode, stockName }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const newState = { stockCode, stockName };

    if (link === "chart") {
      navigate("/information/chart", { state: newState });
    } else {
      navigate("/information/" + link, { state: newState });
    }
  };
  return (
    <NavDiv>
      <NavComponentBtn backgroundColor={bgColor} onClick={handleClick}>
        <NavComponentImg src={icon} alt={text} />
      </NavComponentBtn>
      <NavComponentText active={active}>{text}</NavComponentText>
    </NavDiv>
  );
}

export default NavBtn;
