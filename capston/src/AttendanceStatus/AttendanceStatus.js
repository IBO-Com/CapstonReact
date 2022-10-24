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
import * as GetAttendance from "../modules/GetAttendance"


class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2020-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [selectDepart, setSelectDepart] = useState("*");

  const [AttendData, setAttendData] = useState([]);

  useEffect(() => {
    GetAttendance.getInfo(setAttendData);
  }, [])

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDatetDateChange = (date) => {
    setEndDate(date);
  };

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

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
          // onChange={textNameHandle}
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
            <span>5건</span>
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
          <table>
            <thead>
              <tr>
                <td>일자</td>
                <td>요일</td>
                <td>성명</td>
                <td>부서</td>
                <td>직책</td>
                <td>근태항목</td>
                <td>시작시각</td>
                <td>종료시각</td>
                <td>소요시각</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022-10-01</td>
                <td>토요일</td>
                <td>김명지</td>
                <td>경영지원부</td>
                <td>사원</td>
                <td>연장근무</td>
                <td>18:00</td>
                <td>20:00</td>
                <td>2:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
