import React from "react";
import Login from "./login";
import Empinfo from "./empinfo";
import Findpw from "./login/findpw";
import MainNav from "./mainNav";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
//import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* 비밀번호 찾기 */}
        <Route path="/findpw/" element={<Findpw />} />

        {/* 네비게이션으로 이동 */}
        <Route path="/mainNav/*" element={<MainNav />} />
      </Routes>
    </BrowserRouter>
    //<Empinfo />
  );
};

export default App;
