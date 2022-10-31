import { React, useState } from "react";
import FormControl from "@mui/material/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";
import { Select, MenuItem } from "@material-ui/core";
import "../css/SeverancePayCal/SeverancePayCal.css";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  return year + "-" + month;
}

const App = () => {
  const [textName, setTextName] = useState("");
  const [selectDepart, setSelectDepart] = useState("*");
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));

  const handleDateChange = (date) => {
    setRetrieveDate(getFormatDate(date));
  };

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
  };

  return (
    <div className="SeverancePayCal_container">
      <div className="SeverancePayCal_search">
        <span>기준일자</span>
        <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
          <DatePicker
            style={{ marginLeft: "18px" }}
            autoOk
            variant="inline"
            views={["year", "month"]}
            format="yyyy-MM"
            value={retrieveDate}
            inputVariant="outlined"
            size="small"
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>

        <div className="SeverancePayCal_dept">
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
          <input
            style={{
              marginLeft: "30px",
              marginTop: "0px",
              lineHeight: "36px",
              width: "170px",
              height: "36px",
            }}
            autoComplete="off"
            placeholder="사번/성명"
            className="SeverancePayCal_input"
            id="outlined-card"
            label="사번/성명"
            variant="outlined"
            size="small"
            onChange={textNameHandle}
          />
        </FormControl>
        <button className="SeverancePayCal_searchBtn">검색</button>
      </div>
      <div className="SeverancePayCal_contnet">
        <div className="SeverancePayCal_empInfo">사원정보</div>
        <div className="SeverancePayCal_calInfo">
          <div className="SeverancePayCal_date"></div>
          <div className="SeverancePayCal_total">
            퇴직전 3개월 임금총액 계산내역
          </div>
          <div className="SeverancePayCal_bonus">퇴직간 1년간 상여내역</div>
          <div className="SeverancePayCal_calculator">퇴직금 계산</div>
        </div>
      </div>
    </div>
  );
};

export default App;
