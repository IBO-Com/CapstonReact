import React, { useEffect, useState, useRef } from 'react';
import "../css/monthlySalary/monthlySalaryCheck.css";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";
import Modal from 'react-modal';
import axios from "axios";
import qs from "qs";
import ModalMonthlySalary from "./modalMonthlySalary";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import * as GetFinalTax from "../modules/getFinalTax";

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
   const todayTime = () => {
      let now = new Date();
      let todayYear = now.getFullYear();
      let todayMonth = now.getMonth() + 1;
      let toDayDate = now.getDate();

      return todayYear + "-" + todayMonth + "-" + toDayDate;
   }
   
   const [textName, setTextName] = useState('');
   const [monthlyPayDebuct, setMonthlyPayDebuct] = useState(false);
   const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
   const [tempPack, setTempPack] = useState({});
   const [taxPack, setTaxPack] = useState({ //기본 데이터 꼭 필요함
      sabunOrName: 0,
      retrieveDate: 0,
      day: 0,
      연봉: 0,
      월급: 0,

      일반근무시간: 0,
      연장근무금액: 0,
      연장근무시간: 0,
      야간근무금액: 0,
      야간근무시간: 0,
      
      휴일근무금액: 0,
      휴일근무시간: 0,
      국민연금: 0,
      건강보험: 0,
      장기요양: 0,
      
      고용보험: 0,
      근로소득세: 0,
      주민세: 0,
      총지급액: 0,
      총공제액: 0,
      
      실수령액: 0
  });

   //console.log(monthlyPayDebuct);

   const handleDateChange = (date) => {
      setRetrieveDate(getFormatDate(date));
    };

   const textNameHandle = (e) => {
      setTextName(e.target.value);
   }

   const sendSubmit = () => {
      GetFinalTax.getAllTaxToJson(textName, retrieveDate, setTaxPack);
      GetFinalTax.getAllTaxToJsonAllMonth("이정재", "2022", setTempPack);
   }

   return (
      <div className="monthlyPay_background">
         <div className="monthlyPay_searchBox">
            <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
               <DatePicker
                  style={{marginLeft:"18px"}}
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
                     marginLeft:"30px",
                     marginTop:"0px",
                     lineHeight: "36px",
                     width: "170px",
                     height: "36px"
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
            <button className="monthlyPay_search_btn" onClick={() => { sendSubmit() }}>검색</button>
         </div>
         <hr className='monthlyPay_lineBar'></hr>

         <div className="monthlyPay_title">
            <span>{retrieveDate.split("-")[0] + "년 " + retrieveDate.split("-")[1] + "월"} 총 급여액</span>
         </div>

         <div className="monthlyPay_viewer">
            <div className="monthlyPay_ment">
               <span>급여지급일 {retrieveDate.split("-")[0] + "년 " + retrieveDate.split("-")[1] + "월"} 5일</span>
               <button className="monthlyPay_Btn">(주) IBO</button>
            </div>
            <div className="monthlyPay_total">
               <p>총 급여</p>
               <span className="totalPay">{taxPack.총지급액.toLocaleString()}원</span>
            </div>
            <div className="monthlyPay_deduct">
               <p>공제액</p>
               <span className="deductPay">{taxPack.총공제액.toLocaleString()}원</span>
            </div>
            <div className="monthlyPay_amount">
               <p>실수령액</p>
               <span className="amountPay">{taxPack.실수령액.toLocaleString()}원</span>
            </div>
         </div>


         <div className="monthlyWork_title">
            <p>근태근무내역</p>
         </div>
         <div className="monthlyWork_viewer">
            <div className="monthlyNormalWork_ment">
               <span>일반근무&nbsp;</span>
               <span>{(taxPack.일반근무시간 / 60).toFixed(1)}시간</span>
            </div>
            <div className="monthlyOvertimeWork_ment">
               <span>연장근무&nbsp;</span>
               <span>{(taxPack.연장근무시간 / 60).toFixed(1)}시간</span>
            </div>
            <div className="monthlyNightWork_ment">
               <span>야간근무&nbsp;</span>
               <span>{(taxPack.야간근무시간 / 60).toFixed(1)}시간</span>
            </div>
            <div className="monthlyHolidayWork_ment">
               <span>휴일근무&nbsp;</span>
               <span>{(taxPack.휴일근무시간 / 60).toFixed(1)}시간</span>
            </div>
            <div className="monthlytotalWork_ment">
               <span>총 근무일수&nbsp;</span>
               <span>{taxPack.day}일</span>
            </div>
            <div className="monthlyWorkTime_ment">
               <span>총 근로시간&nbsp;</span>
               <span>{parseFloat((taxPack.일반근무시간 / 60).toFixed(1)) + parseFloat((taxPack.연장근무시간 / 60).toFixed(1)) + parseFloat((taxPack.야간근무시간 / 60).toFixed(1)) + parseFloat((taxPack.휴일근무시간 / 60).toFixed(1))}시간</span>
            </div>
         </div>

         <div className="monthlyPayCheck_title">
            <p>급여현황</p>
            <button
               className="monthlyPayDebuct"
               onClick={() => {
                  setMonthlyPayDebuct(true);
               }}>
                  공제액 도움말
            </button>
         </div>
         {monthlyPayDebuct == true ? (
            <ModalMonthlySalary setMonthlyPayDebuct = {setMonthlyPayDebuct}/>
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
               <td>{taxPack.월급.toLocaleString()}원</td>
               <td>국민연금</td>
               <td>{taxPack.국민연금.toLocaleString()}원</td>
            </tr>
            <tr className="monthlyTwo">
               <td>연장근무</td>
               <td>{taxPack.연장근무금액.toLocaleString()}원</td>
               <td>건강보험외</td>
               <td>{parseInt(taxPack.건강보험 + taxPack.장기요양).toLocaleString()}원</td>
            </tr>
            <tr className="monthlyThree">
               <td>야간근무</td>
               <td>{taxPack.야간근무금액.toLocaleString()}원</td>
               <td>고용보험</td>
               <td>{taxPack.고용보험.toLocaleString()}원</td>
            </tr>
            <tr className="monthlyFour">
               <td>휴일근무</td>
               <td>{taxPack.휴일근무금액.toLocaleString()}원</td>
               <td>근로소득세외</td>
               <td>{(taxPack.근로소득세 + taxPack.주민세).toLocaleString()}원</td>
            </tr>
            <tr className="monthlyFive">
               <td className="TabletotalPay">총 지급액</td>
               <td className="TabletotalPay">{taxPack.총지급액.toLocaleString()}원</td>
               <td className="TabletotalDeduct">총 공제액</td>
               <td className="TabletotalDeduct">{taxPack.총공제액.toLocaleString()}원</td>
            </tr>
         </table>
      </div>
   );
};

export default App;