import React from "react";
import styled from "styled-components";
import UserAndTag from "./UserAndTag";
import Post from "./Post";
import Stats from "../postListPage/Stats";
import PostDate from "../postListPage/PostDate";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  border-bottom: 10px solid #1c2f43a5;
  margin-bottom: 15px;
`;

function PostBox(props) {
  const { post } = props;
  console.log(post.userId);
  return (
    <Box>
      <Div>
        <div style={{ padding: 20 }}>
          <UserAndTag
            userId={post.userId}
            tag={post.tag}
            anonymous={post.anonymous}
          />
          <Post
            title={post.title}
            content={post.content}
            imageUrl={post.image ? post.image : null}
          />
        </div>
        <div style={{ paddingLeft: 25 }}>
          <Stats
            post={post}
            likesCount={post.likes.length}
            marginLeft={40}
            commentsCount={post.comments.length}
          />
        </div>
        <PostDate post={post} />
      </Div>
    </Box>
  );
}

export default PostBox;
