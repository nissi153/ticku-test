import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const PortDiv = styled.div`
  width: 300px;
  height: 250px;
  background-color: #1c2f43a5;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  position: relative;
`;

const AddButton = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const ChartContainer = styled.div`
  width: 180px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
`;

//오른쪽 상단 종목 목록 표시하기
const TickerList = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  background-color: #394a5db1;
  padding: 5px 15px;
  border-radius: 8px;
  font-size: 12px;
  max-width: 65px;
  text-align: left;
`;

//종목 색상
const ColorBox = styled.div`
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 5px;
  border-radius: 3px;
`;

const PortBox = ({ ticker, percent, link }) => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null); // 차트 데이터를 state로 관리
  const [tickerLabels, setTickerLabels] = useState([]); //종목 리스트 저장
  const handleClick = () => {
    navigate("/portmn/" + link);
  };

  useEffect(() => {
    if (ticker && percent) {
      // ticker와 percent가 존재할 때만 차트 데이터 생성
      const labels = Object.keys(ticker); // ticker 객체의 키를 레이블로 사용
      const dataValues = Object.values(percent); // percent 객체의 값을 데이터로 사용
      setTickerLabels(labels);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "자산 비율",
            data: dataValues,
            backgroundColor: [
              // 각 데이터 조각의 색상 지정
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderWidth: 1,
            borderColor: [
              // 각 데이터 조각의 색상 지정
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
          },
        ],
      });
    }
  }, [ticker, percent]);

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // 기본 범례 비활성화
      },
    },
  };

  return (
    <PortDiv onClick={link ? handleClick : null}>
      {chartData ? (
        <>
          <ChartContainer>
            <Pie data={chartData} options={chartOptions} />
          </ChartContainer>
          <TickerList>
            {tickerLabels.map((name, index) => (
              <div key={index}>
                {" "}
                <ColorBox
                  style={{
                    backgroundColor:
                      chartData.datasets[0].backgroundColor[index],
                  }}
                />
                {name}
              </div>
            ))}
          </TickerList>
        </>
      ) : (
        <AddButton src="../public/images/portadd.png" onClick={handleClick} />
      )}
    </PortDiv>
  );
};

export default PortBox;
