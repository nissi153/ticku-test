import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-height: 666px;
  width: 390px;
  overflow-y: auto; /* 세로 방향 스크롤을 허용 */
  overflow-x: hidden;
  gap: 15px;
`;

function PostList(props) {
  const { posts, onClickItem } = props;

  return (
    <Div>
      {posts
        .slice()
        .reverse() // 배열을 역순으로 정렬
        .map((post) => (
          <PostListItem
            key={post._id}
            post={post}
            onClick={() => onClickItem(post)}
          />
        ))}
    </Div>
  );
}

export default PostList;
