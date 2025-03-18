import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ExFullPages from "../../components/startPage/ExFullPages";

const Wrap = styled.div`
  display: flex;
  overflow: hidden;
`;
// skip 버튼
const Skip = styled.div`
  position: fixed;
  top: 15px;
  right: 20px;
  color: #ffffffdc;
  font-size: 15px;
  text-decoration: underline #ffffffdc;
  text-underline-position: under; /* text와 밑줄 사이 간격을 조금 띄워줌 */
`;
// 다음, 이전 버튼
const Button = styled.div`
  visibility: ${(props) => props.visibility || "visible"};
  position: fixed;
  bottom: 70px;
  right: ${(props) => props.right || "auto"}; /* 다음 버튼 위치 지정 */
  left: ${(props) => props.left || "auto"}; /* 이전 버튼 위치 지정 */
  color: #ffffffdc;
  font-size: 18px;
  text-decoration: underline #ffffffdc;
  text-underline-position: under;
`;
// 슬라이드바
const BottomSlide = styled.ul`
  display: flex;
  position: fixed;
  padding: 0;
  gap: 10px;
  bottom: 25px;
  left: 50%; /* 가운데 배치 */
  transform: translateX(-50%); /* 가운데 배치 */
`;
const Circle = styled.div`
  border: 5px solid;
  border-color: ${(props) => props.borderColor};
  border-radius: 50%;
`;

export default function StartPage() {
  const toLogin = useNavigate();
  const IdxArray = [0, 1, 2, 3, 4, 5, 6];

  const [curPage, setCurPage] = useState(0);
  const firstPage = 0;
  const lastPage = 6;

  // Inswrap 재렌더링 위함
  const [insKey, setInsKey] = useState(0);
  // 이전, 다음 클릭 시 페이지 이동 함수
  const movePage = (value) => {
    setInsKey((prev) => prev + 1);
    if (value === "prev") {
      setCurPage((prev) => prev - 1);
    } else if (value === "next") {
      setCurPage((prev) => prev + 1);
    }
  };
  // 이전 버튼 첫번째 페이지 숨김 처리
  const prevHidden = () => {
    if (curPage === firstPage) {
      return "hidden";
    }
  };
  // 다음 버튼 마지막 페이지 숨김 처리
  const nextHidden = () => {
    if (curPage === lastPage) {
      return "hidden";
    }
  };

  return (
    <Wrap>
      <ExFullPages
        curPage={curPage}
        transition="all 0.5s ease-in-out"
        insKey={insKey}
      ></ExFullPages>
      <Skip
        onClick={() => {
          toLogin("/login");
        }}
      >
        skip
      </Skip>
      <Button
        left="20px"
        visibility={prevHidden}
        onClick={() => movePage("prev")}
      >
        &lt; 이전
      </Button>
      <Button
        right="20px"
        visibility={nextHidden}
        onClick={() => movePage("next")}
      >
        다음 &gt;
      </Button>
      <BottomSlide>
        {IdxArray.map((idx) => (
          <Circle
            key={idx}
            borderColor={() => {
              if (idx === curPage) {
                return "#4c4c4c";
              } else {
                return "#b5b5b5";
              }
            }}
          ></Circle>
        ))}
      </BottomSlide>
    </Wrap>
  );
}
