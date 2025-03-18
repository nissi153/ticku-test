import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IconStyle, ClickedIconStyle } from "./BottomNavBar";

// 모달창 외의 화면
const RemainContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 70px;
  background-color: #00000000;
  z-index: 1;
`;
// 모달창
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 66px;
  z-index: 2;
  background-color: #0d1b2a;
  width: 130px;
  height: 175px;
  border: 2px solid #353c45;
  border-radius: 10px 10px 0 10px;
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) -1px -1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) -3px -3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) -6px -6px 6px -3px,
    rgba(14, 63, 126, 0.04) -12px -12px 12px -6px;
`;

// 더보기 메뉴 페이지
const LinkStyle = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 33%;
  text-decoration: none;
`;
const GridMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 33%;
  width: 100%;
  border-bottom: 1px solid #353c45;
`;
const GridMenuLast = styled(GridMenu)`
  border-bottom: none;
`;
//      - 이름
const GridMenuName = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #d2d2d2;
  padding-left: 8px;
`;
const ClickedGridMenuName = styled.div`
  padding-left: 8px;
  font-size: 12px;
  font-weight: bold;
  color: #00ffc4;
`;

export default function PlusModal({ isOpen, modalClose }) {
  const location = useLocation();
  // 선택된 아이콘 관리 변수
  const [activeModal, setActiveModal] = useState(3);

  useEffect(() => {
    if (location.pathname === "/mypage") {
      setActiveModal(5);
    } else if (location.pathname === "/calen") {
      setActiveModal(6);
    } else if (location.pathname === "/ticko") {
      setActiveModal(7);
    } else {
      setActiveModal(0);
    }
  }, [location]);

  // 모달창 open 관리 변수

  return (
    <>
      {isOpen && (
        <>
          <RemainContainer onClick={modalClose} />
          <ModalContainer onClick={modalClose}>
            <GridMenu>
              <LinkStyle to="/mypage">
                {activeModal === 5 ? (
                  <>
                    <ClickedIconStyle icon="circle-user" />
                    <ClickedGridMenuName>마이페이지</ClickedGridMenuName>
                  </>
                ) : (
                  <>
                    <IconStyle icon="circle-user" />
                    <GridMenuName>마이페이지</GridMenuName>
                  </>
                )}
              </LinkStyle>
            </GridMenu>

            <GridMenu onClick={modalClose}>
              <LinkStyle to="/calen">
                {activeModal === 6 ? (
                  <>
                    <ClickedIconStyle icon="calendar-check" />
                    <ClickedGridMenuName>배당락일</ClickedGridMenuName>
                  </>
                ) : (
                  <>
                    <IconStyle icon="calendar-check" />
                    <GridMenuName>배당락일</GridMenuName>
                  </>
                )}
              </LinkStyle>
            </GridMenu>

            <GridMenuLast onClick={modalClose}>
              <LinkStyle to="/ticko">
                {activeModal === 7 ? (
                  <>
                    <ClickedIconStyle icon="robot" />
                    <ClickedGridMenuName>티코</ClickedGridMenuName>
                  </>
                ) : (
                  <>
                    <IconStyle icon="robot" />
                    <GridMenuName>티코</GridMenuName>
                  </>
                )}
              </LinkStyle>
            </GridMenuLast>
          </ModalContainer>
        </>
      )}
    </>
  );
}
