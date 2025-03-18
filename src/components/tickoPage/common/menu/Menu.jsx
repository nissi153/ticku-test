import styled, { keyframes } from "styled-components";
import LinkButton from "./LinkButton";

const fadeIn = keyframes`
  from {
    opacity: 0;
    visibility: visible;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    visibility: visible;
  }
`;

const Wrap = styled.div`
  display: flex;
  gap: 5px;
`;
const Dummy = styled.div`
  display: hidden;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  flex-shrink: 0;
`;
const MenuWrap = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  justify-content: center;
  flex-wrap: wrap;
  background-color: #1b2f44cd;
  border: 2px solid #1b2f44cd;
  border-radius: 15px;
  padding: 25px 15px;
  gap: 10px 5px;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  animation-delay: ${(props) => props.animationDelay || "0"};
`;

export default function Menu({ list, flexDirection, animationDelay }) {
  return (
    <Wrap>
      <Dummy></Dummy>
      <MenuWrap flexDirection={flexDirection} animationDelay={animationDelay}>
        {list.map((menu, idx) => {
          return (
            <LinkButton
              key={idx}
              link={menu.link}
              title={menu.title}
              padding={menu.padding}
            ></LinkButton>
          );
        })}
      </MenuWrap>
    </Wrap>
  );
}
