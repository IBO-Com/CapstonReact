import { TextField } from "@mui/material";
import React, { useState } from "react";
import "../css/PersonnelAppointment/AppointmentModal.css";
import testimg from "../img/testimg.jpg";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}
const AppointmentModal = ({ openModal, setOpenModal }) => {
  const [startDate, setStartDate] = useState(new Date("2022-10-01"));
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  return (
    <div className="AppointmentModal_container">
      <div className="AppointmentModal_title">
        <span>인사발령</span>
        <FormControl>
          <TextField
            id="outlined-card"
            label="사번/성명"
            variant="outlined"
            size="small"
            // onChange={textNameHandle}
          />
        </FormControl>
        <button className="AppointmentModal_searchBtn">검색</button>
      </div>

      <div className="AppointmentModal_userInfo">
        <div className="AppointmentModal_userImg">
          <img className="AppointmentModal_img" src={testimg} alt="이미지" />
        </div>
        <div className="AppointmentModal_infoTable">
          <table>
            <tr>
              <td>사번</td>
              <td>2022771010</td>
            </tr>
            <tr>
              <td>성명</td>
              <td>김명지</td>
            </tr>
            <tr>
              <td>소속</td>
              <td>경영관리부</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="AppointmentModal_appointment">
        <span>발령일자</span>
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
        <span className="AppointmentModal_state">발령</span>
        <FormControl>
          <Select
            sx={{
              minWidth: "153px",
              height: 39,
              marginLeft: "15px",
              marginRight: "26px",
            }}
          >
            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"*"}>
              전체
            </MenuItem>
            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"01"}>
              승진
            </MenuItem>
          </Select>
        </FormControl>
        <div className="AppointmentModal_table">
          <table>
            <thead>
              <tr>
                <td>발령항목</td>
                <td>발령 전</td>
                <td>발령 후</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>부서</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>직책</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>비고</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="AppointmentModal_btns">
        <button
          className="AppointmentModal_cancelBtn"
          onClick={() => setOpenModal(false)}
        >
          취소
        </button>
        <button className="AppointmentModal_registerBtn">등록</button>
      </div>
    </div>
  );
};

export default AppointmentModal;
