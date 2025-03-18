import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/*

Button.jsx

버튼 제목과 배경색을 동적으로 변경 가능
- 버튼의 높이는 `height` prop을 통해 설정할 수 있으며, 기본값은 `auto`로 설정됨.
- 배경색은 `background` prop을 통해 설정되며, 기본값은 `#B2C4DF`.
- 버튼에 클릭 이벤트를 처리하는 `onClick` prop 전달 가능
- 버튼의 텍스트는 `title` prop을 통해 설정되며, 기본값은 `"button"`.

*/

const StyledButton = styled.button`
  font-size: ${(props) => props.$fontsize || "18"}px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  height: ${(props) => props.$height || "auto"}px;
  background-color: ${(props) => props.$background || "#B2C4DF"};
  color: white;
  border: none;
  width: ${(props) => props.$width || "50"}px;
`;

function Button({ height, title, background, onClick, fontsize, width }) {
  return (
    <StyledButton
      $height={height}
      onClick={onClick}
      $background={background}
      $fontsize={fontsize}
      $width={width}
    >
      {title || "button"}
    </StyledButton>
  );
}

Button.propTypes = {
  height: PropTypes.number,
  title: PropTypes.string,
  background: PropTypes.string,
  onClick: PropTypes.func,
  fontsize: PropTypes.number,
  width: PropTypes.number,
};

export default Button;
