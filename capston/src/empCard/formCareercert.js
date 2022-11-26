import React, { useEffect, useState } from "react";
import "../css/personnelcard/formCareeCert.css";
import * as GetCDTR from "../modules/getCDTR";
import * as GetYearOfWork from "../modules/getYearOfWork";
import axios from "axios";
import qs from "qs";
import IBOstamp from "../img/stamp.png";

const App = ({ componentRef, sabun }) => {
  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let toDayDate = now.getDate();

    return todayYear + "-" + todayMonth + "-" + toDayDate;
  };

  const [today, setToday] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    if (!sabun) return;
    let postParam = qs.stringify({
      sabunOrName: sabun,
    });

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((response) => {
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
          parseInt(userInfo["start_date"].slice(4, 6)) - 1, //Date 연산으로 인한 -1을 해주어야 함
          userInfo["start_date"].slice(6, 8)
        );

        let retireDate = new Date();
        if (userInfo["retire_date"]) {
          let retireDate = new Date(
            userInfo["retire_date"].slice(0, 4),
            parseInt(userInfo["retire_date"].slice(4, 6)) - 1, //Date 연산으로 인한 -1을 해주어야 함
            userInfo["retire_date"].slice(6, 8)
          );
        }
        if (userInfo["retire_cls"] == 1) {
          //퇴직일경우 EndDate를 퇴직일자로 변경
          setEndDate(
            new Date(
              userInfo["retire_date"].slice(0, 4),
              parseInt(userInfo["retire_date"].slice(4, 6)) - 1, //Date 연산으로 인한 -1을 해주어야 함
              userInfo["retire_date"].slice(6, 8)
            )
          );
        }

        GetYearOfWork.getYearOfWork(
          startDate,
          retireDate,
          setWorkYear,
          setWorkMonth,
          setWorkDay
        );

        GetCDTR.getCDTR(
          userInfo["center"],
          userInfo["dept"],
          userInfo["team"],
          userInfo["rank"],
          setCenter,
          setDept,
          setTeam,
          setRank
        );
      });
  }, [sabun]);

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
          <td>
            {userData
              ? defaultYear +
                userData["identity"].slice(0, 2) +
                "-" +
                userData["identity"].slice(2, 4) +
                "-" +
                userData["identity"].slice(4, 6)
              : ""}
          </td>
        </tr>

        <tr className="formProofofeFirst">
          <td>주소</td>
          <td colSpan={3}>
            {userData ? userData["address"] : ""}{" "}
            {userData ? userData["address_detail"] : ""}
          </td>
        </tr>

        <tr className="formProofofeFirst">
          <td>입사일자</td>
          <td>
            {userData
              ? userData["start_date"].slice(0, 4) +
                "-" +
                userData["start_date"].slice(4, 6) +
                "-" +
                userData["start_date"].slice(6, 8)
              : ""}
          </td>
          <td>부서</td>
          <td>{dept}</td>
        </tr>

        <tr className="formProofofeFirst">
          <td>퇴사일자</td>
          <td>
            {userData ? (
              <span>
                {userData["retire_date"]
                  ? userData["retire_date"].slice(0, 4) +
                    "-" +
                    userData["retire_date"].slice(4, 6) +
                    "-" +
                    userData["retire_date"].slice(6, 8)
                  : "재직중"}
              </span>
            ) : (
              <p>오류!</p>
            )}
          </td>
          <td>직책</td>
          <td>{rank}</td>
        </tr>
        <tr className="formProofofeFirst formProofofeSecond">
          <td className="formProofofe_wid">재직기간</td>
          <td colSpan={3} className="enterForm">
            <div className="date_form">
              <div className="date">
                <p>
                  {workYear}년 {workMonth}개월 {workDay}일
                </p>
              </div>

              <div className="date2">
                <p>
                  {userData
                    ? userData["start_date"].slice(0, 4) +
                      "년 " +
                      userData["start_date"].slice(4, 6) +
                      "월 " +
                      userData["start_date"].slice(6, 8) +
                      "일 부터"
                    : ""}
                </p>
                <p>
                  {userData ? (
                    userData["retire_date"] ? (
                      <p>
                        {userData["retire_date"].slice(0, 4) +
                          "년 " +
                          userData["retire_date"].slice(4, 6) +
                          "월 " +
                          userData["retire_date"].slice(6, 8) +
                          "일 까지"}
                      </p>
                    ) : (
                      <p>
                        {todayTime().slice(0, 4) +
                          "년 " +
                          todayTime().slice(5, 7) +
                          "월 " +
                          todayTime().slice(8, 10) +
                          "일 까지"}
                      </p>
                    )
                  ) : (
                    <p>{todayTime()}</p>
                  )}
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <div className="footer_info_form">
        <p>상기와 같이 경력을 증명합니다.</p>
        <p>
          {todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월{" "}
          {todayTime().slice(8, 10)}일
        </p>
        <p className="mbt">IBO</p>
        <p>대표이사 김 유 경 &nbsp;&nbsp; (인)</p>
        <div className="formProofDiv">
          <img className="formProof" src={IBOstamp} alt="직인" />
        </div>
      </div>
    </div>
  );
};

export default App;
