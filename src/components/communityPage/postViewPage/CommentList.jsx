import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import CommentListItem from "./CommentListItem";

/*

CommentList.jsx

- 해당 글에 달린 모든 댓글을 포함하는 컴포넌트
- `comments` 배열을 받아서 각 댓글에 대해 `CommentListItem` 컴포넌트를 렌더링
- 각 댓글은 `CommentListItem` 컴포넌트에 전달되어 유저 프로필과 댓글 내용이 출력됨

*/

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
`;

function CommentList(props) {
  const { comments } = props;

  return (
    <Div>
      {comments.map((comment) => {
        return <CommentListItem key={comment._id} comment={comment} />;
      })}
    </Div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;
