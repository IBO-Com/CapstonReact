import React, { useEffect, useState, useRef } from "react";
import "../css/vactionManage/vactionManage.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
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
  const [selectDepart, setSelectDepart] = useState("*");

  const [annualData, setAnnualData] = useState([]);
  const [sabun, setSabun] = useState();
  const componentRef = useRef(null);
  const [selectDep, setSelectDep] = useState("*");
  const [toogleState, setToggleState] = useState(1);
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
  const [textName, setTextName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [annualState, setAnnualState] = useState(); // 연차휴가 분류
  const [textReasone, setTextReason] = useState(""); // 사유
  const [repName, setRepName] = useState(""); // 대체 근무자명
  const [repRank, setRepRank] = useState(); // 대체 근무자 직책
  const [emerRel, setEmerRel] = useState(); // 비상연락망 관계
  const [emerTel, setEmerTel] = useState(""); // 비상연락망

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    return year + "-" + month;
  }

  const handleChange = (event) => {
    setSelectDep(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setRetrieveDate(getFormatDate(date));
  };

  // 부서 검색
  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  // 사번/성명 인풋
  const handleTextName = (e) => {
    setTextName(e.target.value);
  };

  // 검색
  const sendSubmit = () => {
    console.log("send submit");

    /* 쿼리 문 작성 */
    let postParam = {};
    let query = {};

    if (textName.trim() == "") {
      delete query["sabunOrName"];
    } else {
      query["sabunOrName"] = textName;
    }
    if (selectDepart == "*") {
      delete query["dept"];
    } else {
      query["dept"] = selectDepart;
    }

    postParam = qs.stringify(query);

    axios
      .post("http://43.200.115.198:8080/vacationCheck.jsp", postParam)
      .then((res) => {
        setAnnualData(res.data.ITEMS[0]);
        let annual = res.data.ITEMS[0];
        console.log("data : ", annual);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  // 연차/휴가 분류
  const handleAnnualState = (e) => {
    console.log(e.target.value);
    setAnnualState(e.target.value);
  };

  // 날짜 선택
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
    setRepName(e.target.value);
  };

  // 비상연락망 관계
  const handleEmerRel = (e) => {
    console.log(e.target.value);
    setEmerRel(e.target.value);
  };

  // 비상연락망
  const handleEmerTel = (e) => {
    setEmerTel(e.target.value);
  };

  // 입력(등록)
  const saveSubmit = () => {
    let postParam2 = {
      id: annualData.id,
      remain_annual: annualData.remain_annual,
      ann_start_date: startDate,
      use_annual: annualData.use_annual,
      name: annualData.name,
      rank: annualData.rank,
      dept: annualData.dept,
      ann_end_date: endDate,
      vacation: annualState,
      ann_reason: textReasone,
      ann_stae: 0,
      team: annualData.team,
      rep_name: repName,
      rep_rank: repRank,
      emer_tel: emerTel,
      emerRel: emerRel,
    };
    console.log(postParam2);
    postParm2 = qs.stringify(postParm2);
  };

  return (
    <div className="personnelCard_box">
      <div className="card_search_box">
        <div className="card_dateBox">
          <FormControl>
            <Select
              value={selectDepart || ""}
              sx={{
                minWidth: "153px",
                height: 39,
                marginLeft: "15px",
                marginRight: "26px",
              }}
              onChange={handleSelectDepart}
            >
              <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"*"}>
                전체부서
              </MenuItem>

              <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"01"}>
                경영지원부
              </MenuItem>

              <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"02"}>
                경영관리부
              </MenuItem>

              <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"03"}>
                침해대응부
              </MenuItem>

              <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"04"}>
                관제센터
              </MenuItem>

              <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"05"}>
                보안연구부
              </MenuItem>

              <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"06"}>
                보안취약점연구부
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              id="outlined-card"
              label="사번/성명"
              variant="outlined"
              size="small"
              onChange={handleTextName}
            />
          </FormControl>
          <button
            className="card_search_btn"
            onClick={() => {
              sendSubmit();
            }}
          >
            검색
          </button>
        </div>

        <hr className="card_lineBar"></hr>

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
            <p className="vm_class">연차/휴가 분류</p>
            <input
              type="radio"
              value="0"
              name="kind_name"
              onChange={handleAnnualState}
            ></input>{" "}
            <label className="vm_yeon">연차</label>
            <input
              type="radio"
              value="01"
              name="kind_name"
              onChange={handleAnnualState}
            ></input>{" "}
            <label className="vm_ban">오전반차</label>
            <input
              type="radio"
              value="02"
              name="kind_name"
              onChange={handleAnnualState}
            ></input>{" "}
            <label className="vm_mon">오후반차</label>
            <input
              type="radio"
              value="03"
              name="kind_name"
              onChange={handleAnnualState}
            ></input>{" "}
            <label className="vm_hu">경조휴가</label>
            <input
              type="radio"
              value="04"
              name="kind_name"
              onChange={handleAnnualState}
            ></input>{" "}
            <label className="vm_sick">병가</label>
            <input
              type="radio"
              value="05"
              name="kind_name"
              onChange={handleAnnualState}
            ></input>{" "}
            <label className="vm_other">기타</label>
            <p>
              <br></br>연차/휴가 일시
            </p>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
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
                <option value="01">사원</option>
                <option value="02">대리</option>
                <option value="03">과장</option>
                <option value="04">차장</option>
                <option value="05">부장</option>
              </select>
              <br></br>
              <label>
                이름&nbsp; : &nbsp;&nbsp;
                <input
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
              className="vm_save_btn"
              onClick={() => {
                saveSubmit();
              }}
            >
              입력
            </button>
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
