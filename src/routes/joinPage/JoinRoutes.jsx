import { Routes, Route } from "react-router-dom";

import JoinPage from "../../pages/joinPage/JoinPage";

function JoinRoutes() {
  return (
    <Routes>
      <Route path="/join" element={<JoinPage />}></Route>
    </Routes>
  );
}

export default JoinRoutes;
