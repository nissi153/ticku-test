import React from "react";
import styled from "styled-components";
import BackButton from "../../../components/common/BackButton";
import DelAndEdit from "./DelAndEdit";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`;
function Topbar({ post }) {
  return (
    <Div>
      <BackButton width={29} height={29} link={"/communityposts"} />
      <DelAndEdit post={post} />
    </Div>
  );
}

export default Topbar;
