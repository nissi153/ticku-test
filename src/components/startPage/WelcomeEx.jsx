import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  width: 390px;
  height: 792px;
  justify-content: center;
  padding-top: 140px;
  box-sizing: border-box;
`;
const Logo = styled.img`
  width: 230px;
  height: 230px;
`;

export default function WelcomeEx() {
  return (
    <Wrap>
      <Logo src="/images/logo_pic.png"></Logo>
    </Wrap>
  );
}
