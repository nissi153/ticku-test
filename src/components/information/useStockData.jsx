import { useState, useEffect } from "react";

function useStockData(stockCode, stockName) {
  const [chartData, setChartData] = useState({
    name: "기업 이름",
    code: "기업 코드",
    price: "가격",
    change: "변화량",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!stockCode || !stockName) {
        return;
      }

      try {
        // /search 엔드포인트 호출 (회사 정보). 이제 stockName만 넘기면 됨.
        const companyResponse = await fetch(
          `http://localhost:5000/search?query=${stockName}`
        );
        const companyData = await companyResponse.json();
        if (!companyResponse.ok || companyData.length === 0) {
          throw new Error("회사 정보를 가져오는데 실패했습니다.");
        }
        //console.log("companyData in useStockData", companyData)

        const fetchedStockCode = companyData[0].stock_code;
        const fetchedCorpName = companyData[0].corp_name;

        // /stockdata 엔드포인트 호출 (주가 정보)
        const stockResponse = await fetch(
          `http://localhost:5000/stockdata/${fetchedStockCode}`
        );

        const stockData = await stockResponse.json();

        if (!stockResponse.ok) {
          throw new Error("주가 정보를 가져오는데 실패했습니다.");
        }

        setChartData({
          name: fetchedCorpName, // corp_name
          code: fetchedStockCode, // stock_code
          price: stockData.price || "가격 정보 없음",
          change: stockData.change || "변화량 정보 없음",
        });
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setChartData({
          name: "기업 이름",
          code: "기업 코드",
          price: "가격 정보 없음",
          change: "변화량 정보 없음",
        });
      }
    };

    fetchData();
  }, [stockCode, stockName]);

  return chartData;
}

export default useStockData;
