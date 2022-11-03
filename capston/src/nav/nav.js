import { Link } from "react-router-dom";
import "../css/nav/nav.css";

import { useState } from "react";
import * as Cookie from "../cookies/cookies";

import Plus from "../img/nav/TabPlus.png";
import PlusN from "../img/nav/TabPlusN.png";
import User from "../img/nav/TabUser.png";
import UserN from "../img/nav/TabUserN.png";
import Cal from "../img/nav/TabCal.png";
import CalN from "../img/nav/TabCalN.png";
import Won from "../img/nav/TabWon.png";
import WonN from "../img/nav/TabWonN.png";
import Leave from "../img/nav/TabLeave.png";
import LeaveN from "../img/nav/TabLeaveN.png";

function App({ currentClick, setCurrentClick }) {
  let icons = [Plus, User, Cal, Won, Leave];
  let iconsN = [PlusN, UserN, CalN, WonN, LeaveN];
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  const LinkOnClick = (item) => {
    setCurrentClick(item);
  };

  return (
    <div className="nav_wrapper">
      <div className="nav_block" />
      <div className="nav_accordion">
        {console.log(Cookie.getCookie("loginInfo").authority)}
        {Object.keys(nav).map((item, i) => (
          <div className={selected == i ? "nav_item_show" : "nav_item"}>
            <div className="nav_title" onClick={() => toggle(i)}>
              <img
                src={selected == i ? icons[i] : iconsN[i]}
                className="nav_tab_img"
              />
              <h3 className="nav_title_text">{item}</h3>
            </div>
            <div className={selected === i ? "nav_menu_show" : "nav_menu"}>
              {nav[item].menu.map((item2, i2) => (
                <Link
                  className="nav_link"
                  to={nav[item].link[i2]}
                  onClick={() => {
                    LinkOnClick(item2);
                  }}
                >
                  <div
                    className={
                      currentClick == item2 ? "nav_clicked" : "nav_text"
                    }
                  >
                    {item2}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const nav = {
  기본정보: {
    menu: ["공통코드정보", "조직도"],
    link: ["/mainNav/setCodeCommon", "/mainNav/a2"],
  },
  "인사/조직관리": {
    menu: [
      "인사정보",
      "인사정보등록",
      "인사/정보관리",
      "조직관리",
      "인사기록카드",
      "사원정보현황",
      "인사명령",
    ],
    link: [
      "/mainNav/empinfo",
      "/mainNav/empregister",
      "/mainNav/b3",
      "/mainNav/setorganize",
      "/mainNav/personnelcard",
      "/mainNav/hrorganization",
      "/mainNav/personnelappointment",
    ],
  },
  근태관리: {
    menu: ["근태등록", "근무관리", "휴가관리", "근태/근무현황"],
    link: [
      "/mainNav/attendanceregister",
      "/mainNav/workManage",
      "/mainNav/vacationManage",
      "/mainNav/attendancestatus",
    ],
  },
  급여관리: {
    menu: ["개인급여관리", "월급여조회", "급여명세서조회", "급여지출현황"],
    link: [
      "/mainNav/personalsalary",
      "/mainNav/monthlySalaryCheck",
      "/mainNav/payslipCheck",
      "/mainNav/salaryExpenditures",
    ],
  },
  퇴직관리: {
    menu: ["퇴직승인", "퇴직금산정", "퇴직금명세서"],
    link: [
      "/mainNav/retirementapproval",
      "/mainNav/severancepaycal",
      "/mainNav/severancepay",
    ],
  },
  테스트: {
    menu: ["테스트 필요하면 쓰세욥"],
    link: ["/mainNav/t1"],
  },
};

export default App;
