import React, { useEffect, useState } from "react";
import axios from "axios";
const HrInfoTable = ({
  startDate,
  endDate,
  selectDepart,
  textName,
  peopleData,
}) => {
  //console.log(peopleData);

  let infoIndex = 1;

  return (
    <div className="HrInfoTable">
      <p>사원정보현황</p>

      <div className="info_Table">
        {!peopleData ? (
          "No data found"
        ) : (
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>사번</th>
                <th>성명</th>
                <th>영문성명</th>
                <th>주민번호</th>
                <th>성별</th>
                <th>부서명</th>
                <th>팀명</th>
                <th>직책</th>
                <th>입사일</th>
              </tr>
            </thead>
            <tbody>
              {peopleData.map(function (name, index) {
                return (
                  <>
                    {name.retire_cls == "0" ? (
                      <tr>
                        <td style={{ minWidth: "20px" }}>{infoIndex++}</td>
                        <td style={{ minWidth: "60px" }}>{name.sabun}</td>
                        <td style={{ minWidth: "50px" }}>{name.name}</td>
                        <td style={{ minWidth: "80px" }}>{name.eng_name}</td>
                        <td style={{ minWidth: "90px" }}>
                          {name.identity.slice(0, 6) + " - " + "⦁ ⦁ ⦁ ⦁ ⦁ ⦁ ⦁"}
                          
                        </td>
                        <td style={{ minWidth: "25px" }}>
                          {name.gender === "0" ? "남자" : "여자"}
                        </td>
                        <td style={{ minWidth: "80px" }}>{name.deptKR}</td>
                        <td style={{ minWidth: "80px" }}>{name.teamKR}</td>
                        <td style={{ minWidth: "80px" }}>{name.rankKR}</td>

                        <td style={{ minWidth: "80px" }}>
                          {name.start_date.slice(0, 4)}년&nbsp;{" "}
                          {name.start_date.slice(4, 6)}월&nbsp;{" "}
                          {name.start_date.slice(6, 8)}일&nbsp;
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HrInfoTable;
