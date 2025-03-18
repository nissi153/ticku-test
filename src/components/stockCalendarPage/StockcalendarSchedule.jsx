import React from "react";
import styled from "styled-components";

const ScheduleContainer = styled.div`
  width: 320px;
  margin-top: 40px;
  margin-left: 25px;
  font-family: Arial;
`;
const Initial = styled.div`
  font-weight: bold;
  font-size: 19px;
`;
const ScheduleHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 19px;
`;

const ScheduleList = styled.ul`
  padding-left: 0px;
`;

const ScheduleItem = styled.div`
  width: 315px;
  height: 30px;
  background-color: #1c2f43a5;
  border: 2px solid #1c2f43a5;
  border-radius: 20px;
  margin-top: 10px;
  margin-right: 5px;
  font-size: 16px;
  font-weight: bolder;
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 15px;
  cursor: pointer;
`;

const Dotdiv = styled.div`
  color: #b2c4df;
  font-size: 20px;
  margin-right: 5px;
`;

const StockCalendarSchedule = ({ schedules = [], showScheduleHeader }) => {
  return (
    <ScheduleContainer>
      {showScheduleHeader ? (
        <ScheduleHeader>Today's 배당락일</ScheduleHeader>
      ) : (
        <Initial>Monthly 배당락일</Initial>
      )}
      <ScheduleList>
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <ScheduleItem key={index}>
              <Dotdiv>•</Dotdiv> {schedule.company}
            </ScheduleItem>
          ))
        ) : (
          <ScheduleItem>
            <Dotdiv>•</Dotdiv> 일정 없음
          </ScheduleItem>
        )}
      </ScheduleList>
    </ScheduleContainer>
  );
};

export default StockCalendarSchedule;
