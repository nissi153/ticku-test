import styled from "styled-components";

// 페이지 보여줄 공간
const ShowArea = styled.div`
  display: flex;
  position: relative;
  width: 390px;
  height: 792px;
  transform: ${(props) => `translateX(${-390 * props.curPage}px)`};
  transition: ${(props) => props.transition || "0s"};
`;
const Filter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
  z-index: 6;
`;
const InsWrap = styled.div`
  visibility: hidden;
  z-index: 7;
`;

export default function ExPageForm({
  page,
  instruction,
  curPage,
  transition,
  insKey,
}) {
  return (
    <ShowArea curPage={curPage} transition={transition}>
      {page}
      <Filter></Filter>
      {/* 필터 윗부분 */}
      <InsWrap key={insKey}>{instruction}</InsWrap>
    </ShowArea>
  );
}
