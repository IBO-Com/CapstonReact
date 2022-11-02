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
        <div className="SeverancePayCal_empInfo">
          <span>사원정보</span>
          <table className="SeverancePayCal_empTable">
            <thead>
              <tr>
                <td>번호</td>
                <td>선택</td>
                <td>사번</td>
                <td>성명</td>
                <td>부서명</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="SeverancePayCal_calInfo">
          <div className="SeverancePayCal_date">
            <div className="SeverancePayCal_btns">
              <button className="SeverancePaycal_saveBtn">저장</button>
            </div>
            <table>
              <tr>
                <td className="SeverancePaycal_item">입사일</td>
                <td></td>
                <td className="SeverancePaycal_item">퇴직일</td>
                <td></td>
                <td className="SeverancePaycal_item">퇴직금지급일</td>
                <td></td>
                <td className="SeverancePaycal_item">근속일수</td>
                <td></td>
              </tr>
              <tr>
                <td className="SeverancePaycal_item">퇴직기준일</td>
                <td colSpan={3}></td>
                <td className="SeverancePaycal_item">
                  퇴직소득세 <br></br> 근속기간
                </td>
                <td colSpan={3}></td>
              </tr>
            </table>
            <span>! 근로기준법 일할계산 적용합니다.</span>
          </div>
          <div className="SeverancePayCal_total">
            <span>퇴직전 3개월 임금총액 계산내역</span>
            <table>
              <thead>
                <tr>
                  <td>퇴직금 근속기간</td>
                  <td>퇴직금 일수</td>
                  <td>기본급</td>
                  <td>기타수당</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>일</td>
                  <td>원</td>
                  <td>원</td>
                </tr>
                <tr>
                  <td></td>
                  <td>일</td>
                  <td>원</td>
                  <td>원</td>
                </tr>
                <tr>
                  <td></td>
                  <td>일</td>
                  <td>원</td>
                  <td>원</td>
                </tr>
                <tr>
                  <td></td>
                  <td>일</td>
                  <td>원</td>
                  <td>원</td>
                </tr>
                <tr>
                  <td>합계</td>
                  <td>일</td>
                  <td>원</td>
                  <td>원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="SeverancePayCal_bonus">
            <div className="SeverancePayCal_bonusHeader">
              <span>퇴직간 1년간 상여내역</span>
            </div>

            <table>
              <tr>
                <td className="SeverancePaycal_item">연차수당</td>
                <td></td>
                <td className="SeverancePaycal_item">상여금</td>
                <td></td>
              </tr>
            </table>
          </div>
          <div className="SeverancePayCal_calculator">
            <span>퇴직금 계산</span>
            <table>
              <tr>
                <td className="SeverancePaycal_item">일평균임금</td>
                <td></td>
                <td className="SeverancePaycal_item">일통상임금</td>
                <td></td>
              </tr>
              <tr>
                <td className="SeverancePaycal_item">퇴직소득세</td>
                <td></td>
                <td className="SeverancePaycal_item">퇴직금</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
