import styled, { keyframes } from "styled-components";

import WelcomeEx from "./WelcomeEx";
import MainPage from "../../pages/mainPage/MainPage";
import Information from "../../pages/informationPages/InformationPage";
import StockCalenPage from "../../pages/stockCalendarPages/StockCalenPage";
import PortfolioMainPage from "../../pages/portfolioPages/PortfolioMainPage";
import TickoPage from "../../pages/tickoPages/TickoPage";
import PostWritePage from "../../pages/communityPages/PostWritePage";
import Instruction from "./Instruction";
import ExPageForm from "./ExPageForm";

const fadeIn = keyframes`
  from {
    opacity: 0;
    visibility: visible;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
`;
// 웰컴 문구
const Welcome = styled.div`
  position: absolute;
  top: 400px;
  left: 50px;
  font-size: 50px;
  color: #fffffff2;
  /* 애니메이션 */
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  animation-delay: "2s";
`;

// 각 설명 페이지 배열 (각 페이지 + 설명 문구로 구성된 페이지)
const comList = [
  {
    page: <WelcomeEx />,
    instruction: <Welcome>Welcome to Ticku!</Welcome>,
  },
  {
    page: <MainPage display="none" />,
    instruction: [
      <Instruction
        key="Main_1"
        top="12px"
        left="36px"
        context="여기서 원하는 기업을 찾아볼 수 있어!"
        animationDelay="1s"
        width="310px"
        height="60px"
      ></Instruction>,
      <Instruction
        key="Main_2"
        bottom="95px"
        left="47px"
        context="내가 설정한 대표 포트폴리오가 여기에 뜰 거야!"
        animationDelay="3s"
        flexDirection="column-reverse"
        width="195px"
        height="35px"
        alignItems="end"
        maxWidth="230px"
      ></Instruction>,
    ],
  },
  {
    page: <Information display="none" hideSearch={true} />,
    instruction: (
      <Instruction
        key="Infor_1"
        top="100px"
        left="20px"
        context="검색한 기업에 대해 알고 싶은 정보를 한 눈에 볼 수 있어!"
        animationDelay="1s"
        width="350px"
        height="110px"
        maxWidth="300px"
      ></Instruction>
    ),
  },
  {
    page: <StockCalenPage display="none" />,
    instruction: [
      <Instruction
        key="Calen_1"
        top="30px"
        left="12px"
        context="날짜를 선택해봐~"
        animationDelay="1s"
        width="360px"
        height="300px"
        flexDirection="column-reverse"
        alignItems="end"
      ></Instruction>,
      <Instruction
        key="Calen_2"
        bottom="250px"
        left="15px"
        context="그 날짜가 배당락일인 기업 목록으로 바뀔 거야!"
        animationDelay="2s"
        width="165px"
        height="35px"
      ></Instruction>,
    ],
  },
  {
    page: <PortfolioMainPage display="none" />,
    instruction: [
      <Instruction
        key="Portfolio_1"
        top="70px"
        left="36px"
        context="여길 누르면 너만의 포트폴리오를 만들 수 있어~"
        animationDelay="1s"
        width="310px"
        height="260px"
        flexDirection="column-reverse"
        alignItems="end"
      ></Instruction>,
      <Instruction
        key="Portfolio_2"
        bottom="280px"
        left="33px"
        context="만든 포트폴리오를 저장하고 싶으면 꼭 저장하기를 눌러줘!"
        animationDelay="4s"
        flexDirection="column-reverse"
        width="150px"
        height="60px"
        alignItems="end"
      ></Instruction>,
      <Instruction
        key="Portfolio_3"
        bottom="198px"
        left="36px"
        context="만든 포트폴리오가 마음에 들지 않으면 삭제할 수 있어!"
        animationDelay="7s"
        width="150px"
        height="60px"
        alignSelf="flex-end"
      ></Instruction>,
    ],
  },
  {
    page: <PostWritePage display="none" />,
    instruction: (
      <Instruction
        key="PostList_1"
        top="65px"
        left="95px"
        context="얘기하고 싶은 주제로 사람들과 소통할 수 있어!"
        animationDelay="1s"
        width="200px"
        height="40px"
        maxWidth="200px"
      ></Instruction>
    ),
  },
  {
    page: <TickoPage display="none" />,
    instruction: (
      <Instruction
        key="Portfolio_1"
        bottom="118px"
        left="31px"
        context="주식 초보가 이해하기 쉽게 티코가 설명해줄게! 궁금한 게 생기면 날 보러와~"
        animationDelay="1s"
        width="320px"
        height="250px"
        maxWidth="260px"
        flexDirection="column-reverse"
        alignItems="end"
      ></Instruction>
    ),
  },
];

export default function ExFullPages({ curPage, transition, insKey }) {
  const exPageList = comList.map((com, idx) => (
    <ExPageForm
      page={com.page}
      instruction={com.instruction}
      key={idx}
      curPage={curPage}
      transition={transition}
      insKey={insKey}
    ></ExPageForm>
  ));
  return exPageList;
}
