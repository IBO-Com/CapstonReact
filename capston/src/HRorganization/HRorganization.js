import React, { useState } from "react";
import "../css/HRorganization/HRorganization.css";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Select from "@mui/material/Select";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";
import HrInfoTable from "./HrInfoTable";
import "../css/HRorganization/HrInfoTable.css";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}
const HRorganization = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const [selectDepart, setSelectDepart] = useState()

  const [textName, setTextName]= useState();

  const handleStartDateChange = (date) => {
    setStartDate(getFormatDate(date));
  };

  const handleEndDatetDateChange = (date) => {
    setEndDate(getFormatDate(date));
  };


  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + "-" + month + "-" + day;
  }

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };


  const textNameHandle = (e) => {
    setTextName(e.target.value);
  }







  return (
    <>
      <div className="HRorganization_main">
        <div className="HRorganization_dateBox">
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
          <div className="HRorganization_bar"></div>

          
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
       
            <FormControl>
              <Select
                value = {selectDepart || ""}
                sx={{
                  minWidth: "153px",
                  height: 39,
                  marginLeft: "15px",
                  marginRight: "26px",
                }}
                onChange={handleSelectDepart}
              >
                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"전체부서"}>
                  전체부서
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="사번/성명"
                variant="outlined"
                size="small"
                onChange={textNameHandle}
              />
            </FormControl>
            <button className="HRorganization_btn">검색</button>
        </div>
        <HrInfoTable startDate={startDate} endDate = {endDate} selectDepart = {selectDepart} textName = {textName}/>
      </div>
    </>
  );
};

export default HRorganization;
