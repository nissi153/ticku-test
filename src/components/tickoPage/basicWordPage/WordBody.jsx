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
  { link: "/ticko/basic/basic_1", title: "주식이란?", padding: "7px 11px" },
  { link: "/ticko/basic/basic_2", title: "주주란?", padding: "7px 11px" },
  {
    link: "/ticko/basic/basic_3",
    title: "주권이란?",
    padding: "7px 11px",
  },
  {
    link: "/ticko/basic/basic_4",
    title: "배당금이란?",
    padding: "7px 12px",
  },
  {
    link: "/ticko/basic/basic_5",
    title: "주식의 보유와 양도",
    padding: "7px 14px",
  },
  {
    link: "/ticko/basic/basic_6",
    title: "보통주와 우선주",
    padding: "7px 18px",
  },
  {
    link: "/ticko/basic/basic_7",
    title: "주식의 가격",
    padding: "7px 19px",
  },
  { link: "/ticko/basic/basic_8", title: "공모", padding: "7px 26px" },
  { link: "/ticko/basic/basic_9", title: "증자", padding: "7px 26px" },
  { link: "/ticko/basic/basic_10", title: "감자", padding: "7px 26px" },
  { link: "/ticko/basic/basic_11", title: "펀드", padding: "7px 18px" },
  {
    link: "/ticko/basic/basic_12",
    title: "인덱스 펀드",
    padding: "7px 20px",
  },
  { link: "/ticko/basic/basic_13", title: "ETF", padding: "7px 19px" },
  {
    link: "/ticko/basic/basic_14",
    title: "주식투자 시작하기",
    padding: "7px 69px",
  },
];

export default function WordBody() {
  return (
    <BodyWrap>
      <StartSpeechBubble context="주식 기초 지식을 골랐구나!"></StartSpeechBubble>
      <ElseSpeechBubble
        context="아래 항목 중에서 어떤 게 궁금한지 알려줘~"
        animationDelay="1s"
      ></ElseSpeechBubble>
      <Menu list={menuList} animationDelay="2s"></Menu>
    </BodyWrap>
  );
}
