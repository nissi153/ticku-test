// YearResultChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 100%;
  height: 300px; /* 차트 높이 조절 */
  padding: 20px; /* 여백 추가 */
  /* background-color: #f8f9fa;  배경색 (선택 사항) */
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // payload에서 데이터 가져옴
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#1c2f43", // 툴팁 배경색 변경
          padding: "10px",
          border: "1px solid #1c2f43",
          borderRadius: "10px", // 둥근 모서리 (선택 사항)
          color: "white", // 글자 색상 (선택 사항)
        }}
      >
        <p>{`연도: ${label}`}</p>
        <p>{`자산: ${data.자산 ? data.자산.toLocaleString() : "N/A"} 억원`}</p>
        <p>{`자본: ${data.자본 ? data.자본.toLocaleString() : "N/A"} 억원`}</p>
        <p>{`부채: ${data.부채 ? data.부채.toLocaleString() : "N/A"} 억원`}</p>
      </div>
    );
  }

  return null;
};

function YearResultChart({ data }) {
  // 데이터 가공: rechart에 맞는 형태로 변환
  const chartData = data
    .map((item) => ({
      year: item.reportYear,
      자산: item.data["자산총계"] || 0,
      자본: item.data["자본총계"] || 0,
      부채: item.data["부채총계"] || 0,
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fill: "white" }} />
          {/* <YAxis unit="억원" /> */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="자산" fill="#82ca9d" name="자산" />
          <Bar dataKey="자본" fill="#8884d8" name="자본" />
          <Bar dataKey="부채" fill="#ff7f50" name="부채" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default YearResultChart;
