import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import { Select, MenuItem } from "@material-ui/core";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import qs from "qs";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import "../css/Retirement/RetirementApproval.css";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2020-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [selectDepart, setSelectDepart] = useState("*");
  const [textName, setTextName] = useState("");
  const [peopleData, setPeopleData] = useState([]);

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

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
  };

  const sendSubmit = () => {
    /* 날짜 포멧 */
    console.log("isEnter????");
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
    let postParam = {};
    let query = {};

    query["startDate"] = sDate;
    query["retireDate"] = eDate;
    if (textName.trim() == "") {
      delete query["sabunOrName"];
    } else {
      query["sabunOrName"] = textName;
    }
    if (selectDepart == "*") {
      delete query["dept"];
    } else {
      query["dept"] = selectDepart;
    }

    postParam = qs.stringify(query);

    console.log(query);

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((res) => {
        setPeopleData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <div className="RetirementApproval_conatiner">
      <div className="RetirementApproval_search">
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

        <div className="RetirementApproval_bar"></div>

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

        <div className="RetirementApproval_dept">
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
            id="outlined-basic"
            label="사번/성명"
            variant="outlined"
            size="small"
            margin="small"
            onChange={textNameHandle}
          />
        </FormControl>
        <button
          className="RetirementApproval_searchtBtn"
          onClick={() => {
            sendSubmit();
          }}
        >
          검색
        </button>
      </div>
      <div className="RetirementApproval_content">
        <div className="RetirementApproval_title">
          <span>퇴직승인</span>
          <div className="RetirementApproval_btns">
            <button className="RetirementApproval_batchBtn">일괄승인</button>
            <button className="RetirementApproval_savetBtn">저장</button>
          </div>
        </div>

        <div className="RetirementApproval_table">
          <table>
            <thead>
              <tr>
                <td>번호</td>
                <td>선택</td>
                <td>신청일</td>
                <td>처리상태</td>
                <td>사번</td>
                <td>성명</td>
                <td>부서명</td>
              </tr>
            </thead>
            <tbody>
              {peopleData.map(function (name, index) {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="radio"
                          name="userSelect"
                          className="retirement_radio"
                          //   onChange={() => {
                          //     radioBoxChange(name.sabun);
                          //   }}
                        />
                      </td>
                      <td> </td>
                      <td></td>
                      <td>{name.sabun}</td>
                      <td>{name.name}</td>
                      <td>
                        {name.dept === "01"
                          ? "경영지원부"
                          : "" || name.dept === "02"
                          ? "경영관리"
                          : "" || name.dept === "03"
                          ? "침해대응부"
                          : "" || name.dept === "04"
                          ? "관제센터"
                          : "" || name.dept === "05"
                          ? "보안연구부"
                          : "" || name.dept === "06"
                          ? "보안취약점연구부"
                          : ""}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
