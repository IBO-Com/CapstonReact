import React, { useState } from "react";
import testimg from "./img/testimg.jpg";
import "./css/empinfo/empinfo.css";
import Empbase from "./empInfo_detail/Empbase";
import Appointment from "./empInfo_detail/Appointment";
import Account from "./empInfo_detail/Account";

const App = () => {
  const [toogleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="empInfo">
      <div className="plzEmp">
        <div>
          <div className="empWrapimg">
            <img className="empimg" src={testimg} alt="이미지" />
          </div>
        </div>

        <div className="nameAnddept">
          <p className="empinfoName">김 명 지</p>
          <p className="empinfoDept">경영관리본부</p>
        </div>

        <div class="empBox">
          <table class="empFirstTable">
            <tbody class="empinfoList">
              <tr>
                <td>ㆍ사번</td>
                <td>ㆍ재직상태</td>
                <td>ㆍ부서명</td>
                <td>ㆍ직책</td>
                <td>ㆍ사원구분</td>
              </tr>
              <tr>
                <td>nnnnnn</td>
                <td>재직</td>
                <td>경영지원부</td>
                <td>사원</td>
                <td>임원</td>
              </tr>
              <br></br>
              <tr>
                <td>ㆍ생년월일</td>
                <td>ㆍ입사일</td>
                <td>ㆍ근속기간</td>
                <td>ㆍ현부서발령일</td>
                <td>ㆍ퇴사일</td>
              </tr>
              <tr>
                <td>2000-00-00</td>
                <td>2022-09-01</td>
                <td>n년 n개월</td>
                <td>2022-10-01</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="empLine">
        <hr className="empFirstLine" align="left"></hr>
        <div className="empTabFlex">
          <div
            class="empBasic btn"
            onClick={() => {
              toggleTab(1);
            }}
          >
            인사기본
          </div>
          <div
            class="appoint btn"
            onClick={() => {
              toggleTab(2);
            }}
          >
            발령
          </div>
          <div
            class="account btn"
            onClick={() => {
              toggleTab(3);
            }}
          >
            계좌
          </div>
        </div>

        <hr className="empFirstLine" align="left"></hr>
        <div>
          {toogleState === 1 ? <Empbase /> : ""}
          {toogleState === 2 ? <Appointment /> : ""}
          {toogleState === 3 ? <Account /> : ""}
        </div>
      </div>
    </div>
  );
};

export default App;
