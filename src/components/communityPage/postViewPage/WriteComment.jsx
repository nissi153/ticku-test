import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../TextInput";
import Button from "../Button";
import axios from "axios";

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;

function WriteComment({ postId, setPost }) {
  const [comment, setComment] = useState("");

  // 로컬스토리지에서 사용자 ID 가져오기
  const userId = localStorage.getItem("userId");

  const handleCommentSubmit = async () => {
    if (!userId) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    if (!comment.trim()) {
      alert("댓글을 입력하세요.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/community/${postId}/comments`, {
        userId,
        content: comment,
      });

      // 댓글 등록 후 서버에서 최신 데이터 가져오기
      const updatedPost = await axios.get(
        `http://localhost:5000/community/${postId}`
      );
      setPost(updatedPost.data);

      setComment("");
    } catch (err) {
      console.error("댓글 추가 오류:", err);
    }
  };

  return (
    <Div>
      <TextInput
        height={40}
        value={comment}
        placeholder="댓글을 입력하세요."
        background="#1c2f43a5"
        color="#ffffff"
        onChange={(event) => setComment(event.target.value)}
      />
      <Button
        height={40}
        title="등록"
        background="#00ffc3b3"
        onClick={handleCommentSubmit}
      />
    </Div>
  );
}

export default WriteComment;
