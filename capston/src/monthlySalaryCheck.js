import React, { useEffect, useState, useRef } from 'react';
import "./css/monthlySalary/monthlySalaryCheck.css";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import qs from "qs";

const App = () => {
   const todayTime = () => {
      let now = new Date();
      let todayYear = now.getFullYear();
      let todayMonth = now.getMonth() + 1;
      let toDayDate = now.getDate();

      return todayYear + "-" + todayMonth + "-" + toDayDate;
   }

   const [toogleState, setToggleState] = useState(1);
   const [peopleData, setPeopleData] = useState();
   const [textName, setTextName] = useState('');

   const toggleTab = (index) => {
      setToggleState(index);
   }

   useEffect(() => {
      axios.post("http://43.200.115.198:8080/empselect.jsp").then((res) => {
         setPeopleData(res.data.ITEMS);
      }).catch((Error) => {
         console.log(Error);
      })
   }, [])

   const textNameHandle = (e) => {
      setTextName(e.target.value);
   }

   const sendSubmit = () => {
      /* 쿼리 문 작성 */
      let postParam = {};
      let query = {};

      if (textName.trim() == '') {
         delete query["sabunOrName"];
      } else {
         query["sabunOrName"] = textName
      }

      postParam = qs.stringify(
         query
      );

      console.log(query);

      axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((res) => {
         setPeopleData(res.data.ITEMS);
      }).catch((Error) => {
         console.log(Error);
      })
   }


   return (
      <div className="monthlyPay_background">
         <div className="monthlyPay_searchBox">
            <FormControl>
               <TextField
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
               <span>급여지급일 {todayTime()}</span>
               <button className="monthlyPay_Btn">급여명세서 조회</button>
            </div>
            <div className="monthlyPay_total">
               <p>총 급여</p>
               <span className="totalPay">0,000,000원</span>
            </div>
            <div className="monthlyPay_deduct">
               <p>공제액</p>
               <span className="deductPay">0,000,000원</span>
            </div>
            <div className="monthlyPay_amount">
               <p>실수령액</p>
               <span className="amountPay">0,000,000원</span>
            </div>
         </div>


         <div className="monthlyWork_title">
            <p>근태근무내역</p>
         </div>
         <div className="monthlyWork_viewer">
            <div className="monthlyNormalWork_ment">
               <span>일반근무 </span>
               <span> 00시간</span>
            </div>
            <div className="monthlyOvertimeWork_ment">
               <span>연장근무 </span>
               <span> 00시간</span>
            </div>
            <div className="monthlyNightWork_ment">
               <span>야간근무 </span>
               <span> 00시간</span>
            </div>
            <div className="monthlyHolidayWork_ment">
               <span>휴일근무 </span>
               <span> 00시간</span>
            </div>
            <div className="monthlytotalWork_ment">
               <span>총 근무일수 </span>
               <span> 00일</span>
            </div>
            <div className="monthlyWorkTime_ment">
               <span>총 근로시간 </span>
               <span> 000시간</span>
            </div>
         </div>


         <div className="monthlyPayCheck_title">
            <p>급여현황</p>
         </div>
         <table className="monthlyTable">
            <tr className="monthlyFirst">
               <td colSpan={2}>지급액</td>
               <td colSpan={2}>공제액</td>
            </tr>
            <tr className="monthlyOne">
               <td>기본급</td>
               <td></td>
               <td>국민연금</td>
               <td></td>
            </tr>
            <tr className="monthlyTwo">
               <td>연장근무</td>
               <td></td>
               <td>건강보험</td>
               <td></td>
            </tr>
            <tr className="monthlyThree">
               <td>야간근무</td>
               <td></td>
               <td>고용보험</td>
               <td></td>
            </tr>
            <tr className="monthlyFour">
               <td>휴일근무</td>
               <td></td>
               <td>근로소득세</td>
               <td></td>
            </tr>
            <tr className="monthlyFive">
               <td className="totalPay">총 지급액</td>
               <td className="totalPay"></td>
               <td className="totalDeduct">총 공제액</td>
               <td className="totalDeduct"></td>
            </tr>
         </table>
      </div>
   );
};

export default App;