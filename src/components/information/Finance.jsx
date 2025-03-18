// Finance.jsx
import React from "react";

import FinanceInfo from "./FinanceInfo";
// YearResultTable은 FinanceInfo 내부에서 사용되므로 여기서 import할 필요 없음

function Finance({ financeData, yearResultData }) {
  return (
    <div>
      <FinanceInfo
        companyInfo={{
          ceo: financeData.ceo,
          establishedDate: financeData.establishedDate,
          stockCode: financeData.stockCode,
          homepage: financeData.homepage,
        }}
        yearResultData={yearResultData} // yearResultData를 FinanceInfo로 전달
      />
      {/* <YearResultTable data={yearResultData} />  FinanceInfo 내부에서 처리 */}
    </div>
  );
}

export default Finance;
