import React, { Component } from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";

//각 탭 임포트
import Empinfo from "./empinfo";
import Test from "./Test";
import HRMain from "./hrMain";
import EmpRegister from "./emp/EmpRegister";
import NotFound from "./NotFound";
import Nav from "./nav/nav";
import EmpSelect from "./emp/EmpSelect";
import "./css/mainNav.css";

import UserHeader from "./userHeader";

const App = () => {
  return (
    <div className="mainApp">
        <div className="mainNavBox">
          <Nav />
        </div>

        <div className="mainContetnsBox">
          <UserHeader />

          <Routes>
            <Route path="/1" element={<HRMain />}></Route>
            <Route path="/empinfo" element={<Empinfo />}></Route>
            <Route path="/empregister" element={<EmpRegister />}></Route>
            <Route path="/empselect" element={<EmpSelect />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
    </div>
  );
};

export default App;
