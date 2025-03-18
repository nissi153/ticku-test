import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePicture = styled.img`
  ${(props) => props.height && `height: ${props.height}px;`}
  ${(props) => props.width && `width: ${props.width}px;`}
  border-radius: 100px;
  object-fit: cover;
  margin-right: 10px;
`;

const UserName = styled.p`
  ${(props) => props.fontsize && `font-size: ${props.fontsize}px;`}
  ${(props) => props.padding && `padding-bottom: ${props.padding}px;`}
  width:150px;
  overflow: hidden;

  white-space: nowrap;
`;

function UserProfile({
  height,
  width,
  fontsize,
  padding,
  isAnonymous,
  userId,
  isMypage,
}) {
  const [userName, setUserName] = useState("익명");
  const [userImage, setUserImage] = useState(
    "/public/images/profile_picture.png"
  );

  useEffect(() => {
    if (isMypage) {
      const Id = localStorage.getItem("userId"); // localStorage에서 userId 가져오기

      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`http://localhost:5000/user/info/${Id}`);
          const data = await response.json();

          setUserName(data.name || "익명"); // name이 없으면 익명으로 설정

          // 서버에서 받은 이미지 경로가 상대경로라면 절대경로로 변경
          const imageUrl = data.image
            ? data.image
            : "/public/images/profile_picture.png";
          setUserImage(imageUrl);
        } catch (err) {
          console.error("사용자 정보를 가져오는 데 실패했습니다.", err);
        }
      };

      if (Id) {
        fetchUserProfile();
      }
    } else if (!isAnonymous) {
      console.log(userId._id);
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/user/info/${userId._id}`
          );
          const data = await response.json();

          setUserName(data.name || "익명"); // name이 없으면 익명으로 설정

          console.log(data.image);
          const imageUrl = data.image
            ? data.image
            : "/public/images/profile_picture.png";
          setUserImage(imageUrl);
        } catch (err) {
          console.error("사용자 정보를 가져오는 데 실패했습니다.", err);
        }
      };
      fetchUserProfile();
    }
  }, [isAnonymous, isMypage, userId]);

  return (
    <Div>
      <ProfilePicture
        src={userImage}
        alt="Profile Picture"
        height={height}
        width={width}
      />
      <UserName fontsize={fontsize} padding={padding}>
        {userName}
      </UserName>
    </Div>
  );
}

export default UserProfile;
