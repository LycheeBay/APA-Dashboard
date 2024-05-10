import TLACMap from '../components/tlac-map.js';
import BuildingInfo from '../components/building-info.js';
import '../style/building.css';

function TLAC() {
  return (
    <div className="TLAC">
      <div className="building-map">
        <TLACMap />
      </div>
      <div className="building-info">
        <BuildingInfo />
      </div>
    </div>
  );
}

export default TLAC;
