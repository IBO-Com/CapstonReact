import React, { useEffect, useState } from "react";
import "../css/vactionManage/formVacationManage.css";
import * as GetCDTR from "../modules/getCDTR";
import axios from "axios";
import qs from "qs";
import IBOstamp from "../img/stamp.png";

const App = ({ componentRef, sabun, retrieveDate }) => {
  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let toDayDate = now.getDate();

    return todayYear + "-" + todayMonth + "-" + toDayDate;
  };

  const dateFormatString = (date) => {
    // 20201010

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + month + day;
  };

  const [today, setToday] = useState(new Date());
  const [defaultYear, setDefaultYear] = useState("19");
  const [annualData, setannualData] = useState();

  const vacationData = {
    0: "연차",
    "01": "오전반차",
    "02": "오후반차",
    "03": "경조휴가",
    "04": "병결",
    "05": "기타",
  };

  const emerRelation = {
    0: "부",
    "01": "모",
    "02": "형제",
    "03": "자매",
    "04": "직장동료",
    "05": "친구",
  };

  useEffect(() => {
    if (!sabun) return;
    let postParam = qs.stringify({
      sabunOrName: sabun,
    });

    axios
      .post("http://43.200.115.198:8080/vacationCheck.jsp", postParam)
      .then((response) => {
        setannualData(response.data.ITEMS[0]);
        let annualInfo = response.data.ITEMS[0];
        console.log(annualInfo);
      });
  }, [sabun]);

  return (
    <div ref={componentRef} className="formProofofempMain">
      <div className="perCardtitle">
        <p>휴가신청서</p>
      </div>

      <table className="formVmTable">
        <tr className="form_vm_sign">
          <td>
            담<br></br>당
          </td>
          <td></td>
          <td>
            과<br></br>장
          </td>
          <td></td>
          <td>
            부<br></br>장
          </td>
          <td></td>
          <td>
            대<br></br>표
          </td>
          <td></td>
        </tr>
      </table>
      <br></br>
      <table className="formProofofeTable">
        <tr className="formProofofeFirst">
          <td>성명</td>
          <td>{annualData ? annualData["name"] : ""}</td>
          <td>소속</td>
          <td>
            {annualData ? annualData["deptKR"] : ""}{" "}
            {annualData ? annualData["teamKR"] : ""}
          </td>
        </tr>

        <tr className="formProofofeFirst">
          <td>휴가 구분</td>
          <td> {annualData ? vacationData[annualData["vacation"]] : " "}</td>
          <td>직책</td>
          <td>{annualData ? annualData["rankKR"] : ""}</td>
        </tr>

        <tr className="formProofofeFirst">
          <td>기간</td>
          <td colSpan={3}>
            {annualData
              ? annualData["ann_start_date"].slice(0, 4) +
                "년 " +
                annualData["ann_start_date"].slice(4, 6) +
                "월 " +
                annualData["ann_start_date"].slice(6, 8) +
                "일 ~ "
              : " "}
            {annualData
              ? annualData["ann_end_date"].slice(0, 4) +
                "년 " +
                annualData["ann_end_date"].slice(4, 6) +
                "월 " +
                annualData["ann_end_date"].slice(6, 8) +
                "일"
              : " "}
          </td>
        </tr>

        <tr className="formProofofeFirst">
          <td>사유</td>
          <td colSpan={3}>{annualData ? annualData["ann_reason"] : " "}</td>
        </tr>

        <tr className="formProofofeFirst">
          <td>비상연락망</td>
          <td>
            {annualData ? emerRelation[annualData["emer_rel"]] + ") " : ""}
            {annualData ? annualData["emer_tel"] : ""}
          </td>
          <td>대체 업무자</td>
          <td>
            {annualData ? annualData["rep_name"] : " "}{" "}
            {annualData ? annualData["rep_rankKR"] : " "}
          </td>
        </tr>

        <tr className="formProofofeFirstZu">
          <td>유의사항</td>
          <td colSpan={3}>
            ! 휴가 신청서는 휴가 시작일로부터 5일 전에 제출해야 합니다.<br></br>
            ! 경조 휴가와 병가의 경우 휴가 신청일 기준에서 제외됩니다. <br></br>
            ! 대체 업무자를 지정하여 업무 중단이 일어나지 않도록 합니다.
            <br></br>! 대체 업무자 지정은 같은 팀 직원만 가능합니다.<br></br>
            <br></br>
            !! 휴가 직전 신청, 다른 팀 직원 지정시 신청이 반려될 수 있습니다.{" "}
          </td>
        </tr>
      </table>

      <div className="footer_vcm_form">
            <p>상기와 같이 휴가신청서를 제출하오니<br></br>허가하여 주시기 바랍니다.</p>
            <p>{todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 {todayTime().slice(8, 10)}일</p>
            <p className="mbt">IBO</p>
            <p>대표이사 담 당 자 &nbsp;&nbsp; (인)</p>
            <div className="formVCMDiv">
               <img className="formVcm" src={IBOstamp} alt="직인" />
            </div>
         </div>
    </div>
  );
};

export default App;
