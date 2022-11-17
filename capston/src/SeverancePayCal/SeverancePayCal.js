import { React, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";
import { Select, MenuItem } from "@material-ui/core";
import axios from "axios";
import qs from "qs";
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
  const [retireDate, setRetireDate] = useState([]);

  let InfoIndex = 1;

  const handleDateChange = (date) => {
    setRetrieveDate(getFormatDate(date));
  };

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
  };

  useEffect(() => {
    axios
      .post("http://43.200.115.198:8080/retireselect.jsp")
      .then((res) => {
        setRetireDate(res.data.ITEMS);
        console.log(retireDate);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

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
          <span>퇴직 사원 정보</span>
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
              {retireDate.map(function (item) {
                return (
                  <>
                    {item.ret_state === "1" ? (
                      <tr>
                        <td className="reapp_index">{InfoIndex++}</td>
                        <td className="reapp_radio">
                          <input
                            type="radio"
                            name="userSelect"
                            className="retirement_radio"
                          />
                        </td>
                        <td className="reapp_sabun">{item.sabun}</td>
                        <td className="reapp_name">{item.name}</td>
                        <td className="reapp_dept">{item.deptKR}</td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="SeverancePayCal_calInfo">
          <div className="SeverancePayCal_date">
            <div className="SeverancePayCal_btns">
              <button className="SeverancePaycal_saveBtn">저장</button>
            </div>
            <table className="SeverancePaycal_FirstTable">
              <tr>
                <td className="SeverancePaycal_item">입사일</td>
                <td></td>
                <td className="SeverancePaycal_item">근속년수</td>
                <td></td>
              </tr>
              <tr>
                <td className="SeverancePaycal_item">퇴직일</td>
                <td></td>
                <td className="SeverancePaycal_item">퇴직금지급일</td>
                <td></td>
              </tr>
            </table>

            <span>! 근로기준법 일할계산 적용합니다.</span>

            <div>
              <span>&nbsp;</span>
            </div>
          </div>
          <div className="SeverancePayCal_total">
            <span>퇴직전 3개월 임금 내역</span>
            <table className="SeverancePayCal_moneyListTable">
              <thead>
                <tr>
                  <td>근속기간</td>
                  <td>일수</td>
                  <td>실수령액</td>
                </tr>
              </thead>
              <tbody className="SeverancePayCal_moneyList">
                <tr>
                  <td>월</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>월</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>월</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>합계</td>
                  <td>일</td>
                  <td>원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span>&nbsp;</span>
          </div>
          <div className="SeverancePayCal_calculator">
            <span>퇴직금 계산</span>
            <table className="SeverancePaycal_SecondTable">
              <tr>
                <td className="SeverancePaycal_item">마지막 달 급여</td>
                <td></td>
                <td className="SeverancePaycal_item">퇴직수당</td>
                <td>1년 미만 ~ 4년 : 1.5배 / 5년 이상 : 2배</td>
              </tr>
              <tr>
                <td className="SeverancePaycal_item">퇴직총액</td>
                <td></td>
                <td className="SeverancePaycal_item">퇴직소득세</td>
                <td></td>
              </tr>
              <tr>
                <td className="SeverancePaycal_item">퇴직 실수령액</td>
                <td colSpan={3}>
                  (마지막 달 급여 * 근속년수) + 퇴직수당 - 퇴직소득세 = 실지급액
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
