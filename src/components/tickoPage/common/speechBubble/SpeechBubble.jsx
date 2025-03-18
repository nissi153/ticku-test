import styled, { keyframes } from "styled-components";

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

const SpeechWrap = styled.div`
  background-color: #1b2f44cd;
  border: 2px solid #1b2f44cd;
  border-radius: 0 15px 15px 15px;
  padding: 11px 15px;
  max-width: 245px;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  animation-delay: ${(props) => props.animationDelay || "0s"};
`;

const StyledContext = styled.div`
  font-size: 16px;
`;

export default function SpeechBubble({ context, animationDelay }) {
  return (
    <SpeechWrap animationDelay={animationDelay}>
      <StyledContext>{context}</StyledContext>
    </SpeechWrap>
  );
}
