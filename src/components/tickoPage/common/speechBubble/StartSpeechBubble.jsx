import styled, { keyframes } from "styled-components";
import SpeechBubble from "./SpeechBubble";

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

const StartWrap = styled.div`
  display: flex;
  gap: 5px;
`;
const Character = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;
const StartSpeech = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const StartName = styled.div`
  font-size: 12px;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export default function StartSpeechBubble({ context }) {
  return (
    <StartWrap>
      <Character src="/images/ticko_profile.png"></Character>
      <StartSpeech>
        <StartName>티코</StartName>
        <SpeechBubble context={context}></SpeechBubble>
      </StartSpeech>
    </StartWrap>
  );
}
