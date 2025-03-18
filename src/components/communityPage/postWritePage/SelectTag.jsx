import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tags from "../postListPage/Tags"; // Tags 컴포넌트 import

const Div = styled.div`
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  margin: 5px 0;
  cursor: pointer; /* 클릭할 수 있도록 마우스 커서 변경 */
`;

const StyledText = styled.p`
  height: 100%;
  padding-top: 30px;
  padding-left: 28.5px;
  color: #a9a9a9b6;
  font-size: 23px;
  font-weight: 500;
  color: ${(props) =>
    props.selectedTagColor
      ? props.selectedTagColor
      : "#a9a9a9b6"}; /* 선택된 태그 색상 표시 */
`;

const StyledImg = styled.img`
  width: 17px;
  height: 15px;
  padding-left: 14px;
  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.isActive ? "scaleY(-1)" : "none"}; /* isActive에 따라 회전 */
`;

const Modal = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%); /* 가로 중앙 정렬 */
  width: 100%;
  height: 50%; /* 모달의 높이는 50%로 설정 */
  background-color: #172433;
  border-radius: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 20px;
  flex-direction: column; /* 태그들을 세로로 나열하기 위한 설정 */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

function getTagColor(tag) {
  switch (tag) {
    case "일상":
      return "#644ca2d1";
    case "질문":
      return "#3e77e9ca";
    case "정보/분석":
      return "#ff5852d0";
    case "포트폴리오":
      return "#4fc775d1";
    case "종목 추천":
      return "#ffdb28bf";
    default:
      return "#607D8B";
  }
}

function SelectTag({ onTagSelect, value }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열고 닫을 상태
  const [isActive, setIsActive] = useState(false); // 아이콘 회전 상태
  const [selectedTag, setSelectedTag] = useState(null); // 선택된 태그 상태, 처음엔 null로 초기화

  useEffect(() => {
    // value가 변경되었을 때 한 번만 selectedTag를 업데이트
    if (value && selectedTag === null) {
      setSelectedTag(value); // value로 selectedTag 초기화
    }
  }, [value, selectedTag]); // value가 변경되었을 때만 실행

  // 태그 이름 배열
  const TagTitles = ["종목 추천", "일상", "질문", "포트폴리오", "정보/분석"];

  const handleDivClick = () => {
    if (!isModalOpen) {
      // 이미 모달이 열려있지 않다면
      setIsModalOpen(true); // Div 클릭 시 모달 열기
      setIsActive(!isActive); // 아이콘 회전 상태 토글
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setIsActive(false); // 아이콘 회전 상태 초기화
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag); // 태그 선택 시 선택된 태그 저장
    setIsModalOpen(false); // 모달 닫기
    setIsActive(false); // 아이콘 회전 상태 초기화
    if (onTagSelect) onTagSelect(tag); // 부모 컴포넌트로 선택된 태그 전달
  };

  return (
    <>
      <Div onClick={handleDivClick}>
        <StyledText selectedTagColor={getTagColor(selectedTag)}>
          {selectedTag || "관심사 선택하기"}
        </StyledText>{" "}
        {/* 선택된 태그가 있으면 해당 색상으로 표시 */}
        <StyledImg
          src="../../../../public/images/down-arrow.png"
          isActive={isActive} // isActive 상태를 StyledImg로 전달
        />
      </Div>

      {isModalOpen && (
        <>
          <Overlay onClick={handleCloseModal} /> {/* 모달 바깥 클릭 시 닫기 */}
          <Modal>
            {/* TagTitles 배열을 순회하면서 태그를 Tags 컴포넌트에 전달 */}
            {TagTitles.map((tag, index) => (
              <Tags
                key={index}
                tag={tag}
                onClick={() => handleTagSelect(tag)}
                height="40px"
                width="120px"
                fontSize="18px"
              />
            ))}
          </Modal>
        </>
      )}
    </>
  );
}

export default SelectTag;
