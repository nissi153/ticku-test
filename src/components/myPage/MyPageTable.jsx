import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Img = styled.img`
  width: 35px;
`;
const Table = styled.table`
  border-spacing: 20px 10px;
`;
const Td = styled.td`
  vertical-align: middle;
`;
const ImgTd = styled(Td)`
  width: 35px;
  height: 35px;
`;
const Tr = styled.tr`
  display: flex;
  box-sizing: border-box;
  width: 350px;
  height: 65px;
  padding: 20px;
  gap: 10px;
  align-items: center;
  background-color: #1c2f43a5;
  border-radius: 20px;
`;
const TextTd = styled(Td)`
  font-size: 21px;
  color: #ffffffeb;
  line-height: 50px;
`;

function MyPageTable(props) {
  const navigate = useNavigate();

  return (
    <>
      <Table>
        <tbody
          onClick={() => {
            navigate(props.link);
          }}
        >
          <Tr>
            <ImgTd>
              <Img src={props.src}></Img>
            </ImgTd>
            <TextTd>{props.text}</TextTd>
          </Tr>
        </tbody>
      </Table>
    </>
  );
}

export default MyPageTable;
