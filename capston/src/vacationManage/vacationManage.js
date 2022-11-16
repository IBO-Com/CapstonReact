import React, { useEffect, useState, useRef } from "react";
import "../css/vactionManage/vactionManage.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import { useCookies } from "react-cookie";

import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import qs from "qs";
import ReactToPrint from "react-to-print";

import FormVacationManage from "./formVacationManage";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [selectDepart, setSelectDepart] = useState("*");

  const [annualData, setAnnualData] = useState([]);
  const [sabun, setSabun] = useState();
  const componentRef = useRef(null);
  // const [selectDep, setSelectDep] = useState("*");
  const [toogleState, setToggleState] = useState(1);
  const [retrieveDate, setRetrieveDate] = useState(new Date());
  const [textName, setTextName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [annualState, setAnnualState] = useState(); // 연차휴가 분류
  const [textReasone, setTextReason] = useState(""); // 사유
  const [repName, setRepName] = useState(""); // 대체 근무자명
  const [repRank, setRepRank] = useState(); // 대체 근무자 직책
  const [emerRel, setEmerRel] = useState(); // 비상연락망 관계
  const [emerTel, setEmerTel] = useState(""); // 비상연락망

  const dateFormatString = (date) => {
    // 20201010

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + month + day;
  };

  // 부서 검색
  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  // 사번/성명 인풋
  const handleTextName = (e) => {
    setTextName(e.target.value);
  };

  useEffect(() => {
    /* 쿼리 문 작성 */
    let postParam = {
      sabunOrName: cookies["loginInfo"].id,
    };
    console.log("query : ", postParam);
    postParam = qs.stringify(postParam);

    axios
      .post("http://43.200.115.198:8080/vacationcount.jsp", postParam)
      .then((res) => {
        setAnnualData(res.data.ITEMS[0]);
        let annual = res.data.ITEMS[0];
        console.log("data : ", annual);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  // 연차/휴가 분류
  const handleAnnualState = (e) => {
    console.log(e.target.value);
    setAnnualState(e.target.value);
  };

  // 사유
  const handleTextReason = (e) => {
    setTextReason(e.target.value);
  };

  // 대체 업무자 직책
  const handleRepRank = (e) => {
    console.log(e.target.value);
    setRepRank(e.target.value);
  };

  // 대체 업무자명
  const handleRepName = (e) => {
    console.log(e.target.value);
    setRepName(e.target.value);
  };

  // 비상연락망 관계
  const handleEmerRel = (e) => {
    console.log(e.target.value);
    setEmerRel(e.target.value);
  };

  // 비상연락망
  const handleEmerTel = (e) => {
    console.log(e.target.value);
    setEmerTel(e.target.value);
  };

  // 입력(등록)
  const formRef = useRef();
  const saveSubmit = (e) => {
    e.preventDefault();
    if (formRef.current.reportValidity()) {
      if (window.confirm("신청하시겠습니까?")) {
        let postParam2 = {
          sabun: annualData.sabun,
          remain_annual: annualData.remain_annual,
          ann_start_date: dateFormatString(startDate),
          use_annual: annualData.use_annual,
          name: annualData.name,
          rank: annualData.rank,
          dept: annualData.dept,
          ann_end_date: dateFormatString(endDate),
          vacation: annualState,
          ann_reason: textReasone,
          ann_state: "0",
          team: annualData.team,
          rep_name: repName,
          rep_rank: repRank,
          emer_tel: emerTel,
          emer_rel: emerRel,
        };
        console.log(postParam2);
        postParam2 = qs.stringify(postParam2);

        axios
          .post("http://43.200.115.198:8080/vacationregister.jsp", postParam2)
          .then((response) => {
            console.log(response);
          })
          .catch((Error) => {
            console.log(Error);
          });
      }
    }
  };

  const submitSabun = (sabun) => {
    setSabun(sabun);
    console.log(sabun);
  };

  return (
    <div className="personnelCard_box">
      <div className="card_search_box">
        <div className="card_dateSection"></div>
        <div className="personnelCard_Flex">
          <div className="vmInfoTable">
            <p>휴가 신청자 정보</p>
            <table className="vm_InfoTable">
              <thead>
                <tr>
                  <th>신청자</th>
                  <th>소속</th>
                  <th>잔여 연차</th>
                  <th>사용 연차</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{annualData ? annualData["name"] : ""}</td>
                  <td>
                    {annualData ? annualData["deptKR"] : ""}{" "}
                    {annualData ? annualData["teamKR"] : ""}
                  </td>
                  {/*부서+팀 붙여서*/}
                  <td>{annualData ? annualData["remain_annual"] : ""} </td>
                  <td>{annualData ? annualData["use_annual"] : ""}</td>
                </tr>
              </tbody>
            </table>
            <form ref={formRef}>
              <p className="vm_class">연차/휴가 분류</p>
              <input
                className="vm_radioItem"
                type="radio"
                value="0"
                name="kind_name"
                onChange={handleAnnualState}
              ></input>{" "}
              <label className="vm_yeon">연차</label>
              <input
                className="vm_radioItem"
                type="radio"
                value="01"
                name="kind_name"
                onChange={handleAnnualState}
              ></input>{" "}
              <label className="vm_ban">오전반차</label>
              <input
                className="vm_radioItem"
                type="radio"
                value="02"
                name="kind_name"
                onChange={handleAnnualState}
              ></input>{" "}
              <label className="vm_mon">오후반차</label>
              <input
                className="vm_radioItem"
                type="radio"
                value="03"
                name="kind_name"
                onChange={handleAnnualState}
              ></input>{" "}
              <label className="vm_hu">경조휴가</label>
              <input
                className="vm_radioItem"
                type="radio"
                value="04"
                name="kind_name"
                onChange={handleAnnualState}
              ></input>{" "}
              <label className="vm_sick">병가</label>
              <input
                className="vm_radioItem"
                type="radio"
                value="05"
                name="kind_name"
                onChange={handleAnnualState}
              ></input>{" "}
              <label className="vm_other">기타</label>
              <p>
                <br></br>연차/휴가 일시
              </p>
              <span>시작일</span>
              <DatePicker
                className="vm_date"
                dateFormat="yyyy년 MM월 dd일"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                selectsStart
              />
              <span>마지막일</span>
              <DatePicker
                className="vm_date"
                dateFormat="yyyy년 MM월 dd일"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                selectsEnd
              />
              <p>사유</p>
              <textarea
                placeholder="연차/휴가 사유를 적어주세요."
                className="vm_reason"
                name="reason"
                rows={2}
                cols={70}
                onChange={handleTextReason}
              ></textarea>
              <p>
                <br></br>대체 업무자
              </p>{" "}
              {/* 폼에 출력시 >> 이과학 대리 << 로 출력*/}
              <form>
                <label className="vm_relationship">
                  직책&nbsp; : &nbsp;&nbsp;
                </label>
                <select
                  name="relationship"
                  id="vm_select"
                  onChange={handleRepRank}
                >
                  <option value="" disabled selected>
                    &nbsp;-- 선택해주세요 --&nbsp;
                  </option>
                  <option value="1">사원</option>
                  <option value="2">대리</option>
                  <option value="3">과장</option>
                  <option value="4">차장</option>
                  <option value="5">부장</option>
                </select>
                <br></br>
                <label>
                  이름&nbsp; : &nbsp;&nbsp;
                  <input
                    className="vm_repName"
                    type="text"
                    autocomplete="off"
                    name="name"
                    onChange={handleRepName}
                  ></input>
                </label>
              </form>
              <span className="vm_daesin">
                대체 업무자는 같은 팀 직원만 가능합니다!
              </span>
              <p>
                <br></br>비상연락망
              </p>{" "}
              {/* 폼에 출력시 >> 모 ) 010-0000-0000 << 로 출력*/}
              <div className="vm_bisang">
                <label className="vm_relationship">
                  관계&nbsp; : &nbsp;&nbsp;
                </label>
                <select
                  name="relationship"
                  id="vm_select"
                  onChange={handleEmerRel}
                >
                  <option value="" disabled selected>
                    &nbsp;-- 선택해주세요 --&nbsp;
                  </option>
                  <option value="0">부</option>
                  <option value="01">모</option>
                  <option value="02">형제</option>
                  <option value="03">자매</option>
                  <option value="04">직장동료</option>
                  <option value="05">친구</option>
                </select>
                <br></br>
                <label>
                  전화번호&nbsp; : &nbsp;&nbsp;
                  <input
                    className="vm_emerTel"
                    type="text"
                    name="cellPhone"
                    autocomplete="off"
                    id="cellPhone"
                    maxlength="13"
                    onChange={handleEmerTel}
                  />
                </label>
                <br></br>
              </div>
              <br></br>
              <button
                type={"button"}
                className="vm_save_btn"
                onClick={(e) => {
                  saveSubmit(e);
                  submitSabun(annualData.sabun);
                }}
              >
                입력
              </button>
            </form>
          </div>

          <div className="card_empCard">
            <div className="card_Btnbox">
              <ReactToPrint
                trigger={() => <button className="print_Btn">인쇄</button>}
                content={() => componentRef.current}
              />
            </div>
            <div className="Card_viewer">
              {toogleState === 1 ? (
                <FormVacationManage
                  componentRef={componentRef}
                  sabun={sabun}
                  retrieveDate={retrieveDate}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
