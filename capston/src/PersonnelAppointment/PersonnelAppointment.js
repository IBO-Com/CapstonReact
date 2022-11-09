import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";
import "../css/PersonnelAppointment/PersonnelAppointment.css";
import AppointmentModal from "./AppointmentModal";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}
const App = () => {
  const [startDate, setStartDate] = useState(new Date("2022-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [appointmentData, setAppointmentData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const deptObj = {
    "01": "경영지원부",
    "02": "경영관리부",
    "03": "침해대응부",
    "04": "관제센터",
    "05": "보안연구부",
    "06": "보안취약점연구부",
  };

  let leftIndex = 1;
  let rightIndex = 1;

  useEffect(() => {
    axios
      .post("http://43.200.115.198:8080/personnelAppointment.jsp")
      .then((res) => {
        setAppointmentData(res.data.ITEMS);
      })
      .catch((Error) => {
        alert("에러!!");
      });
  }, []);

  useEffect(() => {
    // 배열 : map, for, foreach
    // json : Object.keys(peopleData);
    console.log(appointmentData);
  }, [appointmentData]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDatetDateChange = (date) => {
    setEndDate(date);
  };

  const sendSubmit = () => {
    console.log("send submit");
    /* 날짜 포멧 */
    let sYear = String(startDate.getFullYear());
    let sMonth = startDate.getMonth() + 1;
    let sDay = startDate.getDate();

    let eYear = String(endDate.getFullYear());
    let eMonth = endDate.getMonth() + 1;
    let eDay = endDate.getDate();

    if (sMonth < 10) {
      sMonth = "0" + sMonth;
    }
    if (sDay < 10) {
      sDay = "0" + sDay;
    }

    if (eMonth < 10) {
      eMonth = " 0" + eMonth;
    }
    if (eDay < 10) {
      eDay = " 0" + eDay;
    }

    let sDate = sYear + sMonth + sDay;
    let eDate = eYear + eMonth + eDay;

    /* 쿼리 문 작성 */
    let postParam2 = {};
    let query = {};

    query["startDate"] = sDate;
    query["endDate"] = eDate;

    postParam2 = qs.stringify(query);

    axios
      .post("http://43.200.115.198:8080/personnelAppointment.jsp", postParam2)
      .then((res) => {
        setAppointmentData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <div className="PersonnelAppointment_container">
      <div className="PersonnelAppointment_search">
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

        <div className="PersonnelAppointment_bar"></div>

        <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
          <DatePicker
            autoOk
            variant="inline"
            views={["year", "month", "date"]}
            format="yyyy-MM-dd"
            value={endDate}
            inputVariant="outlined"
            className="endDate"
            showTodayButton
            size="small"
            todayLabel="오늘"
            onChange={handleEndDatetDateChange}
          />
        </MuiPickersUtilsProvider>

        <button
          className="PersonnelAppointment_searchBtn"
          onClick={() => sendSubmit()}
        >
          검색
        </button>
      </div>
      <div className="PersonnelAppointment_content">
        <div className="PersonnelAppointment_title">
          <span>인사명령조회</span>
          <button
            className="PersonnelAppointment_registerBtn"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            발령등록
          </button>
        </div>

        {openModal === true ? (
          <AppointmentModal
            appointmentData={appointmentData}
            setAppointmentData={setAppointmentData}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : (
          ""
        )}

        <div className="PersonnelAppointment_tables">
          <div className="PersonnelAppointment_dept">
            <span>부서이동</span>
            <table>
              <thead>
                <tr>
                  <td>번호</td>
                  <td>발령일자</td>
                  <td>사번</td>
                  <td>본부</td>
                  <td>부서</td>
                  <td>팀</td>
                  <td>성명</td>
                </tr>
              </thead>
              <tbody>
                {appointmentData.map((item) => (
                  <tr>
                    {item.app_state === "1" ? (
                      <>
                        <td>{leftIndex++}</td>
                        <td style={{ minWidth: "20px" }}>
                          {item.app_date.slice(0, 4)}년&nbsp;{" "}
                          {item.app_date.slice(4, 6)}월&nbsp;{" "}
                          {item.app_date.slice(6, 8)}일&nbsp;
                        </td>
                        <td style={{ minWidth: "20px" }}>{item.sabun}</td>
                        <td style={{ minWidth: "20px" }}>
                          {item.center === "H"
                            ? "경영관리본부"
                            : "" || item.center === "C"
                            ? "사이버보안본부"
                            : "" || item.center === "S"
                            ? "보안연구본부"
                            : ""}
                        </td>
                        <td style={{ minWidth: "20px" }}>
                          {deptObj[item.dept]}
                        </td>
                        <td style={{ minWidth: "20px" }}>
                          {item.team === "101"
                            ? "인사관리팀"
                            : "" || item.team === "102"
                            ? "마케팅팀"
                            : "" || item.team === "201"
                            ? "총무회계팀"
                            : "" || item.team === "202"
                            ? "경리팀"
                            : "" || item.team === "301"
                            ? "침해대응팀"
                            : "" || item.team === "302"
                            ? "위협분석팀"
                            : "" || item.team === "401"
                            ? "보안관제팀"
                            : "" || item.team === "402"
                            ? "정보보호팀"
                            : "" || item.team === "501"
                            ? "연구팀"
                            : "" || item.team === "502"
                            ? "연구기획팀"
                            : "" || item.team === "601"
                            ? "종합분석팀"
                            : "" || item.team === "602"
                            ? "취약점분석팀"
                            : ""}
                        </td>
                        <td>{item.name}</td>
                      </>
                    ) : (
                      <></>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="PersonnelAppointment_rank">
            <span>승진</span>
            <table>
              <thead>
                <tr>
                  <td>번호</td>
                  <td>발령일자</td>
                  <td>직책</td>
                  <td>사번</td>
                  <td>성명</td>
                </tr>
              </thead>
              <tbody>
                {appointmentData.map((item, index) => (
                  <tr>
                    {item.app_state === "2" ? (
                      <>
                        <td>{rightIndex++}</td>
                        <td style={{ minWidth: "20px" }}>
                          {item.app_date.slice(0, 4)}년&nbsp;{" "}
                          {item.app_date.slice(4, 6)}월&nbsp;{" "}
                          {item.app_date.slice(6, 8)}일&nbsp;
                        </td>
                        <td>
                          {" "}
                          {item.rank === "1"
                            ? "사원"
                            : " " || item.rank === "2"
                            ? "대리"
                            : " " || item.rank === "3"
                            ? "과장"
                            : "" || item.rank === "4"
                            ? "차장"
                            : " " || item.rank === "5"
                            ? "이사"
                            : "" || item.rank === "6"
                            ? "사장"
                            : " " || item.rank === "7"
                            ? "대표이사"
                            : " "}
                        </td>
                        <td>{item.sabun}</td>
                        <td>{item.name}</td>
                      </>
                    ) : (
                      <></>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
