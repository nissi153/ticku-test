import React, { useRef } from "react";
import styled from "styled-components";

const Div = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const StyledTextarea = styled.textarea`
  margin: 3px 20px;
  outline: none;
  border: none;
  width: 330px;
  font-size: 19px;
  color: white;
  font-weight: 500;
  background: transparent;
  caret-color: #b2c4df;
  resize: none;

  &::placeholder {
    color: #a9a9a9b6;
  }
`;

function ContentInput({ value, onChange }) {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // 높이를 자동으로 리셋
    textarea.style.height = `${textarea.scrollHeight}px`; // 컨텐츠에 맞게 높이를 조정
  };

  return (
    <Div
      onClick={() => {
        textareaRef.current.focus();
      }}
    >
      <StyledTextarea
        ref={textareaRef}
        placeholder="유저들과 자유롭게 이야기해보세요!"
        value={value} // 부모에서 전달된 value 사용
        onInput={handleInput}
        onChange={onChange} // 부모에서 전달된 onChange 사용
      />
    </Div>
  );
}

export default ContentInput;
