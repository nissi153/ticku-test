import VolumeInfo from "./VolumeInfo";
import VolumeTable from "./VolumeTable";

function VolumePage({ volumeData }) {
  return (
    <div>
      <VolumeInfo title="거래량"></VolumeInfo>
      <VolumeTable data={volumeData} />
    </div>
  );
}

export default VolumePage;
