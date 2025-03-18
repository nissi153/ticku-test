import React from "react";
import styled from "styled-components";
import UserProfile from "../../common/UserProfile";
import Stats from "./Stats";
import Tags from "./Tags";
import PostDate from "./PostDate";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  cursor: pointer;
  background: #1c2f43a5;
  border-radius: 20px;
  &:active {
    background: #1c2f432f;
  }
`;

const Box = styled.div`
  width: 370px;
  display: flex;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;

  /* 첫 번째 자식은 50% */
  & > div:nth-child(1) {
    flex-grow: 1;
  }

  /* 두 번째 자식은 50% */
  & > div:nth-child(2) {
    flex-grow: 1;
  }
`;

const Thumbnail = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  margin-left: 16px;
`;

const ContextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px; // 자식 요소들 간의 간격을 조정
  padding: 0 20px; // 좌우 패딩
  box-sizing: border-box; // padding을 요소 크기 내에 포함시켜 레이아웃이 잘리지 않도록 함
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 10px;
  min-width: 0; // 자식 요소가 overflow될 경우 내용이 잘리지 않도록 최소 너비 설정
`;

const TitleText = styled.p`
  margin-bottom: 3px;
  font-size: 20px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #c3c3c3;
  white-space: normal;
  word-wrap: break-word;
  margin-top: 6px;
  overflow: hidden;
`;

const PictureContainer = styled.div`
  flex-shrink: 0; // 이미지가 너무 작은 공간에 축소되지 않도록
`;

function PostListItem(props) {
  const { post, onClick } = props;

  const handleDivClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Div onClick={handleDivClick}>
      <Tags tag={post.tag} />
      <Box>
        <UserProfile
          height={40}
          width={40}
          fontsize={18}
          userId={post.userId}
          isAnonymous={post.anonymous}
        />
        <Stats
          post={post}
          marginLeft={"0px"}
          likesCount={post.likes.length}
          commentsCount={post.comments.length}
        />
      </Box>

      <ContextContainer>
        <TextContainer>
          <TitleText>{post.title}</TitleText>
          <ContentText>{post.content}</ContentText>
        </TextContainer>
        <PictureContainer>
          {post.image && <Thumbnail src={post.image} />}
        </PictureContainer>
      </ContextContainer>
      <PostDate post={post} />
    </Div>
  );
}

export default PostListItem;
