import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import NavBtn from "./NavBtn.jsx";
import SearchBar from "../common/SearchBar.jsx";
import chartIcon from "../../../public/images/information/chartIcon.png";
import financeIcon from "../../../public/images/information/financeIcon.png";
import volumeIcon from "../../../public/images/information/volumeIcon.png";
import newsIcon from "../../../public/images/information/newsIcon.png";
import dividendIcon from "../../../public/images/information/dividendIcon.png";
import resultIcon from "../../../public/images/information/resultIcon.png";
import { useLocation, useNavigate } from "react-router-dom";

const NAVDIV = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    height: 2px;
    background-color: #b2c4df50;
  }
`;

const NavBarContainer = styled.div`
  width: 90%;
  margin: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  touch-action: pan-y;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 15px 0px;
  width: fit-content;
`;

const navButtons = [
  {
    icon: chartIcon,
    text: "차트",
    bgColor: "#1c2f43a5",
    activeBgColor: "#F8E7F7",
    link: "chart",
  },
  {
    icon: financeIcon,
    text: "기업 재무",
    bgColor: "#1c2f43a5",
    activeBgColor: "#dde6ac",
    link: "finance",
  },
  {
    icon: volumeIcon,
    text: "거래량",
    bgColor: "#1c2f43a5",
    activeBgColor: "#B2DFBF",
    link: "volume",
  },
  {
    icon: newsIcon,
    text: "뉴스",
    bgColor: "#1c2f43a5",
    activeBgColor: "#BDB2DF",
    link: "news",
  },
  {
    icon: dividendIcon,
    text: "배당",
    bgColor: "#1c2f43a5",
    activeBgColor: "#B2D1DF",
    link: "dividend",
  },
  {
    icon: resultIcon,
    text: "실적",
    bgColor: "#1c2f43a5",
    activeBgColor: "#FDC7AC",
    link: "result",
  },
];

function Navigation() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

  const { stockCode, stockName } = location.state || {};

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
      container.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      container.style.cursor = "grab";
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      container.style.cursor = "grab";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    container.addEventListener("touchstart", (e) =>
      handleMouseDown(e.touches[0])
    );
    container.addEventListener("touchend", handleMouseUp);
    container.addEventListener("touchcancel", handleMouseUp);
    container.addEventListener("touchmove", (e) =>
      handleMouseMove(e.touches[0])
    );

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);

      container.removeEventListener("touchstart", (e) =>
        handleMouseDown(e.touches[0])
      );
      container.removeEventListener("touchend", handleMouseUp);
      container.removeEventListener("touchcancel", handleMouseUp);
      container.removeEventListener("touchmove", (e) =>
        handleMouseMove(e.touches[0])
      );
    };
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    const path = location.pathname.split("/information/")[1];
    setActiveLink(path || "");
  }, [location.pathname]);

  const handleNavBtnClick = (link) => {
    navigate(`/information/${link}`, { state: location.state });
  };

  return (
    <>
      <SearchBar />
      <NAVDIV>
        <NavBarContainer ref={containerRef} style={{ cursor: "grab" }}>
          <NavBar>
            {navButtons.map((button, index) => (
              <NavBtn
                key={index}
                icon={button.icon}
                text={button.text}
                bgColor={
                  activeLink === button.link
                    ? button.activeBgColor // 활성화 색상 사용
                    : button.bgColor
                }
                link={button.link}
                stockCode={stockCode}
                stockName={stockName}
                onClick={() => handleNavBtnClick(button.link)}
                active={activeLink === button.link} // active prop 추가
              />
            ))}
          </NavBar>
        </NavBarContainer>
      </NAVDIV>
    </>
  );
}

export default Navigation;
