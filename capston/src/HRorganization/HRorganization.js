import React, { useEffect, useState } from "react";
import "../css/HRorganization/HRorganization.css";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Select from "@mui/material/Select";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";
import HrInfoTable from "./HrInfoTable";
import "../css/HRorganization/HrInfoTable.css";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import axios from "axios";
import qs from "qs";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}
const HRorganization = () => {
  const [startDate, setStartDate] = useState(new Date("2020-01-01"));
  const [endDate, setEndDate] = useState(new Date());

  const [selectDepart, setSelectDepart] = useState("*");

  const [textName, setTextName] = useState("");
  const [peopleData, setPeopleData] = useState();

  const [codeData, setCodeData] = useState();

  useEffect(() => {
    axios
      .post("http://43.200.115.198:8080/empselect.jsp")
      .then((res) => {
        setPeopleData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });

    axios
      .post(
        "http://43.200.115.198:8080/getAllCodeNm.jsp",
        qs.stringify({
          code_cls: "002",
        })
      )
      .then((res) => {
        setCodeData(res.data.ITEMS);
      })
      .catch((Error) => {});
  }, []);

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
    console.log(e.target.value);
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

    //console.log(query);

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((res) => {
        setPeopleData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + "-" + month + "-" + day;
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
              {codeData ? (
                Object.keys(codeData).map((item, index) => (
                  <MenuItem sx={{ minWidth: "153px", height: 30 }} value={item}>
                    {codeData[item]}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
          <input
            style={{
              lineHeight: "33px",
              width: "170px",
              height: "33px",
            }}
            placeholder="사번 / 성명"
            type="text"
            className="HRorganization_input"
            label="사번/성명"
            variant="outlined"
            size="small"
            onChange={textNameHandle}
          />
          <button
            className="HRorganization_btn"
            onClick={() => {
              sendSubmit();
            }}
          >
            검색
          </button>
        </div>
        <HrInfoTable
          startDate={startDate}
          endDate={endDate}
          selectDepart={selectDepart}
          textName={textName}
          peopleData={peopleData}
        />
      </div>
    </>
  );
};

export default HRorganization;
