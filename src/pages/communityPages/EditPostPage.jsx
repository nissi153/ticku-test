import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

function PostEditPage({ display }) {
  const { postId } = useParams(); // URL에서 postId 가져오기
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState("df"); // 내용 상태
  const [tag, setTag] = useState(""); // 태그 상태
  const [anonymous, setAnonymous] = useState(true); // 익명 여부 상태
  const [image, setImage] = useState(null); // 이미지 상태
  const navigate = useNavigate();

  // 특정 게시글 가져오기 (페이지 렌더링 시 한 번만 호출)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/community/${postId}`
        );
        const post = response.data;
        setImage(post.image);
        setTitle(post.title);
        setContent(post.content);
        setTag(post.tag);
        setAnonymous(post.anonymous);
      } catch (error) {
        console.error("게시글을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchPost();
  }, []); // postId가 변경되면 다시 호출되도록 함

  console.log(image);
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

  const userId = localStorage.getItem("userId");
  const handleSubmit = async () => {
    console.log("게시글 수정 중...");
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
      const response = await axios.put(
        `http://localhost:5000/community/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 응답이 있을 때 성공 처리
      if (response.data) {
        console.log("게시글 수정 성공");
        navigate("/communityposts"); // 성공 시, 게시글 목록 페이지로 이동
      }
    } catch (error) {
      console.error(
        "게시글 수정 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Wrap>
      <BottomNavBar display={display} />
      <TopBar handleSubmit={handleSubmit} />
      <SelectTag onTagSelect={handleTagChange} value={tag} />
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <ContentInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <BottomBar
        handleImageChange={handleImageChange}
        value={image}
        handleAnonymousChange={handleAnonymousChange}
        anonymous={anonymous}
      />
    </Wrap>
  );
}

export default PostEditPage;
