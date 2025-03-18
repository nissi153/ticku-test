import React from "react";
import styled from "styled-components";

// 테이블 컨테이너 스타일
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* 가로 스크롤 (필요한 경우) */
  padding: 0 20px; // 여백
`;

// 테이블 스타일
const Table = styled.table`
  width: 375px;
  border-collapse: collapse; /* 셀 테두리 병합 */
  table-layout: fixed; // column 너비 고정
`;

// 테이블 헤더 셀 스타일
const Th = styled.th`
  padding: 8px 10px;
  border-bottom: 1px solid #394a5d; /* 하단 테두리 */
  text-align: left; /* 왼쪽 정렬 */
  font-weight: bold; /* 굵은 글씨 */
`;

// 테이블 데이터 셀 스타일
const Td = styled.td`
  padding: 8px 12px;
  text-align: left;

  &:last-child {
    text-align: right;
  }

  ${(props) =>
    props.columnName === "changeRate" && // columnName prop 추가
    `
    color: ${
      props.value && props.value.startsWith("+")
        ? "#ff5656"
        : props.value && props.value.startsWith("-")
        ? "#43aaff"
        : "#ff6363" // 기본 색상 (옵션)
    };
  `}
`;

// 데이터가 없을 때 표시할 스타일
const NoData = styled.p`
  text-align: center;
  padding: 20px;
  color: #999;
`;

function VolumeTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <NoData>거래량 데이터가 없습니다.</NoData>;
  }

  return (
    <TableContainer>
      <Table>
        <colgroup>
          <col style={{ width: "20%" }} /> {/* 일자 */}
          <col style={{ width: "30%" }} /> {/* 종가 */}
          <col style={{ width: "20%" }} /> {/* 등락률 */}
          <col style={{ width: "30%" }} /> {/* 거래량(주) */}
        </colgroup>
        <thead>
          <tr>
            <Th>일자</Th>
            <Th>종가</Th>
            <Th>등락률</Th>
            <Th>거래량(주)</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <Td>{item.date}</Td>
              <Td>{item.closingPrice}</Td>
              <Td columnName="changeRate" value={item.changeRate}>
                {item.changeRate}
              </Td>
              <Td>{item.volume}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default VolumeTable;
