import React, { useRef } from "react";
import styled from "styled-components";

const Div = styled.div`
  height: 55px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const StyledTextarea = styled.textarea`
  margin: 3px 20px;
  outline: none;
  border: none;
  width: 330px;
  height: 36px;
  font-size: 22px;
  color: white;
  font-weight: 500;
  background: transparent;
  caret-color: #b2c4df;
  border-bottom: 2px solid #a9a9a9b6;
  resize: none;
  overflow: hidden;
  white-space: nowrap;

  &:focus {
    background: transparent;
    border-bottom: 2px solid #b2c4df;
  }

  &::placeholder {
    color: #a9a9a9b6;
  }
`;

function TitleInput({ value, onChange }) {
  const inputRef = useRef(null);

  return (
    <Div
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <StyledTextarea
        ref={inputRef}
        placeholder="제목을 입력하세요."
        maxLength={50}
        onChange={onChange} // 부모 컴포넌트에서 전달된 onChange 사용
        value={value} // 부모 컴포넌트에서 전달된 value 사용
      />
    </Div>
  );
}

export default TitleInput;
