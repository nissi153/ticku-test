import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 35px;
`;
const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
`;

function BookMark({ isMarked, toggleBookMark }) {
  return (
    <>
      <div onClick={toggleBookMark}>
        {isMarked ? (
          <Img src="/images/bookmarked.png"></Img>
        ) : (
          <Img src="/images/unbookmarked.png"></Img>
        )}
      </div>
    </>
  );
}

export default BookMark;
