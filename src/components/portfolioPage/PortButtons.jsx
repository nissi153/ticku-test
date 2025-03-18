import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #1c2f43a5;
  color: #ffffffd2;
  padding: 20px 10px;
  border-radius: 10px;
  border: none;
  margin: 0 10px;
  width: 140px;
  height: 50px;
  text-align: center;
  line-height: 11px;
  font-size: 17px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 40px;
`;

const PortButtons = (handleSave) => {
  const a = () => {
    console.log(localStorage.getItem("portfolio"));
  };

  //DB에 저장된 데이터를 불러오기
  const handleCreatePortfolio = async () => {
    const userId = localStorage.getItem("userId");
    const content = localStorage.getItem("portfolio");
    const parsedContent = JSON.parse(content);

    const portfolioData = {
      name: parsedContent.name,
      tickers: parsedContent.tickers,
      userId,
    };

    try {
      const response = await fetch("http://localhost:5000/portfolios", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });
      if (response.ok) {
        //성공적으로 저장된 경우
        console.log("포트폴리오 성공적으로 저장되었습니다.");
        localStorage.removeItem("portfolio");
        window.location.reload();
      } else {
        //오류 발생 시
        console.error("포트폴리오 저장에 실패했습니다.");
      }
    } catch (error) {
      console.log("API 요청 중 오류 발생", error);
    }
  };

  const handleDelete = () => {
    localStorage.removeItem("portfolio"); // localStorage에서 'portfolio' 데이터 삭제
    window.location.reload();
  };
  return (
    <ButtonContainer>
      <Button onClick={handleCreatePortfolio}>save</Button>
      <Button onClick={handleDelete}>reset</Button>
      {/* onClick 이벤트 핸들러 추가 */}
    </ButtonContainer>
  );
};

export default PortButtons;
