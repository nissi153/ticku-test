import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const Title = styled.p`
  font-size: 25px;
  font-weight: 500;
  margin: 15px 0;
`;

const Content = styled.p`
  margin-top: 0;
  font-size: 18px;
  font-weight: 400;
`;

const Picture = styled.img`
  width: 100%;
  height: auto;
`;

function Post(props) {
  const { title, content, imageUrl } = props;

  return (
    <Div>
      <Title>{title}</Title>
      <Content>{content}</Content>
      {imageUrl ? <Picture src={imageUrl} alt="Post Image" /> : null}
    </Div>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default Post;
