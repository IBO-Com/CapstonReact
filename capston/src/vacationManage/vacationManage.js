import React, { useState } from "react";
import "../css/vactionManage/vactionManage.css";
import VacationManageCard from "../vacationManage/vacationManageCard";
import { FormControl, Select, MenuItem, TextField, Button } from "@mui/material";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2020-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [selectDep, setSelectDep] = useState('*');
  const [textName, setNameText] = useState('');

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDatetDateChange = (date) => {
    setEndDate(date);
  };

  const handleChange = (event) => {
    setSelectDep(event.target.value)
  };

  const textNameHandle = (event) => {
    setNameText(event.target.value)
    console.log(event.target.value);
  }


  return (
    <div className="vactionManage_App">
      <FormControl sx={{ m: 1, marginTop: '15px', marginBottom: '15px', minWidth: 150, display: 'flex', flexDirection: 'row' }}>
        <Select
          value={selectDep}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ marginLeft: '60px', height: '40px', marginRight: '30px', width: '210px', textAlign: 'center' }}
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

        <TextField
          sx={{ width: '200px', height: '40px', marginRight: '30px' }}
          id="outlined-basic"
          label="사번/성명"
          variant="outlined"
          size="small"
          onChange={textNameHandle}
        />

        <Button variant="contained" className="vm_searchBtn" sx={{ height: '40px', width: '100px' }}>검색</Button>
      </FormControl>

      <div className="vactionManage_line"></div>

      <div className="vm_perInfo">
        <p>신청자 정보</p>

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
      </div>

      <div className="vm_kind">
        <p>연차/휴가 분류</p>

        <input type="radio" name="kind_name"></input> <label className="vm_yeon">연차</label>
        <input type="radio" name="kind_name"></input> <label className="vm_ban">월차</label>
        <input type="radio" name="kind_name"></input> <label className="vm_hu">경조휴가</label>
        <input type="radio" name="kind_name"></input> <label className="vm_sick">병가</label>
        <input type="radio" name="kind_name"></input> <label className="vm_other">기타</label>
      </div>

      <div className="vm_timedate">
        <p>연차/휴가 일시</p>

        <div className="vm_date">
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
          <span>&nbsp;&nbsp; ~ &nbsp;&nbsp;</span>
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
        </div>
      </div>

      <div className="vm_reason">
        <p>사유</p>

        <textarea placeholder="연차/휴가 사유를 자세히 적어주세요." name="reason" rows={4} cols={85}></textarea>
      </div>

      <Button variant="contained" className="vm_okBtn">신청</Button>
    </div>
  )
}

export default App;