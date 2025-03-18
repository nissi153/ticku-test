import React, { useState, useEffect } from "react";
import VolumeInfo from "./VolumeInfo";
import YQButton from "./YQButton";
import SalesYearChart from "./SalesYearChart";
import QuarterlySalesChart from "./QuarterlySalesChart";

function Result({ yearlyData, quarterlyData }) {
  const [isYearly, setIsYearly] = useState(true); // 연간/분기 상태 (true: 연간, false: 분기)

  // YQButton에서 연간/분기 버튼 클릭 시 상태 변경
  const handleButtonClick = (selectedType) => {
    setIsYearly(selectedType === "yearly");
  };

  // yearlyData 또는 quarterlyData가 변경될 때마다 isYearly 상태를 초기화
  // (예: 다른 기업을 검색했을 때)
  useEffect(() => {
    setIsYearly(true); // 기본값은 연간으로 설정
  }, [yearlyData, quarterlyData]);

  return (
    <div>
      <VolumeInfo title="실적"></VolumeInfo>
      <YQButton
        yearlyData={yearlyData}
        quarterlyData={quarterlyData}
        onButtonClick={handleButtonClick} // 버튼 클릭 핸들러 전달
      />

      {/* isYearly 상태에 따라 차트 렌더링 */}
      {isYearly
        ? yearlyData && <SalesYearChart data={yearlyData} />
        : quarterlyData && <QuarterlySalesChart data={quarterlyData} />}
    </div>
  );
}

export default Result;
