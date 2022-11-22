import { React, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";
import { Select, MenuItem } from "@material-ui/core";
import axios from "axios";
import qs from "qs";
import ModalseverancePayCal from "./modalseverancePayCal";
import "../css/SeverancePayCal/SeverancePayCal.css";
import * as Utils from "../modules/utils";
import * as GetYearOfWOrk from "../modules/getYearOfWork";

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
  const [modalseverancePayCal, setModalseverancePayCal] = useState(false);

  const [workYear, setWorkYear] = useState(0);
  const [workMonth, setWorkMonth] = useState(0);
  const [workDay, setWorkDay] = useState(0);

  const [workInfo, setWorkInfo] = useState();
  const [textName, setTextName] = useState("");
  const [selectDepart, setSelectDepart] = useState("*");
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
  const [retireDate, setRetireDate] = useState([]); // 퇴직 사원 정보

  const [retirePayment, setRetirePayment] = useState();

  const [sabun, setSabun] = useState();
  const [startInfo, setStartInfo] = useState();
  const [endInfo, setEndInfo] = useState();

  const [payData, setPayData] = useState();
  const [totalData, setTotalData] = useState();

  const [sumDate, setSumDate] = useState();
  const [sumPay, setSumPay] = useState();

  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 2;
    let toDayDate = now.getDate();

    return todayYear + "년 " + todayMonth + "월 " + toDayDate + "일";
  };

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

  const radioChange = async (sabun) => {
    setSabun(sabun);
    Utils.getRetirePayment(sabun, setRetirePayment);
    console.log(sabun);
    let sDate = "";
    let eDate = "";

    if (sabun == null) return;
    console.log(sabun);

    let postParam = qs.stringify({
      sabunOrName: sabun,
    });

    await axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((response) => {
        setStartInfo(response.data.ITEMS[0]);
        sDate = response.data.ITEMS[0];
        console.log("startInfo : ", startInfo);
      });

    await axios
      .post("http://43.200.115.198:8080/retireselect.jsp", postParam)
      .then((res) => {
        setEndInfo(res.data.ITEMS[0]);
        eDate = res.data.ITEMS[0];
        console.log(endInfo);
      });

    //근속연수 구하는 함수 (startDate, endDate, year, month, day)
    GetYearOfWOrk.getYearOfWork(
      new Date(
        sDate["start_date"].slice(0, 4),
        parseInt(sDate["start_date"].slice(4, 6)) - 1,
        parseInt(sDate["start_date"].slice(6, 8))
      ),
      new Date(
        eDate["ret_date"].slice(0, 4),
        parseInt(eDate["ret_date"].slice(4, 6)) - 1,
        parseInt(eDate["ret_date"].slice(6, 8))
      ),
      setWorkYear,
      setWorkMonth,
      setWorkDay
    );

    // 근무내역
    console.log("PayData : ", payData[sabun]);
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
                            onChange={() => {
                              radioChange(item.sabun);
                            }}
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
            </div>
            <table className="SeverancePaycal_FirstTable">
              <tr>
                <td className="SeverancePaycal_item">입사일</td>
                <td>
                  {startInfo
                    ? startInfo["start_date"].slice(0, 4) +
                    "년 " +
                    startInfo["start_date"].slice(4, 6) +
                    "월 " +
                    startInfo["start_date"].slice(6, 8) +
                    "일"
                    : ""}
                </td>
                <td className="SeverancePaycal_item">근속년수</td>
                <td>
                  {workYear + "년 " + workMonth + "개월 " + workDay + "일"}
                </td>
              </tr>
              <tr>
                <td className="SeverancePaycal_item">퇴직일</td>
                <td>
                  {endInfo
                    ? endInfo["ret_date"].slice(0, 4) +
                    "년 " +
                    endInfo["ret_date"].slice(4, 6) +
                    "월 " +
                    endInfo["ret_date"].slice(6, 8) +
                    "일"
                    : ""}
                </td>
                <td className="SeverancePaycal_item">퇴직금지급일</td>
                <td>{todayTime().slice(0, 9)} 5일</td>
              </tr>
            </table>

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
                  <td>
                    <div style={{fontSize:"13px", textAlign:"left", marginLeft:"15px", fontWeight:"bold"}}>
                      1개월 전
                    </div>
                    <div style={{textAlign:"left", marginLeft:"15px"}}>
                      {
                        retirePayment ? (
                          retirePayment.before0Month.slice(0, 4) + "년 " + retirePayment.before0Month.slice(4, 6) + "월 01일 ~ " +
                          retirePayment.before0Month.slice(0, 4) + "년 " + retirePayment.before0Month.slice(4, 6) + "월 " + retirePayment.lastDay0Month + "일"  
                        ) : (
                          ""
                        )
                      }
                    </div>
                  </td>
                  <td>
                      {
                        retirePayment ? (
                          retirePayment.lastDay0Month + "일"
                        ) : (
                          ""
                        )
                      }
                  </td>
                  <td>
                      {
                        retirePayment ? (
                          parseInt(retirePayment.before0Pay).toLocaleString() + "원"
                        ) : (
                          ""
                        )
                      }
                  </td>
                </tr>

                <tr>
                  <td>
                  <div style={{fontSize:"13px", textAlign:"left", marginLeft:"15px", fontWeight:"bold"}}>
                      2개월 전
                    </div>
                    <div style={{textAlign:"left", marginLeft:"15px"}}>
                      {
                        retirePayment ? (
                          retirePayment.before1Month.slice(0, 4) + "년 " + retirePayment.before1Month.slice(4, 6) + "월 01일 ~ " +
                          retirePayment.before1Month.slice(0, 4) + "년 " + retirePayment.before1Month.slice(4, 6) + "월 " + retirePayment.lastDay1Month + "일"  
                        ) : (
                          ""
                        )
                      }
                    </div>
                  </td>
                  <td>
                      {
                        retirePayment ? (
                          retirePayment.lastDay1Month + "일"
                        ) : (
                          ""
                        )
                      }
                  </td>
                  <td>
                  {
                    retirePayment ? (
                      parseInt(retirePayment.before1Pay).toLocaleString() + "원"
                    ) : (
                      ""
                    )
                  }
                  </td>
                </tr>
                
                
                <tr>
                  <td>
                    <div style={{fontSize:"13px", textAlign:"left", marginLeft:"15px", fontWeight:"bold"}}>
                      3개월 전
                    </div>
                    <div style={{textAlign:"left", marginLeft:"15px"}}>
                      {
                        retirePayment ? (
                          retirePayment.before2Month.slice(0, 4) + "년 " + retirePayment.before2Month.slice(4, 6) + "월 01일 ~ " +
                          retirePayment.before2Month.slice(0, 4) + "년 " + retirePayment.before2Month.slice(4, 6) + "월 " + retirePayment.lastDay2Month + "일"  
                        ) : (
                          ""
                        )
                      }
                    </div>
                  </td>
                  <td>
                  {
                    retirePayment ? (
                      retirePayment.lastDay2Month + "일"
                    ) : (
                      ""
                    )
                  }
                  </td>
                  <td>
                  {
                    retirePayment ? (
                      parseInt(retirePayment.before2Pay).toLocaleString() + "원"
                    ) : (
                      ""
                    )
                  }
                  </td>
                </tr>

                <tr>
                  <td>
                    <div style={{fontSize:"13px", textAlign:"left", marginLeft:"15px", fontWeight:"bold"}}>
                      기타
                    </div>
                  </td>
                  <td>
                  <div>
                      {
                        retirePayment ? (
                          (92 - retirePayment.totalDay) + "일"
                        ) : (
                          ""
                        )
                      }
                    </div>
                  </td>
                  <td>
                  {
                    retirePayment ? (
                      parseInt(retirePayment.etcPay).toLocaleString() + "원"
                    ) : (
                      ""
                    )
                  }
                  </td>
                </tr>
                <tr>
                  <td>합계</td>
                  <td>92일</td>
                  <td>{
                    retirePayment ? (
                      parseInt(retirePayment.totalPay).toLocaleString() + "원"
                    ) : (
                      ""
                    )

                  }</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span>&nbsp;</span>
          </div>
          <div className="SeverancePayCal_calculator">
            <span>퇴직금 계산</span>
            <button
              className="modalseverancePayCal"
              onClick={() => {
                setModalseverancePayCal(true);
              }}
            >
              공제액 도움말
            </button>
            {modalseverancePayCal == true ? (
              <ModalseverancePayCal setModalseverancePayCal={setModalseverancePayCal} />
            ) : (
              ""
            )}
            <table className="SeverancePaycal_SecondTable">
              <tr>
                <td className="SeverancePaycal_item">마지막 달 급여</td>
                <td>
                  {
                    retirePayment ? (
                      parseInt(retirePayment.before0Pay).toLocaleString() + "원"
                    ) : (
                      ""
                    )
                  }
                </td>
                <td className="SeverancePaycal_item">퇴직수당</td>
                {/* 1년 미만 ~ 4년 : 1.5배 / 5년 이상 : 2배 */}
                <td>
                {
                  retirePayment ? (
                    parseInt(retirePayment.retireAllow).toLocaleString() + "원"
                  ) : (
                    ""
                  )
                }
                </td>
              </tr>
              <tr>
                <td className="SeverancePaycal_item">퇴직총액</td>
                <td>
                {
                    retirePayment ? (
                      parseInt(retirePayment.retirePay).toLocaleString() + "원"
                    ) : (
                      ""
                    )
                  }
                </td>
                <td className="SeverancePaycal_item">퇴직소득세</td>
                <td>
                {
                  retirePayment ? (
                    parseInt(retirePayment.retireTax).toLocaleString() + "원"
                  ) : (
                    ""
                  )
                }

                </td>
              </tr>
              <tr>
                <td className="SeverancePaycal_item">퇴직 실수령액</td>
                <td colSpan={3}>
                {
                  retirePayment ? (
                    (parseInt(retirePayment.retirePay) + parseInt(retirePayment.retireAllow) - parseInt(retirePayment.retireTax)).toLocaleString() + "원"
                  ) : (
                    ""
                  )
                }
                  {/*(마지막 달 급여 * 근속년수) + 퇴직수당 - 퇴직소득세 = 실지급액*/}
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
