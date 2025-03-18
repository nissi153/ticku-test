import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  width: 390px;
  height: 50px;
  position: fixed;
  bottom: 66px;
  background-color: #0d1b2a;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  gap: 10px;
`;
const PictureBox = styled.div`
  display: flex;
  height: 48px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 45%;
  cursor: pointer;
`;

const Picture = styled.img`
  width: 30px;
  height: 30px;
`;

const StyledText = styled.p`
  color: white;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
`;

const Check = styled.img`
  width: 24px;
  height: 24px;
`;

const AnonymousBox = styled.div`
  display: flex;
  height: 48px;
  flex-direction: row;
  align-items: center;
  width: 45%;
  cursor: pointer;
  gap: 10px;
`;

function BottomBar({
  handleImageChange,
  handleAnonymousChange,
  anonymous,
  value,
}) {
  const [imageName, setImageName] = useState("사진");
  const [imageSelected, setImageSelected] = useState(false);

  useEffect(() => {
    // value가 변경되었을 때, 초기 한 번만 실행
    if (value) {
      setImageName(value);
      setImageSelected(true);
    }
  }, []); // 빈 배열을 전달하여 처음 한 번만 실행되도록 함

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        setImageName(file.name);
        setImageSelected(true);
        handleImageChange(file); // 부모 컴포넌트에 이미지 변경 전달
      }
    };
  };

  const handleCheckClick = () => {
    const newAnonymousState = !anonymous;
    handleAnonymousChange(newAnonymousState); // 부모 컴포넌트에 익명 상태 전달
  };

  return (
    <Div>
      <PictureBox onClick={handleImageClick}>
        <Picture
          src={
            imageSelected
              ? "../../../../public/images/photo-gallery-fill.png"
              : "../../../../public/images/photo-gallery.png"
          }
        />
        <StyledText>{imageName}</StyledText>
      </PictureBox>
      <AnonymousBox onClick={handleCheckClick}>
        <Box>
          <Check
            src={
              anonymous
                ? "../../../../public/images/check-box-fill.png"
                : "../../../../public/images/check-box.png"
            }
          />
          <StyledText>익명</StyledText>
        </Box>
      </AnonymousBox>
    </Div>
  );
}

export default BottomBar;
