import React, { useEffect, useState } from "react";
import "../css/personnelcard/formCareeCert.css";
import * as GetCDTR from "../modules/getCDTR";
import * as GetYearOfWork from "../modules/getYearOfWork";
import axios from "axios";
import qs from "qs";

const App = ({componentRef, sabun}) => {
   const [today, setToday] = useState(new Date());
   const [defaultYear, setDefaultYear] = useState("19");
   const [userData, setUserData] = useState();
   const [dept, setDept] = useState("");
   const [team, setTeam] = useState("");
   const [rank, setRank] = useState("");
   const [center, setCenter] = useState("");

   const [workYear, setWorkYear] = useState("0");
   const [workMonth, setWorkMonth] = useState("0");
   const [workDay, setWorkDay] = useState("0");
   

   useEffect(() => {
      let postParam = qs.stringify({
         sabunOrName: sabun
       });
   
       axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((response) => {
         setUserData(response.data.ITEMS[0]);
         let userInfo = response.data.ITEMS[0];

         if (
            today.getFullYear() - 2000 <
            parseInt(userInfo["identity"].slice(0, 2))
         ) {
            setDefaultYear("19");
         } else {
            setDefaultYear("20");
         }

         let startDate = new Date(
            userInfo["start_date"].slice(0, 4),
            parseInt(userInfo["start_date"].slice(4, 6)) -1, //Date 연산으로 인한 -1을 해주어야 함
            userInfo["start_date"].slice(6, 8)
         );

         let endDate = new Date();
         if(userInfo["retire_cls"] == 1) { //퇴직일경우 EndDate를 퇴직일자로 변경
            endDate = new Date(
               userInfo["retire_date"].slice(0, 4),
               parseInt(userInfo["retire_date"].slice(4, 6)) -1, //Date 연산으로 인한 -1을 해주어야 함
               userInfo["retire_date"].slice(6, 8)
            )
         } else {
            console.log(startDate.getTime() + "," + endDate.getTime())
         }

         GetYearOfWork.getYearOfWork(startDate, endDate, setWorkYear, setWorkMonth, setWorkDay);
         
         GetCDTR.getCDTR(userInfo["center"], userInfo["dept"], userInfo["team"], userInfo["rank"],
         setCenter, setDept, setTeam, setRank);
       });
   }, [sabun])
   
   return (
      <div ref={componentRef} className="formProofofempMain">
          <div className="perCardtitle">
        <p>경력증명서</p>
        </div>
        <table className="formProofofeTable">
            <tr className="formProofofeFirst">
               <td>성명</td>
               <td>{userData ? userData["name"] : ""}</td>
               <td>생년월일</td>
               <td>{userData ? defaultYear + userData["identity"].slice(0,2) + "-" + userData["identity"].slice(2,4) + "-" + userData["identity"].slice(4, 6) : ""}</td>
            </tr>

            <tr className="formProofofeFirst">
               <td>주소</td>
               <td colSpan={3}>{userData ? userData["address"] : ""}</td>
            </tr>

            <tr className="formProofofeFirst">
               <td>연락처</td>
               <td>{userData ? userData["tel_no"].slice(0, 3) + "-" + userData["tel_no"].slice(3, 7) + "-" + userData["tel_no"].slice(7, 11) : ""}</td>
               <td>부서</td>
               <td>{dept}</td>
            </tr>

            <tr className="formProofofeFirst">
               <td>입사일자</td>
               <td>{userData ? userData["start_date"].slice(0, 4) + "-" + userData["start_date"].slice(4, 6) + "-" + userData["start_date"].slice(6, 8) : ""}</td>
               <td>직책</td>
               <td>{rank}</td>
            </tr>
            <tr className="formProofofeFirst formProofofeSecond">
               <td>재직기간</td>
               <td colSpan={3} className="enterForm">
                  <div className='date_form'>
                     <div className='date'>
                        <p>{workYear}년 1월 1일부터</p>
                        <p>2020년 12월 31일까지</p>
                     </div>
                     <div className='date2'>
                        <p>(1년 0개월 0일)</p>
                     </div>
                  </div>

               </td>
            </tr>
            
        </table>

         <div className="footer_info_form">
            <p>상기와 같이 재직하고 있음을 증명합니다.</p>   
            <p>2022년 10월 9일</p>
            <p className="mbt">IBO</p>
            <p>대표이사 담 당 자 (인)</p>
         </div>   
      </div>
   );
};

export default App;