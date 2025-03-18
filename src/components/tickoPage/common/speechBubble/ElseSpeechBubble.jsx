import styled from "styled-components";
import SpeechBubble from "./SpeechBubble";

const BubbleWrap = styled.div`
  display: flex;
  gap: 5px;
`;
// 말풍선 위치 통일을 위한 더미 div
const Dummy = styled.div`
  display: hidden;
  width: 45px;
  height: 45px;
  flex-shrink: 0;
`;

export default function ElseSpeechBubble({ context, animationDelay }) {
  return (
    <BubbleWrap>
      <Dummy></Dummy>
      <SpeechBubble
        context={context}
        animationDelay={animationDelay}
      ></SpeechBubble>
    </BubbleWrap>
  );
}
