import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TopBar from "../../components/communityPage/postWritePage/TopBar";
import BottomNavBar from "../../components/common/bottomNavBars/BottomNavBar";
import SelectTag from "../../components/communityPage/postWritePage/SelectTag";
import TitleInput from "../../components/communityPage/postWritePage/TitleInput";
import ContentInput from "../../components/communityPage/postWritePage/ContentInput";
import BottomBar from "../../components/communityPage/postWritePage/BottomBar";

const Wrap = styled.div`
  width: 390px;
`;

function PostWritePage({ display }) {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [tag, setTag] = useState(""); // 태그 상태
  const [anonymous, setAnonymous] = useState(true); // 익명 여부 상태
  const [image, setImage] = useState(null); // 이미지 상태
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  // 태그 선택 시 호출되는 함수
  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  // 이미지 선택 시 호출되는 함수
  const handleImageChange = (file) => {
    setImage(file);
  };

  // 익명 상태 변경 함수
  const handleAnonymousChange = () => {
    setAnonymous((prevState) => !prevState);
  };

  const handleSubmit = async () => {
    console.log("게시글 작성 중...");
    try {
      // 폼 데이터 준비
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tag", tag);
      formData.append("anonymous", anonymous);

      if (image) {
        formData.append("image", image);
      }

      // 요청 보내기
      const response = await axios.post(
        "http://localhost:5000/community",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 응답이 있을 때 성공 처리
      if (response.data) {
        console.log("게시글 작성 성공");
        navigate("/communityposts"); // 성공 시, 게시글 목록 페이지로 이동
      }
    } catch (error) {
      console.error(
        "게시글 작성 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Wrap>
      <BottomNavBar display={display} />
      <TopBar handleSubmit={handleSubmit} />
      <SelectTag onTagSelect={handleTagChange} />
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <ContentInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <BottomBar
        handleImageChange={handleImageChange} // 이미지 선택 처리 함수 전달
        handleAnonymousChange={handleAnonymousChange} // 익명 상태 변경 함수 전달
        anonymous={anonymous}
      />
    </Wrap>
  );
}

export default PostWritePage;
