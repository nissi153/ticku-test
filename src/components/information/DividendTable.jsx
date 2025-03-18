// DividendTable.jsx
import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 350px;
  overflow-x: auto;
  padding: 0 10px;
  padding-left: 20px;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 350px;
  border-collapse: separate; /* 중요 */
  border-spacing: 0; /* 중요 */
  table-layout: fixed;
  border-radius: 10px; /* 둥근 모서리 */
  overflow: hidden; /* 중요: 바깥쪽으로 나가는 border를 감춤 */
  border: 2px solid #394a5d; /* 전체 테두리 */
`;

const Th = styled.th`
  background-color: #1c2f43a5;
  padding: 8px 10px;
  border: 1px solid #394a5d;
  /* border-bottom: 0; */
  text-align: center;
  font-weight: bold;
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

function DividendTable({ data }) {
  // prop 이름 변경
  if (!Array.isArray(data) || data.length === 0) {
    return <NoData>배당 데이터가 없습니다.</NoData>; // 메시지 수정
  }

  return (
    <TableContainer>
      <Table>
        <colgroup>
          <col style={{ width: "33%" }} />
          <col style={{ width: "33%" }} />
          <col style={{ width: "34%" }} />
        </colgroup>
        <thead>
          <tr>
            <Th>연도</Th>
            <Th>현금 배당금</Th>
            <Th>배당수익률</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <Td>{item.year}</Td> {/* 속성 이름 변경 */}
              <Td>{item.dividendPrice}</Td> {/* 속성 이름 변경 */}
              <Td>{item.dividendRate}</Td> {/* 속성 이름 변경 */}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default DividendTable;
