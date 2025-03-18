import React, { useState, useRef } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 360px; //현재 달력의 너비
  font-family: sans-serif;
  margin-left: 18px;
  margin-top: 12px;
  position: relative;
`;

//화살표 Nav 간격 조정
const CalendarHeader = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #0d1b2a;
`;

const MonthLabel = styled.span`
  font-weight: bold;
  font-size: 1.5em;
  cursor: pointer;
`;

//탐색 버튼
const NavButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    /* filter: grayscale(100%) invert(100%) brightness(0%); */
  }
`;

//달력 요일 표시줄
const WeekdaysRow = styled.div`
  display: flex;
`;

const Weekday = styled.span`
  flex: 1;
  text-align: center;
  padding: 5px;
  color: #ffffffec;
  font-size: 12px;
  font-weight: bolder;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 10px;
`;

const DayCell = styled.div`
  padding: 10px;
  width: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c2f43a5;
  color: white;
  border: 1px solid transparent;
  transition: 0.2s;
  cursor: pointer;
  &.today {
    border: 2px solid #00ffc3 !important;
    background-color: #00ffc387 !important;
    color: #ffffff;
  }
  &.selected {
    color: #ffffff !important;
    border: 2px solid #00eaff !important;
    background-color: #00eaff87 !important; //선택된 날짜와 today 색상과 동일 적용
  }
  &.other-month {
    color: #999;
  }
  &.has-schedule {
    border: 2px solid #b2c4df57;
    color: #ffffff;
  }
  &:hover {
    background-color: #b2c4df;
  }
`;

const MonthOption = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #1e334b;
  }
`;

//월 이름을 배열로 정의
const monthNames = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

//달력 목록 선택
const MonthDropdown = styled.div`
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%); //가로 중앙 정렬
  background: #15273a;
  border: 1px solid #15273a;
  border-radius: 10px;
  z-index: 10;
  width: 80px;
  max-height: 110px; //최대 높이 제한
  overflow-y: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

//날짜 비교 함수
const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const StockCalendar = ({ onScheduleSelect, scheduleData, onMonthChange }) => {
  // onMonthChange props 추가
  const [currentDate, setCurrentDate] = useState(new Date()); //오늘 날짜 상태
  const [selectedDate, setSelectedDate] = useState(null); //선택된 날짜 상태
  const [isMonthDropdownOpen, setMonthDropdownOpen] = useState(false);

  //useRef를 통해 monthLabelRef를 초기화
  const monthLabelRef = useRef(null);

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day.day
    );
    setSelectedDate(clickedDate); //선택된 날짜 상태 업데이트
    if (onScheduleSelect) {
      onScheduleSelect(clickedDate);
    }

    // 선택된 날짜에 해당하는 스케줄만 필터링
    const events = scheduleData.filter((schedule) => {
      const scheduleDate = new Date(schedule.date); // 스케줄의 date를 Date 객체로 변환
      return isSameDay(scheduleDate, clickedDate); // 선택된 날짜와 스케줄의 날짜가 같은지 비교
    });

    if (onScheduleSelect) {
      onScheduleSelect(events);
    }
  };

  const getDaysArray = () => {
    const days = [];
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayIndex = firstDayOfMonth.getDay(); //3월 1일 인덱스

    for (let i = 1; i <= firstDayIndex; i++) {
      days.push({
        day: " ",
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        hasSchedule: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const hasSchedule = scheduleData.some((schedule) => {
        // console.log(
        //   "isSameDay",
        //   currentDay,
        //   schedule.date,
        //   isSameDay(currentDay, schedule.date)
        // ); // isSameDay 함수 확인
        return isSameDay(schedule.date, currentDay);
      });
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: isSameDay(currentDay, new Date()),
        isSelected: selectedDate && isSameDay(currentDay, selectedDate),
        hasSchedule,
      });
    }
    // console.log("days", days); // days 배열 확인
    return days;
  };

  const daysArray = getDaysArray();

  // 월 선택 핸들러 추가
  const selectMonth = (monthIndex) => {
    const newMonth = new Date(currentDate.getFullYear(), monthIndex, 1);
    setCurrentDate(newMonth);
    setMonthDropdownOpen(false);
    if (onMonthChange) {
      onMonthChange(newMonth); // StockcalenPages 컴포넌트로 새 달 정보 전달
    }
  };

  // 이전 달, 다음 달 이동 시 호출될 함수
  const handleMonthNavigation = (newDate) => {
    setCurrentDate(newDate);
    if (onMonthChange) {
      onMonthChange(newDate); // StockcalenPages 컴포넌트로 새 달 정보 전달
    }
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavButton
          onClick={() => {
            const newDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 1,
              1
            );
            handleMonthNavigation(newDate);
          }}
        >
          <img src="/images/calen-arrow-before.png" alt="지난 달" />
        </NavButton>
        <MonthLabel
          ref={monthLabelRef}
          onClick={() => setMonthDropdownOpen(!isMonthDropdownOpen)}
        >
          {`${currentDate.getMonth() + 1}월`}
        </MonthLabel>

        {/* Dropdown 목록 기능 추가  */}
        {isMonthDropdownOpen && (
          <MonthDropdown>
            {monthNames.map((month, index) => (
              <MonthOption key={index} onClick={() => selectMonth(index)}>
                {month}
              </MonthOption>
            ))}
          </MonthDropdown>
        )}

        <NavButton
          onClick={() => {
            const newDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              1
            );
            handleMonthNavigation(newDate);
          }}
        >
          <img src="/images/calen-arrow-after.png" alt="다음 달" />
        </NavButton>
      </CalendarHeader>
      <WeekdaysRow>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
          <Weekday key={index}>{day}</Weekday>
        ))}
      </WeekdaysRow>
      <DaysGrid>
        {daysArray.map((day, index) => {
          let className = "";
          if (day.isToday) className += " today";
          if (day.isSelected) className += " selected";
          if (!day.isCurrentMonth) className += " other-month";
          if (day.hasSchedule) className += " has-schedule";
          return (
            <DayCell
              key={index}
              className={className}
              onClick={() => handleDateClick(day)}
            >
              {day.day}
            </DayCell>
          );
        })}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default StockCalendar;
