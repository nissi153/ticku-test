import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Btn = styled.button`
  position: absolute;
  background-image: url("/images/pencil.png"); /* public 폴더 기준 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  bottom: 100px;
  right: 20px;
  background-color: transparent;
`;

function WriteBtn(props) {
  return <Btn onClick={props.onClickBtn} />;
}

WriteBtn.propTypes = {
  onClickBtn: PropTypes.func,
};

export default WriteBtn;
