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
import HRorganization from "./HRorganization/HRorganization";
import AccountRegister from "./emp/AccountRegister";
import AppointmentCheck from "./HrInfo/AppointmentCheck";

const App = () => {
  return (
    <div className="mainApp">
      <div className="mainNavBox">
        <Nav />
      </div>

      <div className="mainContetnsBox">
        <UserHeader />

        <Routes>
          <Route path="/" element={<HRMain />}></Route>
          <Route path="/1" element={<HRMain />}></Route>
          <Route path="/empinfo" element={<Empinfo />}></Route>
          <Route path="/appointmentcheck" element={<AppointmentCheck />}></Route>
          <Route path="/empregister" element={<EmpRegister />}></Route>
          <Route path="/accountregister" element={<AccountRegister />}></Route>
          <Route path="/empselect" element={<EmpSelect />}></Route>
          <Route path="/hrorganization" element={<HRorganization />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
