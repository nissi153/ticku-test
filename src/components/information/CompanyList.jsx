import styled from "styled-components";
import Star from "../common/Star";
import { useState } from "react";

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  width: 310px;
  padding: 3px 20px;
  justify-content: space-between;
  background-color: #1c2f43a5;
  border-radius: 20px;
`;

const CompanySubContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CompanyName = styled.p`
  font-size: 20px;
  margin-left: 15px;
`;

const StarDiv = styled.div`
  margin-right: 15px;
`;

function CompanyList({ company }) {
  if (!company || Object.keys(company).length == 0) {
    return null;
  }

  const [starState, setStarState] = useState(true);

  // 별 상태 업데이트
  const handleChangeStar = async () => {
    const userId = localStorage.getItem("userId");
    setStarState((prev) => !prev);

    try {
      const response = await fetch(`http://localhost:5000/star/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: company.name, userId: userId }),
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("데이터를 삭제하는 데 실패했습니다.", err);
    }
  };

  return (
    <CompanyContainer>
      <CompanySubContainer>
        <CompanyName>{company.name}</CompanyName> {/* {}에 기업 이름 */}
      </CompanySubContainer>
      <StarDiv>
        <Star toggleStar={handleChangeStar} isStarred={starState}></Star>
      </StarDiv>
    </CompanyContainer>
  );
}

export default CompanyList;
