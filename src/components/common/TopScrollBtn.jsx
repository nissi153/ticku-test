import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  position: fixed;
  bottom: 100px;
  right: 30px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  // 수정내용
  display: ${(props) => props.display || "flex"};
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  /* object-position: 0px 10px; */
  display: block;
`;

function ScrollToTopButton({ display }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Btn onClick={scrollToTop} display={display}>
        <Image src="../public/images/top-scroll-btn.png"></Image>
      </Btn>
    </>
  );
}

export default ScrollToTopButton;
