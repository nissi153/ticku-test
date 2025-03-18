// ResultTable.jsx 연도별 테이블블
import React from "react";
import styled from "styled-components";
import SalesYearChart from "./SalesYearChart";

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
  border: 2px solid #394a5d;
  font-size: 12px;
`;

const Th = styled.th`
  background-color: #1c2f43a5;
  padding: 8px 10px;
  border: 1px solid #394a5d;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 8px 12px;
  text-align: center;
  border: 1px solid #394a5d;
`;

const NoData = styled.p`
  text-align: center;
  padding: 20px;
  color: #999;
`;

function ResultTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <NoData>데이터가 없습니다.</NoData>;
  }

  // 모든 연도 가져오기 (첫 번째 객체에서 키를 가져와서 정렬)
  const allYears = Object.keys(data[0])
    .filter((key) => key !== "category") // category 제외
    .sort((a, b) => b - a); // 내림차순 정렬

  // 카테고리 (매출액, 영업이익, 순이익)
  const categories = data.map((item) => item.category);

  return (
    <>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>연도</Th> {/* 변경 */}
              {categories.map((category) => (
                <Th key={category}>{category}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allYears.map((year) => (
              <tr key={year}>
                <Td>{year}</Td>
                {data.map((item) => (
                  <Td key={item.category}>{item[year] || "N/A"}</Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ResultTable;
