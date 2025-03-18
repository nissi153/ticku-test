import React from "react";
import styled from "styled-components";
import UserProfile from "../../common/UserProfile";
import Tags from "../postListPage/Tags";
import PropTypes from "prop-types";

/*

UserAndTag.jsx

유저 프로필 (프로필 사진 + 닉네임) + 글의 태그를 포함하는 div
- `userId`와 관련된 프로필을 `UserProfile` 컴포넌트를 통해 표시
- 글에 관련된 `tag`를 `Tags` 컴포넌트를 통해 표시
- `height`, `width`, `fontsize`, `padding` 등은 프로필 사진과 텍스트 크기 등을 조정하기 위한 props

*/

const Div = styled.div`
  display: flex;
  flex-direction: row;
  height: 70px;
`;

const UserBox = styled.div`
  display: flex;
  height: 100%;
  vertical-align: center;
`;

const TagBox = styled.div`
  display: flex;
  padding-top: 1px;
  height: 100%;
`;

function UserAndTag(props) {
  const { tag, userId, anonymous } = props;
  return (
    <Div>
      <UserBox>
        {" "}
        <UserProfile
          userId={userId}
          height={50}
          width={50}
          fontsize={22}
          padding={0}
          isAnonymous={anonymous}
        />
      </UserBox>
      <TagBox>
        <Tags tag={tag} />
      </TagBox>
    </Div>
  );
}

UserAndTag.propTypes = {
  tag: PropTypes.string,
  userId: PropTypes.number,
};

export default UserAndTag;
