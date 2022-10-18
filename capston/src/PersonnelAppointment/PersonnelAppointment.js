import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import "../css/PersonnelAppointment/PersonnelAppointment.css";
import AppointmentModal from "./AppointmentModal";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}
const App = () => {
  const [startDate, setStartDate] = useState(new Date("2020-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [peopleData, setPeopleData] = useState();
  const [openModal, setOpenModal] = useState(false);

  console.log(openModal)

  useEffect(() => {
    axios
      .post("http://43.200.115.198:8080/empselect.jsp")
      .then((res) => {
        setPeopleData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  useEffect(() => {
    // 배열 : map, for, foreach
    // json : Object.keys(peopleData);
    console.log(peopleData);
  }, [peopleData]);

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
          <button className="PersonnelAppointment_registerBtn" onClick={()=>{setOpenModal(true)}}>발령등록</button>
        </div>

        {openModal === true ? <AppointmentModal openModal={openModal} setOpenModal = {setOpenModal} /> : ""}

        <div className="PersonnelAppointmet_table">
          <table>
            <thead>
              <tr>
                <td>번호</td>
                <td>발령구분</td>
                <td>발령일</td>
                <td>사번</td>
                <td>성명</td>
                <td>발령내용</td>
                <td>비고</td>
              </tr>
            </thead>
            {peopleData ? (
              <tbody>
                {peopleData.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td> </td>
                    <td> </td>
                    <td>{item.sabun}</td>
                    <td>{item.name}</td>
                    <td> </td>
                    <td> </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div></div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
