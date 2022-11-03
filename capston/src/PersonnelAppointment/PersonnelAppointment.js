import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import "../css/PersonnelAppointment/PersonnelAppointment.css";
import AppointmentModal from "./AppointmentModal";
import * as GetCDTR from "../modules/getCDTR";
import qs from "qs";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}
const App = () => {
  const [startDate, setStartDate] = useState(new Date("2020-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [appointmentData, setAppointmentData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // console.log(openModal);

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
            className="startDate"
            showTodayButton
            size="small"
            todayLabel="오늘"
            onChange={handleEndDatetDateChange}
          />
        </MuiPickersUtilsProvider>

        <button className="PersonnelAppointment_searchBtn">검색</button>
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
                  <td>발령 전 부서</td>
                  <td>발령 후 부서</td>
                  <td>사번</td>
                  <td>성명</td>
                </tr>
              </thead>
              <tbody>
                {appointmentData.map((item, index) => (
                  <tr>
                    {item.app_state === "1" ? (
                      <>
                        <td>{index + 1}</td>
                        <td style={{ minWidth: "20px" }}>
                          {item.app_date.slice(0, 4)}년&nbsp;{" "}
                          {item.app_date.slice(4, 6)}월&nbsp;{" "}
                          {item.app_date.slice(6, 8)}일&nbsp;
                        </td>
                        <td></td>
                        <td style={{ width: "150px" }}>
                          {item.dept === "01"
                            ? "경영지원부"
                            : " " || item.dept === "02"
                            ? "경영관리부"
                            : " " || item.dept === "03"
                            ? "침해대응부"
                            : " " || item.dept === "04"
                            ? "관제센터"
                            : " " || item.dept === "05"
                            ? "보안연구부"
                            : " " || item.dept === "06"
                            ? "보안취약점연구부"
                            : " "}
                        </td>
                        <td>{item.sabun}</td>
                        <td>{item.name}</td>
                      </>
                    ) : (
                      <div></div>
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
                  <td>발령 전 직책</td>
                  <td>발령 후 직책</td>
                  <td>사번</td>
                  <td>성명</td>
                </tr>
              </thead>
              <tbody>
                {appointmentData.map((item, index) => (
                  <tr>
                    {item.app_state === "2" ? (
                      <>
                        <td>{index + 1}</td>
                        <td style={{ minWidth: "20px" }}>
                          {item.app_date.slice(0, 4)}년&nbsp;{" "}
                          {item.app_date.slice(4, 6)}월&nbsp;{" "}
                          {item.app_date.slice(6, 8)}일&nbsp;
                        </td>

                        <td></td>
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
                      <div></div>
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
