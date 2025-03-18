import styled from "styled-components";
import Star from "../../components/common/Star";
import { useEffect, useState } from "react";

const CompanyDiv = styled.div`
  max-width: 400px;
  display: flex;
  align-items: center;
  padding: 50px 0;
  padding-left: 25px;
`;

const TextDiv = styled.div`
  display: block;
  width: 90%;
`;

const CompanySubDiv = styled.div`
  display: flex;
  flex: 1;
  //margin-right: 15px;
  //gap: 5px;
  justify-content: stretch;
  align-items: baseline;
  padding-bottom: 10px;
`;

const CompanyName = styled.p`
  font-size: 20px;
  margin: 0;
  margin-right: 10px;
  width: 300px;
`;

const CompanyCode = styled.span`
  color: #b3b3b3;
  font-size: 20px;
  margin: 0;
  width: 200px;
`;

const CompanyPrice = styled.span`
  font-size: 20px;
`;

const CompanyPriceChange = styled.span`
  font-size: 20px;
  /* margin-left: 110px; */

  color: ${(props) => (props.change.startsWith("-") ? "#43aaff" : "#ff6363")};
`;
const PriceWrap = styled.div`
  display: flex;
  align-items: baseline;
  /* margin-left: auto; */
  justify-content: space-between;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

function CompanyInfo(props) {
  const { logo, altText, name, code, price, change } = props;
  const [starState, setStarState] = useState(false);

  // 별 상태 가져오기
  const fetchStarState = async () => {
    const userId = localStorage.getItem("userId");
    console.log("CompanyInfo의 userId : " + userId);

    try {
      const response = await fetch(
        `http://localhost:5000/star/status?userId=${userId}&name=${name}`
      );
      const data = await response.json();
      console.log("CompanyInfo의 사용자의 isFavorite : " + data.isFavorite);

      if (data.isFavorite) {
        setStarState(true);
      } else {
        setStarState(false);
      }
    } catch (err) {
      console.error("데이터를 가져오는 데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    fetchStarState();
  }, [name]);

  // 별 상태 업데이트
  const handleChangeStar = async () => {
    const userId = localStorage.getItem("userId");
    setStarState((prev) => !prev);

    // true -> 저장
    if (!starState) {
      try {
        const response = await fetch(`http://localhost:5000/star/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, userId: userId }),
        });

        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error("데이터를 수정하는 데 실패했습니다.", err);
      }
    } // false -> 삭제
    else {
      try {
        const response = await fetch(`http://localhost:5000/star/remove`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, userId: userId }),
        });

        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error("데이터를 삭제하는 데 실패했습니다.", err);
      }
    }
  };

  return (
    <CompanyDiv>
      <TextDiv>
        <CompanySubDiv>
          <CompanyName>{name}</CompanyName>
          <CompanyCode>{code}</CompanyCode>
          <StarContainer>
            <Star toggleStar={handleChangeStar} isStarred={starState} />
          </StarContainer>
        </CompanySubDiv>
        <PriceWrap>
          <CompanyPrice>{price} 원</CompanyPrice>
          <CompanyPriceChange change={change}>{change} 원</CompanyPriceChange>
        </PriceWrap>
      </TextDiv>
    </CompanyDiv>
  );
}

export default CompanyInfo;
