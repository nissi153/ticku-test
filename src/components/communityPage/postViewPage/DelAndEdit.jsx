import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  margin-left: 10px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 40px;
  height: auto;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: 500;
  color: white;
  cursor: pointer;
`;

const Modal = styled.div`
  position: absolute;
  width: 100px;
  height: 80px;
  border-radius: 10px;
  background: #16314e;
  padding: 10px;
  right: -10px;
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :not(:last-child) {
    border-bottom: 1px solid white;
  }
`;

function DelAndEdit({ post }) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("userId");
  const isAuthor = loggedInUserId === post.userId._id;

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/community/${post._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("게시글이 삭제되었습니다.");
          navigate("/communityposts");
        } else {
          alert("게시글 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("게시글 삭제 오류:", error);
      }
    }
  };

  const handleClickOutside = (event) => {
    // 모달을 클릭하지 않은 경우에만 닫기
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false); // 모달을 닫음
    }
  };

  useEffect(() => {
    if (showModal) {
      // 모달이 열리면 외부 클릭 감지
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // 모달이 닫히면 이벤트 제거
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // 컴포넌트가 언마운트될 때 리스너 정리
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  // 모달 클릭 시 열리고 닫히도록 설정
  const handleModalClick = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    isAuthor && (
      <div style={{ position: "relative" }}>
        <Button onClick={handleModalClick}>
          <Img src={"/images/menu.png"} />
        </Button>

        <Modal ref={modalRef} show={showModal} onClick={handleModalClick}>
          <EditButton onClick={() => navigate(`/editpost/${post._id}`)}>
            수정
          </EditButton>
          <EditButton onClick={handleDelete}>삭제</EditButton>
        </Modal>
      </div>
    )
  );
}

export default DelAndEdit;
