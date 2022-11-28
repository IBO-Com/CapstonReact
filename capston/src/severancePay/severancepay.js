import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../css/severancePay/severancepay.css";
import "react-datepicker/dist/react-datepicker.css";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import { Button, MenuItem, TextField } from "@mui/material";
import qs from "qs";
import ReactToPrint from "react-to-print";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import * as Utils from "../modules/utils";

import FormRetire from "./formRetire";
import FormSeverancePay from "./formSeverancePay";
import ModalSeverancePay from "./modalseverancepay";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2020-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [selectDepart, setSelectDepart] = useState("*");
  const [textName, setTextName] = useState("");
  const [peopleData, setPeopleData] = useState();
  const [sabun, setSabun] = useState();
  const [retireDate, setRetireDate] = useState([]);
  const componentRef = useRef(null);
  const [retirePayment, setRetirePayment] = useState();
  const [codeData, setCodeData] = useState();

  const [severancePay, setSeverancePay] = useState(false);
  console.log(severancePay);

  let InfoIndex = 1;

  const [toogleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDatetDateChange = (date) => {
    setEndDate(date);
  };

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

  const radioBoxChange = (sabun) => {
    setSabun(sabun);
    Utils.getRetirePayment(sabun, setRetirePayment);
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
  };

  return (
    <div className="severancePay_box">
      <div className="severancePay_search_box">
        <div className="severancePay_dateBox">
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
            {
              codeData ? (
                Object.keys(codeData).map((item, index) => (
                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={item}>
                  {codeData[item]}
                </MenuItem>
                )) 
              ) : (
                <></>
              )
            } 
            </Select>
          </FormControl>
          <FormControl>
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
          </FormControl>
          <button
            className="severancePay_btn"
            onClick={() => {
              sendSubmit();
            }}
          >
            검색
          </button>
        </div>

        <hr className="severancePay_lineBar"></hr>

        <div className="severancePay_box">
          <div className="severancePay_InfoTable">
            <span>퇴직 사원 정보</span>

            <table className="SeverancePay_empTable">
              <thead>
                <tr>
                  <td>번호</td>
                  <td>선택</td>
                  <td>사번</td>
                  <td>성명</td>
                  <td>부서명</td>
                  <td>팀명</td>
                </tr>
              </thead>

              <tbody>
                {retireDate.map(function (item) {
                  return (
                    <>
                      {item.ret_state === "1" ? (
                        <tr>
                          <td className="reform_index">{InfoIndex++}</td>
                          <td className="reform_radio">
                            <input
                              type="radio"
                              name="userSelect"
                              className="retirement_radio"
                              onChange={() => {
                                radioBoxChange(item.sabun);
                              }}
                            />
                          </td>
                          <td className="reform_sabun">{item.sabun}</td>
                          <td className="reform_name">{item.name}</td>
                          <td className="reform_dept">{item.deptKR}</td>
                          <td className="reform_team">{item.teamKR}</td>
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

          <div className="severancePay_empCard">
            <div className="severancePay_Btnbox">
              <div className="severancePay_divBox">
                <div className="severancePay_gray">
                  <ReactToPrint
                    trigger={() => (
                      <button className="re_print_Btn">인쇄</button>
                    )}
                    content={() => componentRef.current}
                  />
                  <button
                    className="severancePay"
                    onClick={() => {
                      setSeverancePay(true);
                    }}
                  >
                    공제액 도움말
                  </button>
                </div>
                {severancePay == true ? (
                  <ModalSeverancePay setSeverancePay={setSeverancePay} />
                ) : (
                  ""
                )}

                <div className="severancePay_orange">
                  <button
                    className="pay_retire_btn"
                    onClick={() => {
                      toggleTab(1);
                    }}
                  >
                    퇴직증명서
                  </button>
                  <button
                    className="retireseverance_btn"
                    onClick={() => {
                      toggleTab(2);
                    }}
                  >
                    퇴직금명세서
                  </button>
                </div>
              </div>
            </div>
            <div className="severancePay_viewer">
              {toogleState === 1 ? (
                <FormRetire
                  retirePayment={retirePayment}
                  componentRef={componentRef}
                  sabun={sabun}
                />
              ) : (
                ""
              )}
              {toogleState === 2 ? (
                <FormSeverancePay
                  retirePayment={retirePayment}
                  componentRef={componentRef}
                  sabun={sabun}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
