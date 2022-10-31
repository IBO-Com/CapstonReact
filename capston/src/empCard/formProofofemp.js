import React, { useEffect, useState } from "react";
import "../css/personnelcard/formProofEmp.css";
import * as GetCDTR from "../modules/getCDTR";
import axios from "axios";
import qs from "qs";
import IBOstamp from "../img/stamp.png";

const App = ({ componentRef, sabun }) => {
   const [today, setToday] = useState(new Date());
   const [defaultYear, setDefaultYear] = useState("19");
   const [userData, setUserData] = useState();
   const [dept, setDept] = useState("");
   const [team, setTeam] = useState("");
   const [rank, setRank] = useState("");
   const [center, setCenter] = useState("");

   useEffect(() => {
      if(!sabun) return;
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
   
           GetCDTR.getCDTR(userInfo["center"], userInfo["dept"], userInfo["team"], userInfo["rank"],
           setCenter, setDept, setTeam, setRank);
       });
   }, [sabun])
   
  
   return (
    <div ref={componentRef} className="formProofofempMain">
      <div className="perCardtitle">
        <p>재직증명서</p>
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
               <td>용도</td>
               <td colSpan={3}>제출용</td>
            </tr>
            
        </table>

         <div className="footer_info_form">
            <p>상기와 같이 재직하고 있음을 증명합니다.</p>   
            <p>2022년 10월 9일</p>
            <p className="mbt">IBO</p>
            <p>대표이사 담 당 자 &nbsp;&nbsp; (인)</p>
         </div>   
         <img className="formProof" src={IBOstamp} alt="직인" />
    </div>
  );
};

export default App;
