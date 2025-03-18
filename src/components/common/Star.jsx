import styled from "styled-components";

const Img = styled.img`
  width: 25px;
`;

function Star({ isStarred, toggleStar }) {
  return (
    <>
      <div onClick={toggleStar}>
        {isStarred ? (
          <Img src="/images/star-filled.png"></Img>
        ) : (
          <Img src="/images/star-empty.png"></Img>
        )}
      </div>
    </>
  );
}

export default Star;
