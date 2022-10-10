import { Link } from "react-router-dom";
import "../css/nav/nav.css";

import Basic from "../img/basic.png";
import Person from "../img/person.png";
import Calendar from "../img/calendar.png";
import Paid from "../img/paid.png";
import Leave from "../img/leave.png";
import { useState } from "react";

function App() {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };


  return (
    <div className="nav_wrapper">
      <div className="nav_accordion">
        {Object.keys(nav).map((item, i) => (
          <div className={selected == i ? "nav_item_show" : "nav_item" }>
            <div className="nav_title" onClick={() => toggle(i)}>
              <h3>{item}</h3>
            </div>
            <div className={selected === i ? "nav_menu_show" : "nav_menu"}>
                {
                  nav[item].menu.map((item2, i2) => (
                    <Link className="nav_link" to={nav[item].link[i2]}> 
                      <div className="nav_text">
                        {item2}
                      </div>
                    </Link>
                  ))
                }

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const nav = {
  "기본정보" : {
    menu: ["공통코드정보", "조직도"],
    link: [
      "/mainNav/a1",
      "/mainNav/a2",
    ],
  },
  "인사/조직관리": {
    menu: [
      "인사정보",
      "인사/정보등록",
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
      "/mainNav/b4",
      "/mainNav/b5",
      "/mainNav/hrorganization",
      "/mainNav/b7",
    ]
  },
  근태관리: {
    menu: [
      "근무관리",
      "휴가관리",
      "근태/근무신청",
      "근태/근무현황",
      "근태마감",
    ],
    link: [
      "/mainNav/c1",
      "/mainNav/c2",
      "/mainNav/c3",
      "/mainNav/c4",
      "/mainNav/c5",
    ]
  },
  "급여관리": {
    menu: ["급여기본관리", "개인급여관리", "월급여조회", "급여명세서조회"],
    link: [
      "/mainNav/d1",
      "/mainNav/d2",
      "/mainNav/d3",
      "/mainNav/d4",
    ]
  },
  "퇴직관리": {
    menu: ["퇴직승인", "퇴직금산정", "퇴직소득영수증"],
    link: [
      "/mainNav/e1",
      "/mainNav/e2",
      "/mainNav/e3",
    ]
  },
  "테스트": {
    menu: ["page 1", "page 2", "page 3"],
    link: [
      "/mainNav/test1",
      "/mainNav/test2",
      "/mainNav/test3",
      
    ]
  }
};

export default App;
