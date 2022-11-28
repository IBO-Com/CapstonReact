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
  const [retireApprovalData, setRetireApprovalData] = useState([]);

  const [retrieUserData, setRetrieUserData] = useState([]);
  const [codeData, setCodeData] = useState();

  let InfoIndex = 1;

  useEffect(() => {
    
    axios.post("http://43.200.115.198:8080/getAllCodeNm.jsp", qs.stringify({
      code_cls: "002"
    })).then((res) => {
        setCodeData(res.data.ITEMS);
    }).catch((Error) => {

    })
    axios
      .post("http://43.200.115.198:8080/retireselect.jsp")
      .then((res) => {
        setRetireApprovalData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });

  }, []);

  useEffect(() => {
    // 배열 : map, for, foreach
    // json : Object.keys(peopleData);
    console.log(retireApprovalData);
  }, [retireApprovalData]);

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

  const radioChange = (index) => {
    setRetrieUserData(retireApprovalData[index]);
    console.log(retrieUserData);
  };


  const approvalBtn = (retrieUserData) => {
    if (window.confirm("승인하시겠습니까?")) {
      let approvalData = retrieUserData;

      let postParam2 = {
        sabun: approvalData.sabun,
        ret_date: approvalData.ret_date,
        ret_state: approvalData.ret_state,
      };

      console.log(postParam2);
      postParam2 = qs.stringify(postParam2);

      axios
        .post("http://43.200.115.198:8080/retireupdate.jsp", postParam2)
        .then((res) => {
          axios
            .post("http://43.200.115.198:8080/retireselect.jsp")
            .then((res) => {
              setRetireApprovalData(res.data.ITEMS);
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
            className="RetirementApproval_input"
            label="사번/성명"
            variant="outlined"
            size="small"
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
            <button
              className="RetirementApproval_savetBtn"
              onClick={() => {
                approvalBtn(retrieUserData);
              }}
            >
              승인
            </button>
          </div>
        </div>

        <div className="RetirementApproval_table">
          <table>
            <thead>
              <tr>
                <td>번호</td>
                <td>선택</td>
                <td>퇴직 희망일</td>
                <td>처리상태</td>
                <td>사번</td>
                <td>성명</td>
                <td>부서명</td>
                <td>팀명</td>
              </tr>
            </thead>
            <tbody>
              {retireApprovalData.map(function (item, index) {
                return (
                  <>
                    {item.ret_state === "0" ? (
                      <tr>
                        <td className="reapp_index">{InfoIndex++}</td>
                        <td className="reapp_radio">
                          <input
                            type="radio"
                            name="userSelect"
                            className="retirement_radio"
                            onChange={() => {
                              radioChange(index);
                            }}
                          />
                        </td>
                        <td className="reapp_date">
                          {item.ret_date.slice(0, 4)}년{" "}
                          {item.ret_date.slice(4, 6)}월{" "}
                          {item.ret_date.slice(6, 8)}일
                        </td>
                        <td className="reapp_state">
                          {item.ret_state === "0" ? "대기중" : "처리완료"}
                        </td>
                        <td className="reapp_sabun">{item.sabun}</td>
                        <td className="reapp_name">{item.name}</td>
                        <td className="reapp_dept">{item.deptKR}</td>
                        <td className="reapp_team">{item.teamKR}</td>
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
      </div>
    </div>
  );
};

export default App;
