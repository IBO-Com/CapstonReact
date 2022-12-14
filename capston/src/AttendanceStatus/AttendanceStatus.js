import React, { useEffect, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import { Select, MenuItem } from "@material-ui/core";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import "../css/AttendanceStatus/AttendanceStatus.css";
import { differenceInSeconds } from "date-fns";
import axios from "axios";
import * as GetAttendance from "../modules/GetAttendance";
import * as GetCDTR from "../modules/getCDTR";
import qs from "qs";
import { useCookies } from "react-cookie";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  let toDay = new Date();
  const [startDate, setStartDate] = useState(
    new Date(toDay.getFullYear(), toDay.getMonth(), 1)
  ); 
  const [cookies, setCookie, removeCookie] = useCookies();
  const [endDate, setEndDate] = useState(new Date());
  const [textName, setTextName] = useState("");
  const [selectDepart, setSelectDepart] = useState("*");
  const [AttendData, setAttendData] = useState([]);
  const [nowTab, setNowTab] = useState("A");
  const [paramData, setParamData] = useState({});

  const [codeData, setCodeData] = useState({});
  const [codeData2, setCodeData2] = useState();

  const [oW, setOW] = useState(0); //외근
  const [bT, setBT] = useState(0); //출장
  const [hW, setHW] = useState(0); //재택
  const [nM, setNM] = useState(0); //일반
  const [eW, setEW] = useState(0); //연장
  const [rW, setRW] = useState(0); //휴일

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

  const addZero = (date) => {
    if (date < 10) {
      const zeroDate = ("00" + date).slice(-2);
      return zeroDate;
    }
    return date;
  };
  const submit = () => {
    let start_date =
      String(startDate.getFullYear()) +
      String(addZero(startDate.getMonth() + 1)) +
      String(addZero(startDate.getDate()));
    let retire_date =
      String(endDate.getFullYear()) +
      String(addZero(endDate.getMonth() + 1)) +
      String(addZero(endDate.getDate()));
    let param = {};

    if (textName.trim().length != 0) {
      //사번/성명이 입력되었을 때
      param["sabunOrName"] = textName;
    }

    if (selectDepart != "*") {
      //선택 부서가 전체 부서일때
      param["dept"] = selectDepart;
    }

    param["start_date"] = start_date;
    param["retire_date"] = retire_date;

    let tempParam = { ...param }; //객체 복사

    if (nowTab != "A") {
      tempParam["work_form"] = nowTab;
    }

    setParamData(param);
    param = qs.stringify(param);
    tempParam = qs.stringify(tempParam);

    console.log(param);
    axios
      .post("http://43.200.115.198:8080/getAttendance.jsp", tempParam)
      .then((response) => {
        setAttendData(response.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });

    //외근, 휴일 등등 개수
    axios
      .post("http://43.200.115.198:8080/getAttendance_workCount.jsp", param)
      .then((response) => {
        let data = response.data.ITEMS;
        console.log("Data : ", data);
        data["OW"] ? setOW(parseInt(data["OW"])) : setOW(0);
        data["BT"] ? setBT(parseInt(data["BT"])) : setBT(0);
        data["HW"] ? setHW(parseInt(data["HW"])) : setHW(0);
        data["NM"] ? setNM(parseInt(data["NM"])) : setNM(0);
        data["EW"] ? setEW(parseInt(data["EW"])) : setEW(0);
        data["RW"] ? setRW(parseInt(data["RW"])) : setRW(0);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const changeTap = async(idx, tab) => {
    let start_date =
    String(startDate.getFullYear()) +
    String(addZero(startDate.getMonth() + 1)) +
    String(addZero(startDate.getDate()));
    let retire_date =
      String(endDate.getFullYear()) +
      String(addZero(endDate.getMonth() + 1)) +
      String(addZero(endDate.getDate()));
    setNowTab(tab);
    let element = document.querySelectorAll(".AttendanceStatus_type > div");
    for (let i = 0; i < element.length; i++) {
      if (i == idx) {
        element[i].className = "AttendanceStatus_type01";
      } else {
        element[i].className = "AttendanceStatus_type02";
      }
    }

    let param = { ...paramData };

    if (tab != "A") {
      //전체가 아닐 때
      param["work_form"] = tab;
    }
    param["start_date"] = start_date;
    param["retire_date"] = retire_date;

    param = qs.stringify(param);

    let isBreak = false;
    let cnt = 1;
    while(!isBreak) {
      await axios
      .post("http://43.200.115.198:8080/getAttendance.jsp", param)
      .then((response) => {
        setAttendData(response.data.ITEMS);
        isBreak = true;
      })
      .catch((Error) => {
        console.log("로딩 오류 - 재요청 시도 " + cnt);
        cnt += 1;
      });
    }

   
  };

  useEffect(() => {
    let start_date =
      String(startDate.getFullYear()) +
      String(addZero(startDate.getMonth() + 1)) +
      String(addZero(startDate.getDate()));
    let retire_date =
      String(endDate.getFullYear()) +
      String(addZero(endDate.getMonth() + 1)) +
      String(addZero(endDate.getDate()));

    let postParam = {
      start_date: start_date,
      retire_date: retire_date,
    };
    console.log(postParam);
    //각종 정보
    axios
      .post(
        "http://43.200.115.198:8080/getAttendance.jsp",
        qs.stringify(postParam)
      )
      .then((response) => {
        setAttendData(response.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });

    //외근, 휴일 등등 개수
    axios
      .post(
        "http://43.200.115.198:8080/getAttendance_workCount.jsp",
        qs.stringify(postParam)
      )
      .then((response) => {
        let data = response.data.ITEMS;
        if (data["OW"]) {
          setOW(parseInt(data["OW"]));
        }
        if (data["BT"]) {
          setBT(parseInt(data["BT"]));
        }
        if (data["HW"]) {
          setHW(parseInt(data["HW"]));
        }
        if (data["NM"]) {
          setNM(parseInt(data["NM"]));
        }
        if (data["EW"]) {
          setEW(parseInt(data["EW"]));
        }
        if (data["RW"]) {
          setRW(parseInt(data["RW"]));
        }
      })
      .catch((Error) => {
        console.log(Error);
      });

    //코드 정보
    axios
      .post("http://43.200.115.198:8080/getAllCodeNm.jsp")
      .then((response) => {
        setCodeData(response.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });

      axios.post("http://43.200.115.198:8080/getAllCodeNm.jsp", qs.stringify({
        code_cls: "002"
      })).then((res) => {
        setCodeData2(res.data.ITEMS);
      }).catch((Error) => {

      })

  }, []);

  return (
    <div className="AttendanceStatus_container">
      {
        cookies["loginInfo"].authority == "1" ? (
          <>
          <div className="AttendacneStatus_search">
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

        <div className="AttendanceStatus_bar"></div>

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
        <div className="AttendanceStatus_depart">
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
            {
              codeData2 ? (
                Object.keys(codeData2).map((item, index) => (
                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={item}>
                  {codeData2[item]}
                </MenuItem>
                )) 
              ) : (
                <></>
              )
            } 
            </Select>
          </FormControl>
        </div>

        <FormControl>
          <input
            style={{
              lineHeight: "33px",
              width: "170px",
              height: "33px",
            }}
            placeholder="사번 / 성명"
            type="text"
            className="AttendanceStatus_input"
            label="사번/성명"
            variant="outlined"
            size="small"
            onChange={textNameHandle}
          />
        </FormControl>
        <button
          className="AttendanceStatus_searchBtn"
          onClick={() => {
            submit();
          }}
        >
          검색
        </button>
      </div>
          </>
        ) : (
          <>
            <div style={{marginTop: "50px"}}></div>
          </>
        )
      }
      
      <div className="AttendanceStatus_content">
        <span>근태/근무현황</span>
        <div className="AttendanceStatus_type">
          <div
            className="AttendanceStatus_type01"
            onClick={(e) => {
              changeTap(0, "A");
            }}
          >
            <span>전체</span>
            <br></br>
            <span>{oW + bT + hW + nM + eW + rW}건</span>
          </div>
          <div
            className="AttendanceStatus_type02"
            onClick={(e) => {
              changeTap(1, "OW");
            }}
          >
            <span>외근</span>
            <br></br>
            <span>{oW}건</span>
          </div>
          <div
            className="AttendanceStatus_type02"
            onClick={(e) => {
              changeTap(2, "BT");
            }}
          >
            <span>출장</span>
            <br></br>
            <span>{bT}건</span>
          </div>
          <div
            className="AttendanceStatus_type02"
            onClick={(e) => {
              changeTap(3, "HW");
            }}
          >
            <span>재택</span>
            <br></br>
            <span>{hW}건</span>
          </div>
          <div
            className="AttendanceStatus_type02"
            onClick={(e) => {
              changeTap(4, "EW");
            }}
          >
            <span>연장근무</span>
            <br></br>
            <span>{eW}건</span>
          </div>
          <div
            className="AttendanceStatus_type02"
            onClick={(e) => {
              changeTap(5, "RW");
            }}
          >
            <span>휴일대체</span>
            <br></br>
            <span>{rW}건</span>
          </div>
        </div>
        <div className="AttendanceStatus_table">
          {!AttendData ? (
            "No data found"
          ) : (
            <table>
              <thead>
                <tr>
                  <th>일자</th>
                  <th>성명</th>
                  <th>부서</th>
                  <th>직책</th>
                  <th>근태항목</th>
                  <th>시작시간</th>
                  <th>종료시간</th>
                  <th>연장시간(분)</th>
                  <th>야근시간(분)</th>
                </tr>
              </thead>
              <tbody>
                {AttendData.map(function (attend, index) {
                  return (
                    <>
                      <tr>
                        <td>
                          {attend.in_date.slice(0, 4)}년{" "}
                          {attend.in_date.slice(4, 6)}월{" "}
                          {attend.in_date.slice(6, 8)}일
                        </td>
                        <td>{attend.name}</td>
                        <td>{codeData[attend.dept]}</td>
                        <td>{codeData[attend.rank]}</td>
                        <td>{codeData[attend.work_form]}</td>
                        <td>
                          {attend.start_datetime.slice(0, 2)}시{" "}
                          {attend.start_datetime.slice(2, 4)}분
                        </td>
                        <td>
                          {attend.end_datetime.slice(0, 2)}시{" "}
                          {attend.end_datetime.slice(2, 4)}분
                        </td>
                        <td>{attend.over_datetime}</td>
                        <td>{attend.night_datetime}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
