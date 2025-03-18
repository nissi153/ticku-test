import React from "react";
import styled from "styled-components";

const MakeDiv = styled.div`
  width: 400px;
  height: 800px;
  position: fixed;
  background-color: rgba(200, 200, 200, 0.2);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  overflow-x: auto;
`;

const PortMakeBox = () => {
  return <MakeDiv></MakeDiv>;
};

export default PortMakeBox;
