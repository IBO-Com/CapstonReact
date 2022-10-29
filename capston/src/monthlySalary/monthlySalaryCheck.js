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

   let defaultValue = {
      payOver: 1.5, //연장
      payNight: 1.5, //야근 
      payRest: 1.5, //휴일
      np: 0.045, //국민연금
      health:0.03495, //건강보험
      longCare: 0.1227, //장기요양
      emp: 0.009 //고용보험
   }


   const todayTime = () => {
      let now = new Date();
      let todayYear = now.getFullYear();
      let todayMonth = now.getMonth() + 1;
      let toDayDate = now.getDate();

      return todayYear + "-" + todayMonth + "-" + toDayDate;
   }
   const [salaryData, setSalaryData] = useState({});
   const [salary, setSalary] = useState(0);
   const [payOver, setPayOver] = useState(1);
   const [payNight, setPayNight] = useState(1);
   
   const [normalWorkTime, setNormalWorkTime] = useState(0); //기본 시간
   const [restWorkTime, setRestWorkTime] = useState(0); //휴일 시간
   const [overWorkTime, setOverWorkTime] = useState(0); //연장시간
   const [nightWorkTime, setNightWorkTime] = useState(0); //야근시간
   const [day, setDay] = useState(0); //일한시간

   const [overMoney, setOverMoney] = useState(0); //연장 돈
   const [nightMoney, setNightMoney] = useState(0); //야근 돈 
   const [restMoney, setRestMoney] = useState(0); //휴일 돈
   const [totalMoney, setTotalMoney] = useState(0); //총 금액

   const [nationalPension, setNationalPension] = useState(0); //국민연금
   const [healthInsurance, setHealthInsurance] = useState(0); //건강 보험
   const [longCare, setLongCare] = useState(0); //장기요양
   const [employmentInsurance, setEmploymentInsurance] = useState(0); //고용보험
   const [incomeTax, setIncomTax] = useState(0); //근로소득세
   const [residentTax, setResidentTax] = useState(0); //주민세
   const [totalDeductible, setTotalDeductible] = useState(0); //총 공제액 

   
   const [toogleState, setToggleState] = useState(1);
   const [peopleData, setPeopleData] = useState();
   const [textName, setTextName] = useState('');
   const [monthlyPayDebuct, setMonthlyPayDebuct] = useState(false);
   const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));

   //console.log(monthlyPayDebuct);

   const handleDateChange = (date) => {
      setRetrieveDate(getFormatDate(date));
    };

   const textNameHandle = (e) => {
      setTextName(e.target.value);
   }

   const sendSubmit = () => {
      /* 쿼리 문 작성 */
      let postParam = {};
      let query = {};

      if (textName.trim() == '') {
         delete query["sabunOrName"];
         alert("사번/성명을 입력해주세요.");
         return;
      } else {
         query["sabunOrName"] = textName
      }

      postParam = qs.stringify(
         query
      );

      axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((res) => {
         let data = res.data.ITEMS;
         if(data.length == 0) {
            alert("사원이 존재하지 않습니다.");
            setTotalDeductible(0);
            setTotalMoney(0);
            setSalary(0);
            setNormalWorkTime(0);
            setOverMoney(0); setOverWorkTime(0);
            setNightMoney(0); setNightWorkTime(0);
            setRestMoney(0); setRestWorkTime(0);
            setDay(0);
            setNationalPension(0);
            setHealthInsurance(0); setLongCare(0);
            setEmploymentInsurance(0);
            setIncomTax(0); setResidentTax(0);
            return;
         }
         /* 기본연금 측정 */
         let postParam2 = {
            rank : data[0].rank
         }

         postParam2 = qs.stringify(postParam2)
         axios.post("http://43.200.115.198:8080/getPayCommon.jsp", postParam2).then((res2) => {
            let data2 = res2.data.ITEMS;
            console.log("Salary Response Data : ", data2);
            setSalaryData(data2[0]);
            setSalary(parseInt(data2[0].salary));

            let moneyData = Math.floor(data2[0].salary / 12);
            moneyData = parseInt(moneyData / 1000) * 1000;
           

            setNationalPension(parseInt(moneyData * defaultValue.np));
            setHealthInsurance(parseInt(moneyData * defaultValue.health));
            setLongCare(parseInt((moneyData * defaultValue.health) * defaultValue.longCare));
            setEmploymentInsurance(parseInt(moneyData * defaultValue.emp));
         }).catch((Error) => {
            alert("Error Code : 100");
         })


         /* 근무시간 측정 */
         postParam2 = {
            start_date:(retrieveDate + "01").replace("-", ""),
            retire_date:(retrieveDate + "32").replace("-", ""),
            sabunOrName:textName
         }

         postParam2 = qs.stringify(postParam2)
         axios.post("http://43.200.115.198:8080/getAttendanceTime.jsp", postParam2).then((res2) => {
            let data2 = res2.data.ITEMS;
            setNormalWorkTime(parseInt(data2.s_normal_work_time)); //일반 근무시간
            setRestWorkTime(parseInt(data2.s_rest_work_time)); //휴일 근무시간
            console.log("Response Data : ", data2);
         }).catch((Error) => {
            alert("Error Code : 101");
         })

         /* 근무 외 시간 측정 */
         axios.post("http://43.200.115.198:8080/getAttendanceOverTime.jsp", postParam2).then((res2) => {
            let data2 = res2.data.ITEMS;
            setOverWorkTime(parseInt(data2.s_over_datetime)); //연장시간
            setNightWorkTime(parseInt(data2.s_night_datetime)); //야근시간
            setDay(parseInt(data2.day)); //일한일수
         }).catch((Error) => {
            alert("Error Code : 102");
         })
         //getAttendanceOverTime.jsp

      }).catch((Error) => {
         console.log(Error);
      })
   }

   useEffect(() => { //연장 근무
      setOverMoney(Math.floor(((salary / 12 / 209) * defaultValue.payOver * parseFloat(overWorkTime / 60).toFixed(1))));
   }, [overWorkTime]);

   useEffect(() => { //야근 근무 
      setNightMoney(Math.floor(((salary / 12 / 209) * defaultValue.payNight * parseFloat(nightWorkTime / 60).toFixed(1))));
   }, [nightWorkTime]);

   useEffect(() => { //휴일 근무
      setRestMoney(Math.floor(((salary / 12 / 209) * defaultValue.payRest * parseFloat(restWorkTime / 60).toFixed(1))));
   }, [restWorkTime])

   useEffect(() => { //근로소득세, 주민세 계산
      let moneyData = Math.floor(salary / 12);
      let postParam = {
         monthPay: parseInt(moneyData)
      }
      postParam = qs.stringify(postParam);
      axios.post("http://43.200.115.198:8080/getIncomTax.jsp", postParam).then((res) => {
         let data = res.data.ITEMS;
         setIncomTax(parseInt(data.incomeTax));
         setResidentTax(parseInt(parseInt(data.incomeTax) / 10));
      }).catch((Error) => {
         alert("Error Code : 103");
      })
   }, [salary])

   useEffect(() => { //총 공제액
      setTotalDeductible(nationalPension + healthInsurance + longCare + employmentInsurance + incomeTax + residentTax);
   }, [nationalPension, healthInsurance, longCare, employmentInsurance, incomeTax, residentTax])

   useEffect(() => { //총 지급액
      setTotalMoney(overMoney + nightMoney + restMoney + parseInt(salary / 12));
   }, [overMoney, nightMoney, restMoney, salary])

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
            <span>{todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 총 급여액</span>
         </div>

         <div className="monthlyPay_viewer">
            <div className="monthlyPay_ment">
               <span>급여지급일 {todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 5일</span>
               <button className="monthlyPay_Btn">(주) IBO</button>
            </div>
            <div className="monthlyPay_total">
               <p>총 급여</p>
               <span className="totalPay">{totalMoney.toLocaleString()}원</span>
            </div>
            <div className="monthlyPay_deduct">
               <p>공제액</p>
               <span className="deductPay">{totalDeductible.toLocaleString()}원</span>
            </div>
            <div className="monthlyPay_amount">
               <p>실수령액</p>
               <span className="amountPay">{(totalMoney - totalDeductible).toLocaleString()}원</span>
            </div>
         </div>


         <div className="monthlyWork_title">
            <p>근태근무내역</p>
         </div>
         <div className="monthlyWork_viewer">
            <div className="monthlyNormalWork_ment">
               <span>일반근무&nbsp;</span>
               <span>{(normalWorkTime / 60).toFixed(1)}시간</span>
            </div>
            <div className="monthlyOvertimeWork_ment">
               <span>연장근무&nbsp;</span>
               <span>{(overWorkTime / 60).toFixed(1)}시간</span>
            </div>
            <div className="monthlyNightWork_ment">
               <span>야간근무&nbsp;</span>
               <span>{(nightWorkTime / 60).toFixed(1)}시간</span>
            </div>
            <div className="monthlyHolidayWork_ment">
               <span>휴일근무&nbsp;</span>
               <span>{(restWorkTime / 60).toFixed(1)}시간</span>
            </div>
            <div className="monthlytotalWork_ment">
               <span>총 근무일수&nbsp;</span>
               <span>{day}일</span>
            </div>
            <div className="monthlyWorkTime_ment">
               <span>총 근로시간&nbsp;</span>
               <span>{parseFloat((normalWorkTime / 60).toFixed(1)) + parseFloat((overWorkTime / 60).toFixed(1)) + parseFloat((nightWorkTime / 60).toFixed(1)) + parseFloat((restWorkTime / 60).toFixed(1))}시간</span>
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
               <td>{parseInt(salary / 12).toLocaleString()}원</td>
               <td>국민연금</td>
               <td>{nationalPension.toLocaleString()}원</td>
            </tr>
            <tr className="monthlyTwo">
               <td>연장근무</td>
               <td>{overMoney.toLocaleString()}원</td>
               <td>건강보험외</td>
               <td>{parseInt(healthInsurance + longCare).toLocaleString()}원</td>
            </tr>
            <tr className="monthlyThree">
               <td>야간근무</td>
               <td>{nightMoney.toLocaleString()}원</td>
               <td>고용보험</td>
               <td>{employmentInsurance.toLocaleString()}원</td>
            </tr>
            <tr className="monthlyFour">
               <td>휴일근무</td>
               <td>{restMoney.toLocaleString()}원</td>
               <td>근로소득세외</td>
               <td>{(incomeTax + residentTax).toLocaleString()}원</td>
            </tr>
            <tr className="monthlyFive">
               <td className="TabletotalPay">총 지급액</td>
               <td className="TabletotalPay">{totalMoney.toLocaleString()}원</td>
               <td className="TabletotalDeduct">총 공제액</td>
               <td className="TabletotalDeduct">{totalDeductible.toLocaleString()}원</td>
            </tr>
         </table>
      </div>
   );
};

export default App;