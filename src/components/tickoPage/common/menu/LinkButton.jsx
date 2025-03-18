import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  padding: ${(props) => props.padding || "0"};
  text-decoration: none;
  text-align: center;
  color: white;
  border-radius: 20px;
  border: 1px solid #5c7da15e;
  background-color: #5c7da15e;
  font-size: 15px;
  /* 이미지 메뉴를 위한 속성 */
  display: flex;
  flex-direction: column;
`;

export default function LinkButton({ link, title, padding, children }) {
  return (
    <StyledLink to={link} padding={padding}>
      {children}
      {title}
    </StyledLink>
  );
}
