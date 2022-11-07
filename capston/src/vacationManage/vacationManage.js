import React, { useEffect, useState, useRef } from "react";
import "../css/vactionManage/vactionManage.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import { FormControl, Select, MenuItem, TextField, Button } from "@mui/material";
import qs from "qs";
import ReactToPrint from "react-to-print";
import FormVacationManage from "./formVacationManage";

const App = () => {
  const [selectDepart, setSelectDepart] = useState("*");
  const [peopleData, setPeopleData] = useState();
  const [sabun, setSabun] = useState();
  const componentRef = useRef(null);
  const [selectDep, setSelectDep] = useState('*');
  const [toogleState, setToggleState] = useState(1);
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
  const [textName, setNameText] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    return year + "-" + month;
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleChange = (event) => {
    setSelectDep(event.target.value)
  };

  const handleStartDateChange = (date) => {
    setRetrieveDate(getFormatDate(date));
  };


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

    //console.log(query);

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((res) => {
        setPeopleData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
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
              onChange={textNameHandle}
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
                  <td>김누구</td>
                  <td>관제센터 보안관제팀</td> {/*부서+팀 붙여서*/}
                  <td>13개</td>
                  <td>2개</td>
                </tr>
              </tbody>
            </table>

            <p className="vm_class">연차/휴가 분류</p>
            <input type="radio" name="kind_name"></input> <label className="vm_yeon">연차</label>
            <input type="radio" name="kind_name"></input> <label className="vm_ban">반차</label>
            <input type="radio" name="kind_name"></input> <label className="vm_mon">월차</label>
            <input type="radio" name="kind_name"></input> <label className="vm_hu">경조휴가</label>
            <input type="radio" name="kind_name"></input> <label className="vm_sick">병가</label>
            <input type="radio" name="kind_name"></input> <label className="vm_other">기타</label>

            <p><br></br>연차/휴가 일시</p>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />

            <p>사유</p>
            <textarea placeholder="연차/휴가 사유를 자세히 적어주세요." className="vm_reason" name="reason" rows={2} cols={80}></textarea>

            <p><br></br>대체 업무자</p> {/* 폼에 출력시 >> 이과학 대리 << 로 출력*/}
            <form>
              <label>직책&nbsp; : &nbsp;&nbsp;<input type="text" autocomplete="off" name="rank"></input></label><br></br>
              <label>이름&nbsp; : &nbsp;&nbsp;<input type="text" autocomplete="off" name="name"></input></label>
            </form>
            <span className="vm_daesin">대체 업무자는 같은 팀 직원만 가능합니다!</span>

            <p><br></br>비상연락망</p> {/* 폼에 출력시 >> 모 ) 010-0000-0000 << 로 출력*/}
            <div className="vm_bisang">
              <label>관계&nbsp; : &nbsp;&nbsp;<input type="text" name="team" autocomplete="off"></input></label><br></br>
              <label>전화번호&nbsp; : &nbsp;&nbsp;<input type="text" name="cellPhone" autocomplete="off" id="cellPhone" maxlength="13" /></label><br></br>
            </div>
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
                <FormVacationManage componentRef={componentRef} sabun={sabun} retrieveDate={retrieveDate} />
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
