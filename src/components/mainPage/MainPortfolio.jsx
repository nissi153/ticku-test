import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";

const Div = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  align-items: center;
`;

const Box = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
`;

const PortfolioText = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
  width: 280px;
  padding-left: 30px;
`;

const PortfoliotBox = styled.div`
  height: 150px;
  border: 1px solid #1c2f43a5;
  border-radius: 10px;
  background-color: #1c2f43a5;
  padding: 20px;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const AddPortfolioText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const InnerText = styled.p`
  font-size: 25px;
  font-weight: 500;
  color: #ffffffab;
`;

const LegendWrapper = styled.div`
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const LegendColorBox = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  border-radius: 3px;
`;

function MainPortfolio() {
  const [tickers, setTickers] = useState([]);

  const fetchMainPortfolio = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:5000/portfolios/main-portfolio?userId=${userId}`
      );
      const data = await response.json();
      setTickers(data.tickers);
    } catch (err) {
      console.error("대표 포트폴리오를 가져오는 데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    fetchMainPortfolio();
  }, []);

  const chartData = {
    labels: tickers.map((item) => item.ticker),
    datasets: [
      {
        label: "대표 포트폴리오",
        data: tickers.map((item) => item.percent),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const legendItems = tickers.map((item, index) => ({
    text: item.ticker,
    color: chartData.datasets[0].backgroundColor[index],
  }));

  return (
    <Div>
      <Box>
        <PortfolioText>📌 나의 대표 포트폴리오</PortfolioText>
        <PortfoliotBox>
          {tickers.length === 0 ? (
            <AddPortfolioText>
              <InnerText>
                대표 포트폴리오를
                <br />
                추가해보세요🚀
              </InnerText>
            </AddPortfolioText>
          ) : (
            <>
              <Pie data={chartData} options={chartOptions} />
              <LegendWrapper>
                {legendItems.map((item, index) => (
                  <LegendItem key={index}>
                    <LegendColorBox color={item.color} />
                    {item.text}
                  </LegendItem>
                ))}
              </LegendWrapper>
            </>
          )}
        </PortfoliotBox>
      </Box>
    </Div>
  );
}

export default MainPortfolio;
