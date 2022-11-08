import React, { Component, useEffect, useState } from "react";
import { Routes, Route, Router, BrowserRouter, Link } from "react-router-dom";

//각 탭 임포트
import Empinfo from "./empinfo";
import Test from "./Test";
import HRMain from "./hrMain";
import EmpRegister from "./emp/EmpRegister";
import OrganizeSetting from "./emp/OrganizeSetting";
import NotFound from "./NotFound";
import Nav from "./nav/nav";
import EmpSelect from "./emp/EmpSelect";
import "./css/mainNav.css";
import CodeCommonSetting from "./common/CommonCodeSetting";

import UserHeader from "./userHeader";
import HRorganization from "./HRorganization/HRorganization";
import AccountRegister from "./emp/AccountRegister";
import AppointmentCheck from "./HrInfo/AppointmentCheck";
import PersonnelCard from "./empCard/personnelCard"; //인사기록카드
import PayslipCheck from "./payslipCheck/payslipCheck"; //급여명세서
import SeverancePay from "./severancePay/severancepay"; //퇴직금명세서
import MonthlySalaryCheck from "./monthlySalary/monthlySalaryCheck"; //월급여조회
import SalaryExpenditures from "./salaryExpenditures/salaryExpenditures"; //급여지출현황
import EmpBasicInfo from "./empBasicInfo";
import PersonnelAppointment from "./PersonnelAppointment/PersonnelAppointment";
import AttendanceStatus from "./AttendanceStatus/AttendanceStatus";
import AttendanceRegister from "./Attendance/AttendanceRegister";
import AttendanceRequest from "./Attendance/AttendanceRequest";
import RetirementApproval from "./Retirement/RetirementApproval";
import PersonalSalary from "./PersonalSalary/PersonalSalary"; //개인급여관리
import SeverancePayCal from "./SeverancePayCal/SeverancePayCal";

//근태관리 탭
import VacationManage from "./vacationManage/vacationManage"; //휴가관리
import VacationCheck from "./vacationCheck/vacationCheck"; //휴가현황
import WorkManage from "./workManage/workManage"; //근무관리

import Inbo from "./img/Group 23.png";

const App = () => {
  //현재 탭에서 무엇을 클릭했는지 확인

  // 페이지 등록 순서
  // 1. 하단에 Route에 추가하고자 하는 경로 및 컴포넌트 입력
  // 2. nav/nav.js 에서 JSON에 알맞게 추가
  const [currentClick, setCurrentClick] = useState("");

  useEffect(() => {}, []);
  return (
    <div className="mainApp">
      <Link
        to={"/mainNav"}
        onClick={() => {
          setCurrentClick("로고");
        }}
      >
        <div className="mainNav_icon">
          <img src={Inbo}></img>
        </div>
      </Link>
      <div className="mainNavBox">
        <Nav currentClick={currentClick} setCurrentClick={setCurrentClick} />
      </div>

      <div className="mainContetnsBox">
        <UserHeader />

        <Routes>
          {/* 공통 코드정보*/}
          <Route path="/setCodeCommon" element={<CodeCommonSetting />}></Route>

          {/* 기본 페이지 */}
          <Route path="/" element={<HRMain />}></Route>
          <Route path="/empinfo" element={<Empinfo />}></Route>
          <Route path="/empBasicInfo" element={<EmpBasicInfo />}></Route>
          <Route
            path="/appointmentcheck"
            element={<AppointmentCheck />}
          ></Route>

          {/* 인사 등록 페이지 */}
          <Route path="/empregister" element={<EmpRegister />}></Route>
          <Route path="/accountregister" element={<AccountRegister />}></Route>
          <Route path="/empselect" element={<EmpSelect />}></Route>
          <Route path="/setorganize" element={<OrganizeSetting />}></Route>

          {/* 인사 현황 페이지 */}
          <Route path="/hrorganization" element={<HRorganization />}></Route>

          {/* 인사기록카드 페이지 */}
          <Route path="/personnelCard" element={<PersonnelCard />}></Route>

          {/* 근태 페이지 */}
          <Route
            path="/attendanceRegister"
            element={<AttendanceRegister />}
          ></Route>
          <Route
            path="/attendanceRequest"
            element={<AttendanceRequest />}
          ></Route>

          {/* 인사명령(발령) 페이지 */}
          <Route
            path="/personnelappointment"
            element={<PersonnelAppointment />}
          ></Route>
 
          {/* 인사기록카드 페이지 */}
          <Route path="/Test" element={<Test />}></Route>

          {/* 근태/급여 현황 */}
          <Route path="attendancestatus" element={<AttendanceStatus />}></Route>

          {/* 개인급여관리 */}
          <Route path="personalsalary" element={<PersonalSalary />}></Route>

          {/* 월급여조회 페이지 */}
          <Route path="monthlySalaryCheck" element={<MonthlySalaryCheck />}>
            {" "}
          </Route>

          {/* 급여명세서조회 페이지 */}
          <Route path="payslipCheck" element={<PayslipCheck />}></Route>

          {/* 급여지출현황 */}
          <Route
           
            path="salaryExpenditures"
           
            element={<SalaryExpenditures />}
          
          ></Route>

          {/* 휴가 관리 */}
          <Route path="vacationManage" element={<VacationManage />}></Route>

          {/* 휴가 관리 */}
          <Route path="vacationCheck" element={<VacationCheck />}></Route>

          {/* 근무 관리 */}
          <Route path="workManage" element={<WorkManage />}></Route>

          {/* 퇴직승인 */}
          <Route
            path="retirementapproval"
            element={<RetirementApproval />}
          ></Route>
          {/* 퇴직금 산정 */}
          <Route path="severancepaycal" element={<SeverancePayCal />}></Route>

          {/* 퇴직금명세서 */}
          <Route path="severancepay" element={<SeverancePay />}></Route>

          {/* 페이지 찾을 수 없음 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
