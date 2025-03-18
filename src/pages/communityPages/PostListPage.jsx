import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import PostList from "../../components/communityPage/postListPage/PostList";
import WriteBtn from "../../components/communityPage/postListPage/WriteBtn";
import BottomNavBar from "../../components/common/bottomNavBars/BottomNavBar";

const Div = styled.div`
  width: 390px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  position: relative;
  width: 100%;
`;

const TimeLine = styled.p`
  margin: 17px 10px;
  font-size: 30px;
  font-weight: 750;
  padding-left: 15px;
`;

function PostListPage({ display }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 서버에서 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/community"); // 서버 URL 확인
        console.log(response.data); // 서버 응답 데이터 확인

        if (Array.isArray(response.data)) {
          setPosts(response.data); // 배열이면 그대로 설정
        } else {
          console.error("잘못된 데이터 형식:", response.data);
        }
      } catch (error) {
        console.error("게시글을 가져오는 데 실패했습니다.", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <BottomNavBar display={display} />
      <Div>
        <TimeLine>타임라인</TimeLine>
        <Box>
          <PostList
            posts={posts}
            onClickItem={(item) => {
              navigate(`/communityposts/post/${item._id}`);
            }}
          />
        </Box>
        <WriteBtn
          onClickBtn={() => {
            navigate("/communitywrite");
          }}
        />
      </Div>
    </>
  );
}

export default PostListPage;
