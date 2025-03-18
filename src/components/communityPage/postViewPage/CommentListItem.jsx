import React from "react";
import styled from "styled-components";
import UserProfile from "../../common/UserProfile";
import PropTypes from "prop-types";
import CommentDate from "./CommentDate";
/*

CommentListItem.jsx

해당 글에 달린 댓글을 표시하는 컴포넌트
- 유저 프로필 (유저 프로필 사진 + 닉네임) + 해당 유저가 작성한 댓글이 담긴 div
- 댓글 내용은 `comment.content`로 전달되며, 유저 ID는 `comment.id`로 전달됨

*/
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  border-bottom: 10px solid #1c2f43a5;
  padding: 5px 20px;
`;
const CommentText = styled.p`
  font-size: 16px;
  white-space: pre-wrap;
  padding-left: 8px;
`;

function CommentListItem(props) {
  const { comment } = props;
  return (
    <Box>
      <Div>
        <UserProfile
          height={35}
          width={35}
          fontsize={15}
          padding={0}
          userId={comment.userId}
        />
        <CommentText>{comment.content}</CommentText>
        <div>
          <CommentDate comment={comment} />
        </div>
      </Div>
    </Box>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentListItem;
