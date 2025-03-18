import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./FontAwesome";
// FontAwesomIcon 컴포넌트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PlusModal from "./PlusModal";

const BottomWrap = styled.div`
  display: ${(props) => props.display || "flex"};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  width: 100%;
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px -1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px -3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px -6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px -12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px -24px 24px -12px;
  padding-top: 10px;
  text-align: center;
  background-color: #0d1b2a;
  border: 1px solid #22303d;
  z-index: 2;
`;
const Div = styled.div`
  background-color: #0d1b2a;
  border: none;
  flex: 20%;
`;
export const IconStyle = styled(FontAwesomeIcon)`
  color: #d2d2d2;
`;
export const ClickedIconStyle = styled(FontAwesomeIcon)`
  color: #00ffc4;
`;

export default function BottomNavBar({ display }) {
  const location = useLocation();
  // 선택된 아이콘 관리 변수
  const [activeNav, setActiveNav] = useState(3);

  // 모달창 상태 관리 변수
  const [isOpen, setIsOpen] = useState(false);
  // 모달창 상태 관리 함수
  const modalHandle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  // 모달창 닫기
  const modalClose = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/information") {
      setActiveNav(1);
    } else if (location.pathname.startsWith("/portmn")) {
      setActiveNav(2);
    } else if (
      location.pathname.startsWith("/communityposts") ||
      location.pathname === "/communitywrite" ||
      location.pathname.startsWith("/editpost")
    ) {
      setActiveNav(4);
    } else if (location.pathname === "/mypage") {
      setActiveNav(5);
    } else if (location.pathname === "/calen") {
      setActiveNav(6);
    } else if (location.pathname === "/ticko") {
      setActiveNav(7);
    } else if (location.pathname === "/main") {
      setActiveNav(3);
    }
  }, [location]);

  return (
    <BottomWrap display={display}>
      <Div>
        <Link to="/information" onClick={modalClose}>
          {activeNav === 1 ? (
            <ClickedIconStyle icon="magnifying-glass" />
          ) : (
            <IconStyle icon="magnifying-glass" />
          )}
        </Link>
      </Div>
      <Div>
        <Link to="/portmn" onClick={modalClose}>
          {activeNav === 2 ? (
            <ClickedIconStyle icon="chart-pie" />
          ) : (
            <IconStyle icon="chart-pie" />
          )}
        </Link>
      </Div>
      <Div>
        <Link to="/main" onClick={modalClose}>
          {activeNav === 3 ? (
            <ClickedIconStyle icon="house" />
          ) : (
            <IconStyle icon="house" />
          )}
        </Link>
      </Div>
      <Div>
        <Link to="/communityposts" onClick={modalClose}>
          {activeNav === 4 ? (
            <ClickedIconStyle icon="pen-to-square" />
          ) : (
            <IconStyle icon="pen-to-square" />
          )}
        </Link>
      </Div>
      <Div>
        <IconStyle icon="grip" onClick={modalHandle} />
      </Div>

      <PlusModal isOpen={isOpen} modalClose={modalHandle} />
    </BottomWrap>
  );
}
