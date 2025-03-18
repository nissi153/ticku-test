import React from "react";
import styled from "styled-components";

const MakeDiv = styled.div`
  /* width: 390px; */
  width: 100%;
  position: fixed;
  bottom: 65px;
  left: 0;
  z-index: 3;
`;

const MakeBtn = styled.button`
  width: 100%;
  background-color: #00e8b2;
  height: 60px;
  color: white;
  font-weight: bold;
  border: 0;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: #162a3f;
  }
`;

function PortMakeBtn({ onClick, disabled }) {
  return (
    <MakeDiv>
      <MakeBtn onClick={onClick} disabled={disabled}>
        제작하기
      </MakeBtn>
    </MakeDiv>
  );
}

export default PortMakeBtn;
