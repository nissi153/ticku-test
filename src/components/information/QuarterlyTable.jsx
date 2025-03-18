//QuarterlyTable.jsx
import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 380px;
  overflow-x: auto;
  margin-top: 20px;
`;

const Table = styled.table`
  width: auto;
  width: 350px;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #b2c4df;
  font-size: 12px;
`;

const Th = styled.th`
  background-color: rgba(178, 196, 223, 0.22);
  padding: 8px 10px;
  border: 1px solid #b2c4df;
  text-align: center;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 8px 12px;
  text-align: center;
  border: 1px solid #b2c4df;
`;

const NoData = styled.p`
  text-align: center;
  padding: 20px;
  color: #999;
`;

function QuarterlyTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <NoData>데이터가 없습니다.</NoData>;
  }

  // Recharts에 맞는 데이터 형식으로 변환
  const chartData = data.map((item) => {
    const quarter = `${item.year}${item.quarter}`;
    return {
      quarter,
      "매출액(억)": item.data["매출액"] || 0,
      "영업이익(억)": item.data["영업이익"] || 0,
      "순이익(억)": item.data["당기순이익"] || 0,
    };
  });

  // 모든 카테고리 가져오기 (매출액, 영업이익, 순이익)
  const categories = Object.keys(chartData[0]).filter(
    (key) => key !== "quarter"
  );

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>분기</Th>
            {categories.map((category) => (
              <Th key={category}>{category}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartData.map((item) => (
            <tr key={item.quarter}>
              <Td>{item.quarter}</Td>
              {categories.map((category) => (
                <Td key={category}>
                  {item[category] !== null && item[category] !== undefined
                    ? item[category].toLocaleString()
                    : "N/A"}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default QuarterlyTable;
