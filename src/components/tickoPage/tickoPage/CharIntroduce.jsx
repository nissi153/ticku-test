import styled from "styled-components";

const CharIntroduceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
// 티코 사진
const Character = styled.img`
  width: 210px;
  height: 210px;
`;
// 티코 소개 문구
const Introduce = styled.div`
  /* wrap의 gap 속성 StyledP 적용 방지 */
`;
const StyledP = styled.p`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  color: #ffffffe9;
  margin: 10px;
`;

export default function CharIntroduce() {
  return (
    <CharIntroduceWrap>
      <Character src="/images/ticko.png"></Character>
      <Introduce>
        <StyledP>안녕! 나는 티코야~</StyledP>
        <StyledP>이해가 잘 가지 않는 게 있다면</StyledP>
        <StyledP> 내가 알려줄게! </StyledP>
        <StyledP>뭐가 궁금해서 왔어?</StyledP>
      </Introduce>
    </CharIntroduceWrap>
  );
}
