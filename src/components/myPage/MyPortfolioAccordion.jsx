import styled from "styled-components";
import { Pie } from "react-chartjs-2";

const AccordionItemWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-bottom: 10px;
  transform: ${(props) =>
    props.$isPinned ? "translateY(0px)" : "translateY(1px)"};
  transition: transform 0.3s ease;
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  margin-bottom: 10px;
`;

const Pin = styled.img`
  width: 23px;
  height: 23px;
`;

const Name = styled.p`
  margin: 0;
  font-size: 25px;
  flex-grow: 1;
  margin-left: 20px;
`;

const Arrow = styled.img`
  height: 50px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const AccordionContent = styled.div`
  display: flex;
  overflow: hidden;
  max-height: ${(props) => (props.$isOpen ? "240px" : "0px")};
  transition: max-height 0.3s ease-in-out;
`;

const ChartContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 230px;
`;

const LegendWrapper = styled.div`
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10px;
  top: 60px;
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

function MyPortfolioAccordion({
  id,
  isPinned, // 핀 상태
  name, // 포폴 제목
  isOpen, // 열린 상태인지 아닌지
  handleToggle, // 열거나 닫는 함수
  handlePinned, // 핀 클릭 함수
  tickers,
}) {
  const chartData = {
    labels: tickers.map((item) => item.ticker),
    datasets: [
      {
        label: "포트폴리오",
        data: tickers.map((item) => item.percent),
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(201, 203, 207, 0.4)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(201, 203, 207, 0.4)",
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
    <>
      <AccordionItemWrapper $isPinned={isPinned}>
        <AccordionHeader onClick={() => handleToggle(id)}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handlePinned(id);
            }}
          >
            {isPinned ? (
              <Pin src="../../public/images/pin-fill.png" alt="고정된 핀" />
            ) : (
              <Pin
                src="../../public/images/pin-outline.png"
                alt="고정 안 된 핀"
              />
            )}
          </div>

          <Name>{name}</Name>

          <div>
            <Arrow
              $isOpen={isOpen}
              src="../../public/images/arrow.png"
              alt="화살표 이미지"
            />
          </div>
        </AccordionHeader>

        <AccordionContent $isOpen={isOpen}>
          <ChartContainer>
            <Pie data={chartData} options={chartOptions} />
            {isOpen && (
              <LegendWrapper>
                {legendItems.map((item, index) => (
                  <LegendItem key={index}>
                    <LegendColorBox color={item.color} />
                    {item.text}
                  </LegendItem>
                ))}
              </LegendWrapper>
            )}
          </ChartContainer>
        </AccordionContent>
      </AccordionItemWrapper>
    </>
  );
}

export default MyPortfolioAccordion;
