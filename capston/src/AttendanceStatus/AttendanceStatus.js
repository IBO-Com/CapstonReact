import React, { useEffect, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import { Select, MenuItem } from "@material-ui/core";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import "../css/AttendanceStatus/AttendanceStatus.css";
import { differenceInSeconds } from "date-fns";
import axios from "axios";
import * as GetAttendance from "../modules/GetAttendance"
import * as GetCDTR from "../modules/getCDTR";


class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2020-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [textName, setTextName] = useState("");
  const [selectDepart, setSelectDepart] = useState("*");
  const [AttendData, setAttendData] = useState([]);
  const [userAttendData, setUserAttendData] = useState();
  const [codeData, setCodeData] = useState({});

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDatetDateChange = (date) => {
    setEndDate(date);
  };

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
  };



  useEffect(() => {
    axios
      .post("http://43.200.115.198:8080/getAttendance.jsp")
      .then((response) => {
        setAttendData(response.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });

      axios
      .post("http://43.200.115.198:8080/getAllCodeNm.jsp")
      .then((response) => {
        setCodeData(response.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);



  return (
    <div className="AttendanceStatus_container">
      <div className="AttendacneStatus_search">
        <span>기준일자</span>
        <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
          <DatePicker
            autoOk
            variant="inline"
            views={["year", "month", "date"]}
            format="yyyy-MM-dd"
            value={startDate}
            inputVariant="outlined"
            showTodayButton
            className="startDate"
            size="small"
            todayLabel="오늘"
            onChange={handleStartDateChange}
          />
        </MuiPickersUtilsProvider>

        <div className="AttendanceStatus_bar"></div>

        <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
          <DatePicker
            autoOk
            variant="inline"
            views={["year", "month", "date"]}
            format="yyyy-MM-dd"
            value={endDate}
            inputVariant="outlined"
            className="startDate"
            showTodayButton
            size="small"
            todayLabel="오늘"
            onChange={handleEndDatetDateChange}
          />
        </MuiPickersUtilsProvider>
        <div className="AttendanceStatus_depart">
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
        </div>

        <FormControl>
          <TextField
            id="outlined-card"
            label="사번/성명"
            variant="outlined"
            size="small"
            margin="small"
            onChange={textNameHandle}
          />
        </FormControl>
        <button className="AttendanceStatus_searchBtn">검색</button>
      </div>
      <div className="AttendanceStatus_content">
        <span>근태/근무현황</span>
        <div className="AttendanceStatus_type">
          <div className="AttendanceStatus_type01">
            <span>전체</span>
            <br></br>
            <span>{userAttendData ? userAttendData[""] : ""}</span>
          </div>
          <div className="AttendanceStatus_type02">
            <span>외근</span>
            <br></br>
            <span>1건</span>
          </div>
          <div className="AttendanceStatus_type03">
            <span>출장</span>
            <br></br>
            <span>1건</span>
          </div>
          <div className="AttendanceStatus_type04">
            <span>재택</span>
            <br></br>
            <span>1건</span>
          </div>
          <div className="AttendanceStatus_type05">
            <span>연장근무</span>
            <br></br>
            <span>1건</span>
          </div>
          <div className="AttendanceStatus_type06">
            <span>휴일대체</span>
            <br></br>
            <span>1건</span>
          </div>
        </div>
        <div className="AttendanceStatus_table">
          {!AttendData ? (
            "No data found"
          ) : (
            <table>
              <thead>
                <tr>
                  <th>일자</th>
                  <th>성명</th>
                  <th>부서</th>
                  <th>직책</th>
                  <th>근태항목</th>
                  <th>시작시간</th>
                  <th>종료시간</th>
                  <th>연장시간(분)</th>
                  <th>야근시간(분)</th>
                </tr>
              </thead>
              <tbody>
                {AttendData.map(function (attend, index) {
                  return (
                    <>
                      <tr>
                        <td>{attend.in_date.slice(0,4)}년 {attend.in_date.slice(4,6)}월 {attend.in_date.slice(6,8)}일</td>
                        <td>{attend.name}</td>
                        <td>{codeData[attend.dept]}</td>
                        <td>{codeData[attend.rank]}</td>
                        <td>{codeData[attend.work_form]}</td>
                        <td>{attend.start_datetime.slice(0,2)}시 {attend.start_datetime.slice(2,4)}분</td>
                        <td>{attend.end_datetime.slice(0,2)}시 {attend.end_datetime.slice(2,4)}분</td>
                        <td>{attend.over_datetime}</td>
                        <td>{attend.night_datetime}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
