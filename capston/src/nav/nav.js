import { Link } from "react-router-dom";
import "../css/nav/nav.css";

import Basic from "../img/basic.png";
import Person from "../img/person.png";
import Calendar from "../img/calendar.png";
import Paid from "../img/paid.png";
import Leave from "../img/leave.png";

function App() {
  return (
    <div className="navStyle">
      <Link to="/1">
        <span>기본정보</span>
      </Link>

      <Link to="/empinfo">
        <span className="TapOne">인사/조직관리</span>
        <div className="TapOne_Dropdown">
          <a href="">인사정보</a>
          <br></br>
          <a href="">인사정보등록</a>
          <br></br>
          <a href="">인사/조직관리</a>
          <br></br>
          <a href="">조직관리</a>
          <br></br>
          <a href="">인사기록카드</a>
          <br></br>
          <a href="">사원정보현황</a>
          <br></br>
          <a href="">인사명령(발령)</a>
        </div>
      </Link>

      <Link to="/empregister">
        <span>인사기본관리</span>
      </Link>

      <Link to="/3">
        <span>근태관리</span>
      </Link>

      <Link to="/4">
        <span>급여관리</span>
      </Link>

      <Link to="/5">
        <span>퇴직관리</span>
      </Link>
    </div>
  );
}

export default App;