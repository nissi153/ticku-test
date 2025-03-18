import { Routes, Route } from "react-router-dom";

import LoginPage from "../../pages/loginPage/LoginPage";

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  );
}

export default LoginRoutes;
