import React, { useEffect, useState, useRef } from "react";
import "../css/monthlySalary/monthlySalaryCheck.css";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";
import Modal from "react-modal";
import axios from "axios";
import qs from "qs";
import ModalMonthlySalary from "./modalMonthlySalary";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import * as Utils from "../modules/utils";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie, removeCookie] = useCookies();
  const [empInfo, setEmpInfo] = useState();
  const [textName, setTextName] = useState("");
  const [monthlyPayDebuct, setMonthlyPayDebuct] = useState(false);
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
  const [taxPack, setTaxPack] = useState();

  //console.log(monthlyPayDebuct);

  const handleDateChange = (date) => {
    setRetrieveDate(getFormatDate(date));
    axios
      .post(
        "http://43.200.115.198:8080/empselect.jsp",
        qs.stringify({
          sabunOrName: textName.trim(),
        })
      )
      .then((res) => {
        let data = res.data.ITEMS[0];
        let sabun = "";
        if (data == undefined) {
          sabun = cookies["loginInfo"].id;
        } else {
          sabun = data.sabun;
        }

        let postParam = {
          sabun: sabun,
          year: getFormatDate(date).slice(0, 4),
          month: getFormatDate(date).slice(5, 7),
        };
        postParam = qs.stringify(postParam);
        axios
          .post("http://43.200.115.198:8080/getPayment.jsp", postParam)
          .then((res) => {
            let data = res.data.ITEMS[0];
            setTaxPack(data);
          })
          .catch((Error) => {
            console.log(Error);
          });
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
  };

  const sendSubmit = () => {
    if (textName.trim() == "") {
      alert("사번/성명을 입력해주세요.");
      return;
    }

    axios
      .post(
        "http://43.200.115.198:8080/empselect.jsp",
        qs.stringify({
          sabunOrName: textName.trim(),
        })
      )
      .then((res) => {
        let data = res.data.ITEMS[0];
        if (data == undefined) {
          alert("해당 사원이 존재하지 않습니다.");
          return;
        }

        let postParam = {
          sabun: data.sabun,
          year: retrieveDate.slice(0, 4),
          month: retrieveDate.slice(5, 7),
        };
        postParam = qs.stringify(postParam);
        axios
          .post("http://43.200.115.198:8080/getPayment.jsp", postParam)
          .then((res) => {
            let data = res.data.ITEMS[0];
            setTaxPack(data);
          })
          .catch((Error) => {
            console.log(Error);
          });
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  useEffect(() => {
    let postParam = {
      sabun: cookies["loginInfo"].id,
      year: retrieveDate.slice(0, 4),
      month: retrieveDate.slice(5, 7),
    };
    postParam = qs.stringify(postParam);
    axios
      .post("http://43.200.115.198:8080/getPayment.jsp", postParam)
      .then((res) => {
        let data = res.data.ITEMS[0];
        console.log(data);
        setTaxPack(data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div className="monthlyPay_background">
      <div className="monthlyPay_searchBox">
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
            className="HRorganization_input"
            id="outlined-card"
            label="사번/성명"
            variant="outlined"
            size="small"
            onChange={textNameHandle}
          />
        </FormControl>
        <button
          className="monthlyPay_search_btn"
          onClick={() => {
            sendSubmit();
          }}
        >
          검색
        </button>
      </div>
      <hr className="monthlyPay_lineBar"></hr>

      <div className="monthlyPay_title">
        <span>
          {retrieveDate.split("-")[0] +
            "년 " +
            retrieveDate.split("-")[1] +
            "월"}{" "}
          총 급여액
        </span>
      </div>

      <div className="monthlyPay_viewer">
        <div className="monthlyPay_ment">
          <span>
            급여지급일{" "}
            {retrieveDate.split("-")[0] +
              "년 " +
              retrieveDate.split("-")[1] +
              "월"}{" "}
            5일
          </span>
          <button className="monthlyPay_Btn">(주) IBO</button>
        </div>
        <div className="monthlyPay_total">
          <p>총 급여</p>
          <span className="totalPay">
            {taxPack ? parseInt(taxPack["totalPay"]).toLocaleString() : 0}원
          </span>
        </div>
        <div className="monthlyPay_deduct">
          <p>공제액</p>
          <span className="deductPay">
            {taxPack ? parseInt(taxPack["totalDud"]).toLocaleString() : 0}원
          </span>
        </div>
        <div className="monthlyPay_amount">
          <p>실수령액</p>
          <span className="amountPay">
            {taxPack
              ? (
                  parseInt(taxPack["totalPay"]) - parseInt(taxPack["totalDud"])
                ).toLocaleString()
              : 0}
            원
          </span>
        </div>
      </div>

      <div className="monthlyWork_title">
        <p>근태근무내역</p>
      </div>
      <div className="monthlyWork_viewer">
        <div className="monthlyNormalWork_ment">
          <span>일반근무&nbsp;</span>
          <span>
            {taxPack
              ? (parseInt(taxPack["normal_datetime"]) / 60).toFixed(1)
              : 0}
            시간
          </span>
        </div>
        <div className="monthlyOvertimeWork_ment">
          <span>연장근무&nbsp;</span>
          <span>
            {taxPack ? (parseInt(taxPack["over_datetime"]) / 60).toFixed(1) : 0}
            시간
          </span>
        </div>
        <div className="monthlyNightWork_ment">
          <span>야간근무&nbsp;</span>
          <span>
            {taxPack
              ? (parseInt(taxPack["night_datetime"]) / 60).toFixed(1)
              : 0}
            시간
          </span>
        </div>
        <div className="monthlyHolidayWork_ment">
          <span>휴일근무&nbsp;</span>
          <span>
            {taxPack
              ? (parseInt(taxPack["holiday_datetime"]) / 60).toFixed(1)
              : 0}
            시간
          </span>
        </div>
        <div className="monthlytotalWork_ment">
          <span>총 근무일수&nbsp;</span>
          <span>{taxPack ? parseInt(taxPack["day"]) : 0}일</span>
        </div>
        <div className="monthlyWorkTime_ment">
          <span>총 근로시간&nbsp;</span>
          <span>
            {taxPack
              ? (parseInt(taxPack["total_datetime"]) / 60).toFixed(1)
              : 0}
            시간
          </span>
        </div>
      </div>

      <div className="monthlyPayCheck_title">
        <p>급여현황</p>
        <button
          className="monthlyPayDebuct"
          onClick={() => {
            setMonthlyPayDebuct(true);
          }}
        >
          공제액 도움말
        </button>
      </div>
      {monthlyPayDebuct == true ? (
        <ModalMonthlySalary setMonthlyPayDebuct={setMonthlyPayDebuct} />
      ) : (
        ""
      )}

      <table className="monthlyTable">
        <tr className="monthlyFirst">
          <td colSpan={2}>지급액</td>
          <td colSpan={2}>공제액</td>
        </tr>
        <tr className="monthlyOne">
          <td>기본급</td>
          <td>
            {taxPack ? parseInt(taxPack["pay_normal"]).toLocaleString() : 0}원
          </td>
          <td>국민연금</td>
          <td>
            {taxPack ? parseInt(taxPack["tax_annu"]).toLocaleString() : 0}원
          </td>
        </tr>
        <tr className="monthlyTwo">
          <td>연장근무</td>
          <td>
            {taxPack ? parseInt(taxPack["pay_over"]).toLocaleString() : 0}원
          </td>
          <td>건강보험외</td>
          <td>
            {taxPack
              ? (
                  parseInt(taxPack["tax_health"]) -
                  parseInt(taxPack["tax_insure"])
                ).toLocaleString()
              : 0}
            원
          </td>
        </tr>
        <tr className="monthlyThree">
          <td>야간근무</td>
          <td>
            {taxPack ? parseInt(taxPack["pay_night"]).toLocaleString() : 0}원
          </td>
          <td>고용보험</td>
          <td>
            {taxPack ? parseInt(taxPack["tax_hire"]).toLocaleString() : 0}원
          </td>
        </tr>
        <tr className="monthlyFour">
          <td>휴일근무</td>
          <td>
            {taxPack ? parseInt(taxPack["pay_off"]).toLocaleString() : 0}원
          </td>
          <td>근로소득세외</td>
          <td>
            {taxPack
              ? (
                  parseInt(taxPack["tax_soduk"]) - parseInt(taxPack["tax_resi"])
                ).toLocaleString()
              : 0}
            원
          </td>
        </tr>
        <tr className="monthlyFive">
          <td className="TabletotalPay">총 지급액</td>
          <td className="TabletotalPay">
            {taxPack ? parseInt(taxPack["totalPay"]).toLocaleString() : 0}원
          </td>
          <td className="TabletotalDeduct">총 공제액</td>
          <td className="TabletotalDeduct">
            {taxPack ? parseInt(taxPack["totalDud"]).toLocaleString() : 0}원
          </td>
        </tr>
      </table>
    </div>
  );
};

export default App;
