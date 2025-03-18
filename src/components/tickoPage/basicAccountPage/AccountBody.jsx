import styled from "styled-components";
import StartSpeechBubble from "../common/speechBubble/StartSpeechBubble";
import ElseSpeechBubble from "../common/speechBubble/ElseSpeechBubble";
import Menu from "../common/menu/Menu";

const BodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 60px 20px 10px 10px;
  visibility: hidden;
`;

const menuList = [
  {
    link: "/ticko/account/account_1",
    title: "ISA",
    padding: "9px 90px",
  },
  {
    link: "/ticko/account/account_2",
    title: "연금저축계좌",
    padding: "9px 90px",
  },
  {
    link: "/ticko/account/account_3",
    title: "IRP",
    padding: "9px 90px",
  },
];

export default function AccountBody() {
  return (
    <BodyWrap>
      <StartSpeechBubble context="절세 계좌를 골랐구나!"></StartSpeechBubble>
      <ElseSpeechBubble
        context="아래 항목 중에서 어떤 게 궁금한지 알려줘~"
        animationDelay={"1s"}
      ></ElseSpeechBubble>
      <Menu list={menuList} flexDirection="column" animationDelay={"2s"}></Menu>
    </BodyWrap>
  );
}
