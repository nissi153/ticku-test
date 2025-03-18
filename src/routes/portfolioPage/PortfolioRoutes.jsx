import { Routes, Route } from "react-router-dom";
import PortMakeModal from "../../components/portfolioMakePage/PortMakeModal";

function PortfolioPageRoutes() {
  return (
    <Routes>
      <Route
        path="/portmn/make"
        element={<PortMakeModal></PortMakeModal>}
      ></Route>
    </Routes>
  );
}

export default PortfolioPageRoutes;
