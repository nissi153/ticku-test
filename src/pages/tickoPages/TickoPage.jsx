import styled from "styled-components";
import ButtonMenu from "../../components/tickoPage/tickoPage/ButtonMenu";
import CharIntroduce from "../../components/tickoPage/tickoPage/CharIntroduce";
import BottomNavBar from "../../components/common/bottomNavBars/BottomNavBar";

const Wrap = styled.div`
  padding-top: 25px;
  width: 390px;
`;

export default function TickoPage({ display }) {
  return (
    <Wrap>
      <BottomNavBar display={display} />
      <CharIntroduce></CharIntroduce>
      <ButtonMenu></ButtonMenu>
    </Wrap>
  );
}
