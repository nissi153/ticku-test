// SalesYearChart.jsx
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

// 커스텀 툴팁 컴포넌트
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // payload에서 데이터 가져옴
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#1c2f43", // 툴팁 배경색
          border: "1px solid #1c2f43",
          padding: "10px",
          borderRadius: "10px",
          color: "white", // 텍스트 색상
        }}
      >
        <p>{`연도: ${label}`}</p>
        <p>{`매출액: ${
          data["매출액(억)"] ? data["매출액(억)"].toLocaleString() : "N/A"
        } 억`}</p>
        <p>{`영업이익: ${
          data["영업이익(억)"] ? data["영업이익(억)"].toLocaleString() : "N/A"
        } 억`}</p>
        <p>{`순이익: ${
          data["순이익(억)"] ? data["순이익(억)"].toLocaleString() : "N/A"
        } 억`}</p>
      </div>
    );
  }

  return null;
};

function SalesYearChart({ data }) {
  const safeData = data || [];

  const chartData =
    safeData.length > 0
      ? Object.keys(safeData[0])
          .filter((key) => key !== "category")
          .sort((a, b) => a - b)
          .map((year) => {
            const yearData = { year };
            safeData.forEach((item) => {
              yearData[item.category] =
                item[year] !== "N/A"
                  ? parseInt(item[year].replace(/,/g, ""), 10)
                  : 0; // 쉼표 제거 후 숫자로 변환, "N/A"는 0으로
            });
            return yearData;
          })
      : [];

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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="매출액(억)" fill="#82ca9d" name="매출액" /> {/* 녹색 */}
          <Bar dataKey="영업이익(억)" fill="#8884d8" name="영업이익" />{" "}
          {/* 파란색 */}
          <Bar dataKey="순이익(억)" fill="#ff7f50" name="순이익" />{" "}
          {/* 빨간색 */}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default SalesYearChart;
