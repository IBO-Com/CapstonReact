import React, { useEffect, useState, useRef } from "react";
import "../css/vacationCheck/vacationCheck.css";
import axios from "axios";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import qs from "qs";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [selectDepart, setSelectDepart] = useState("*");
  const [selectDep, setSelectDep] = useState("*");
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
  const [textName, setNameText] = useState("");
  const [startDate, setStartDate] = useState(new Date("2022-11-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [vacationData, setVacationData] = useState([]);
  const [sabun, setSabun] = useState();
  const annualData = {
    0: "연차",
    "01": "오전반차",
    "02": "오후반차",
    "03": "경조휴가",
    "04": "병결",
    "05": "기타",
  };

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    return year + "-" + month;
  }

  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  // const handleChange = (event) => {
  //   setSelectDep(event.target.value);
  // };

  // const handleStartDateChange = (date) => {
  //   setRetrieveDate(getFormatDate(date));
  // };

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setNameText(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDatetDateChange = (date) => {
    setEndDate(date);
  };

  //  승인
  const approvalBtn = (index) => {
    if (window.confirm("승인하시겠습니까?")) {
      console.log("상태 : ", ann_state);

      let tempVacationData = vacationData[index];
      let postParam2 = {
        sabun: tempVacationData.sabun,
        remain_annual: tempVacationData.remain_annual,
        ann_start_date: tempVacationData.ann_start_date,
        use_annual: tempVacationData.use_annual,
        name: tempVacationData.name,
        rank: tempVacationData.rank,
        dept: tempVacationData.dept,
        ann_end_date: tempVacationData.ann_end_date,
        vacation: tempVacationData.vacation,
        ann_reason: tempVacationData.ann_reason,
        ann_state: tempVacationData.ann_state,
        team: tempVacationData.team,
        rep_name: tempVacationData.rep_name,
        rep_rank: tempVacationData.rep_rank,
        emer_tel: tempVacationData.emer_tel,
        emer_rel: tempVacationData.emer_rel,
      };
      console.log(postParam2);
      postParam2 = qs.stringify(postParam2);

      /*
      axios
        .post("http://43.200.115.198:8080/vacationupdate.jsp", postParam2)
        .then((res) => {
          axios
            .post("http://43.200.115.198:8080/vacationCheck.jsp")
            .then((res) => {
              setVacationData(res.data.ITEMS);
            })
            .catch((Error) => {
              alert("에러");
            });
          console.log(res);
        })
        .catch((Error) => {
          console.log(Error);
        });
        */
    }
  };

  // 반려
  const rejectBtn = (index) => {
    if (window.confirm("반려하시겠습니까?")) {
      let tempVacationData2 = vacationData[index];
      let postParam3 = {
        sabun: tempVacationData2.sabun,
        ann_start_date: tempVacationData2.ann_start_date,
        ann_end_date: tempVacationData2.ann_end_date,
        vacation: tempVacationData2.vacation,
      };
      console.log(postParam3);
      postParam3 = qs.stringify(postParam3);

      axios
        .post("http://43.200.115.198:8080/vacationdelete.jsp", postParam3)
        .then((res) => {
          axios
            .post("http://43.200.115.198:8080/vacationCheck.jsp")
            .then((res) => {
              setVacationData(res.data.ITEMS);
            })
            .catch((Error) => {
              alert("에러");
            });
          console.log(res);
        })
        .catch((Error) => {
          console.log(Error);
        });
    }
  };

  useEffect(() => {
    axios
      .post("http://43.200.115.198:8080/vacationCheck.jsp")
      .then((res) => {
        setVacationData(res.data.ITEMS);
        console.log(vacationData);
      })
      .catch((Error) => {
        alert("에러");
      });
  }, []);

  useEffect(() => {
    // 배열 : map, for, foreach
    // json : Object.keys(peopleData);
    console.log(vacationData);
  }, [vacationData]);

  // 검색
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
    console.log(query);

    axios
      .post("http://43.200.115.198:8080/vacationCheck.jsp", postParam)
      .then((res) => {
        setVacationData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <div className="personnelCard_box">
      <div className="card_search_box">
        <div className="card_dateBox">
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
          <div className="vacationCheck_bar"></div>

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
          <FormControl>
            <TextField
              className="vacationInput"
              id="outlined-card"
              label="사번/성명"
              variant="outlined"
              size="small"
              onChange={textNameHandle}
            />
          </FormControl>
          <button
            className="card_search_btn"
            onClick={() => {
              sendSubmit();
            }}
          >
            검색
          </button>
        </div>

        <div className="vc_Flex">
          <div className="vc_Request">
            <p className="vc_Request_title">연차/휴가 요청</p>
            {/**
             * 1. vactionWrap 데이터 1~2개
             * 2. vactionWrap 승인, 반려
             * 3. 승인 시 완료된 요청
             * 4. 잘자~~
             */}
            {/* 오전반차면 오전반차 신청 - 김누구 */}

            {vacationData.map((item, index) => (
              <div className="vacationWrap">
                {item.ann_state === "0" ? (
                  <div className="vacationBox">
                    <p className="vc_name">
                      {annualData[item.vacation]}
                      신청 - {item.name}
                    </p>{" "}
                    <p className="vc_date">
                      일시&nbsp; : &nbsp;
                      {item.ann_start_date.slice(0, 4)}년&nbsp;{" "}
                      {item.ann_start_date.slice(4, 6)}월&nbsp;{" "}
                      {item.ann_start_date.slice(6, 8)}일&nbsp; ~ &nbsp;
                      {item.ann_end_date.slice(6, 8)}일
                    </p>
                    <p className="vc_replace">
                      대체 업무자&nbsp; : &nbsp; {item.rep_name} &nbsp;
                      {item.rep_rankKR}
                    </p>
                    <div className="vc_btnbox">
                      <button
                        className="vc_approval_btn"
                        onClick={() => {
                          approvalBtn(index);
                        }}
                      >
                        승인
                      </button>
                      <button
                        className="vc_refusal_btn"
                        onClick={() => {
                          rejectBtn(index);
                        }}
                      >
                        반려
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>

          <div className="vc_compltion">
            <p className="vc_compltion_title">완료된 요청</p>

            {vacationData.map((item) => (
              <div className="vacationWrap">
                {item.ann_state === "1" ? (
                  <div className="vacationBox">
                    <p className="vc_name">
                      {annualData[item.vacation]}
                      신청 - {item.name}
                    </p>{" "}
                    <p className="vc_date">
                      일시&nbsp; : &nbsp;
                      {item.ann_start_date.slice(0, 4)}년&nbsp;{" "}
                      {item.ann_start_date.slice(4, 6)}월&nbsp;{" "}
                      {item.ann_start_date.slice(6, 8)}일&nbsp; ~ &nbsp;
                      {item.ann_end_date.slice(6, 8)}일
                    </p>
                    <p className="vc_replace">
                      대체 업무자&nbsp; : &nbsp; {item.rep_name} &nbsp;
                      {item.rep_rankKR}
                    </p>
                    <div className="vc_btnbox">
                      <button className="vc_approval_btn">처리완료</button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
