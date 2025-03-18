// StockCalenPages.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StockCalendar from "../../components/stockCalendarPage/StockCalendar";
import StockCalendarSchedule from "../../components/stockCalendarPage/StockcalendarSchedule";
import BottomNavBar from "../../components/common/bottomNavBars/BottomNavBar";

const Wrap = styled.div`
  width: 390px;
`;

function StockCalenPages({ display }) {
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const [scheduleData, setScheduleData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showScheduleHeader, setShowScheduleHeader] = useState(false); // Header 표시 여부

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져옴
    fetch("http://localhost:5000/calens")
      .then((response) => response.json())
      .then((data) => {
        // MongoDB에서 가져온 date 문자열을 Date 객체로 변환
        const transformedData = data.map((item) => ({
          ...item,
          date: new Date(item.date + "T00:00:00"), // "2025-03-11" 형태를 Date 객체로 변환
        }));
        setScheduleData(transformedData);

        // 현재 달의 배당락일 필터링
        const currentMonthSchedules = transformedData.filter((item) => {
          return (
            item.date.getFullYear() === currentMonth.getFullYear() &&
            item.date.getMonth() === currentMonth.getMonth()
          );
        });

        // 필터링된 스케줄을 초기 선택된 스케줄로 설정
        setSelectedSchedules(currentMonthSchedules);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentMonth]);

  const handleScheduleSelect = (schedules) => {
    setSelectedSchedules(schedules);
    setShowScheduleHeader(true); // 날짜 클릭 시 Header 표시
  };

  // Calendar 컴포넌트에서 달 변경 시 호출될 함수
  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
    setShowScheduleHeader(false); // 달 변경 시 Header 숨김
    setSelectedSchedules([]); // 달 변경 시 스케줄 초기화
  };

  return (
    <Wrap>
      <StockCalendar
        onScheduleSelect={handleScheduleSelect}
        scheduleData={scheduleData}
        onMonthChange={handleMonthChange} // Calendar 컴포넌트에 onMonthChange 함수 전달
      />
      <StockCalendarSchedule
        schedules={selectedSchedules}
        showScheduleHeader={showScheduleHeader} // StockCalendarSchedule에 showScheduleHeader 전달
      />

      <BottomNavBar display={display} />
    </Wrap>
  );
}

export default StockCalenPages;
