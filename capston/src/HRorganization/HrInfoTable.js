import React, { useEffect, useState } from 'react';
import axios from "axios";
const HrInfoTable = ({ startDate, endDate, selectDepart, textName, peopleData }) => {

    //console.log(peopleData);

    return (
        <div className='HrInfoTable'>
            <p>사원정보현황</p>

            <div className='info_Table'>
                {!peopleData ? ("No data found") : (
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
                                        <tr>
                                            <td style={{ minWidth: "20px" }}>{index + 1}</td>
                                            <td style={{ minWidth: "60px" }}>{name.sabun}</td>
                                            <td style={{ minWidth: "50px" }}>{name.name}</td>
                                            <td style={{ minWidth: "80px" }}>{name.eng_name}</td>
                                            <td style={{ minWidth: "90px" }}>{name.identity.slice(0, 6)}-{name.identity.slice(6, 13)}</td>
                                            <td style={{ minWidth: "25px" }}>{name.gender === "0" ? "남자" : "여자"}</td>
                                            <td style={{ minWidth: "80px" }}>{name.dept === "01" ? "경영지원부" : "" || name.dept === "02" ? "경영관리부" : "" || name.dept === "03" ? "침해대응부" : "" || name.dept === "04" ? "관제센터" : "" || name.dept === "05" ? "보안연구부" : "" || name.dept === "06" ? "보안취약점연구부" : ""}</td>
                                            <td style={{ minWidth: "80px" }}>{name.team === "101" ? "인사관리팀" : "" || name.team === "102" ? "마케팅팀" : "" || name.team === "201" ? "총무회계팀" : "" || name.team === "202" ? "경리팀" : "" || name.team === "301" ? "침해대응팀" : "" || name.team === "302" ? "위협분석팀" : "" || name.team === "401" ? "보안관제팀" : "" || name.team === "402" ? "정보보호팀" : "" || name.team === "501" ? "연구팀" : "" || name.team === "502" ? "연구기획팀" : "" || name.team === "601" ? "종합분석팀" : "" || name.team === "602" ? "취약점분석팀" : ""}</td>
                                            <td style={{ minWidth: "30px" }}>{name.rank === "1" ? "사원" : "" || name.rank === "2" ? "대리" : "" || name.rank === "3" ? "과장" : "" || name.rank === "4" ? "차장" : "" || name.rank === "5" ? "부장" : "" || name.rank === "6" ? "이사" : "" || name.rank === "7" ? "상무" : ""}</td>
                                            <td style={{ minWidth: "80px" }}>{name.start_date.slice(0, 4)}년&nbsp; {name.start_date.slice(4, 6)}월&nbsp; {name.start_date.slice(6, 8)}일&nbsp;</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                )
                }
            </div>
        </div>
    );
};

export default HrInfoTable;