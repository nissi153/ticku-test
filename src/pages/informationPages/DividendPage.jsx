import VolumeInfo from "../../components/information/VolumeInfo";
import DividendTable from "../../components/information/DividendTable";

function DividendPage({ dividendData }) {
  return (
    <div>
      <VolumeInfo title="배당"></VolumeInfo>
      <DividendTable data={dividendData} /> {/* data prop 전달 */}
    </div>
  );
}

export default DividendPage;
