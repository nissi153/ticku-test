import styled from "styled-components";
import BackButton from "../../../common/BackButton";
import CharacterProfile from "./CharacterProfile";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 390px;
  height: 50px;
  position: fixed;
  background-color: #0d1b2a;
  z-index: 1;
  padding: 5px;
`;

export default function Header({ link }) {
  return (
    <HeaderContainer>
      <BackButton width="30px" height="30px" link={link} />
      <CharacterProfile />
    </HeaderContainer>
  );
}
