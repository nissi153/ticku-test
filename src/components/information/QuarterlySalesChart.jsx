// SalesquarterChart.jsx
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
        <p>{`분기: ${label}`}</p>
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

function SalesquarterChart({ data }) {
  // 데이터 가공: rechart에 맞는 형태로 변환

  // data가 undefined나 null일 경우 빈 배열로 처리,
  // 그리고 data 배열의 각 객체가 "category" 속성을 가지는지 확인
  const safeData =
    data && Array.isArray(data) && data.every((item) => "category" in item)
      ? data
      : [];

  const chartData =
    safeData.length > 0
      ? Object.keys(safeData[0])
          .filter((key) => key !== "category")
          // 분기 문자열을 숫자로 변환하여 정렬
          .sort((a, b) => {
            const [yearA, quarterA] = a.split(".").map(Number);
            const [yearB, quarterB] = b.split(".").map(Number);
            if (yearA !== yearB) {
              return yearA - yearB; // 연도가 다르면 연도 오름차순
            }
            return quarterA - quarterB; // 같으면 분기 오름차순
          })
          .map((quarter) => {
            const quarterData = { quarter };
            safeData.forEach((item) => {
              quarterData[item.category] =
                item[quarter] !== "N/A"
                  ? parseInt(item[quarter].replace(/,/g, ""), 10)
                  : 0; // 쉼표 제거 후 숫자로 변환, "N/A"는 0으로
            });
            return quarterData;
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
          <XAxis dataKey="quarter" tick={{ fill: "white" }} reversed />
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

export default SalesquarterChart;
