// components/information/Search.jsx
import React from "react";
import { useLocation } from "react-router-dom";

import CompanyInfo from "./CompanyInfo";
import useStockData from "./useStockData";

function Search() {
  const location = useLocation();

  const { stockCode, stockName } = location.state || {};
  const chartData = useStockData(stockCode, stockName);

  return (
    <>
      <CompanyInfo
        name={chartData.name}
        code={chartData.code}
        price={chartData.price}
        change={chartData.change}
      />
    </>
  );
}

export default Search;
