import React, { useEffect, useState } from 'react';
import axios from "axios";
const HrInfoTable = ({startDate, endDate, selectDepart, textName, peopleData}) => {
    
    console.log(peopleData);

    return (
        <div className='HrInfoTable'>
            <p>사원정보현황</p>

            <div className='info_Table'>
                {!peopleData ? ("No data found") : (
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>사진</th>
                                <th>사번</th>
                                <th>성명</th>
                                <th>영문성명</th>
                                <th>주민번호</th>
                                <th>성별</th>
                                <th>부서명</th>
                                <th>직책</th>
                                <th>입사일</th>
                                <th>퇴사일</th>
                            </tr>
                        </thead>
                        <tbody>
                           {peopleData.map(function(name, index){
                                return(
                                    <>
                                        <tr>
                                            <td style={{minWidth:"20px"}}>{index + 1}</td>
                                            <td style={{minWidth:"30px"}}>사진</td>
                                            <td style={{minWidth:"60px"}}>{name.sabun}</td>
                                            <td style={{minWidth:"50px"}}>{name.name}</td>
                                            <td style={{minWidth:"80px"}}>{name.eng_name}</td>
                                            <td style={{minWidth:"100px"}}>{name.identity.slice(0, 6)}-{name.identity.slice(6, 13)}</td>
                                            <td style={{minWidth:"25px"}}>{name.gender === "0" ? "남자" : "여자"}</td>
                                            <td style={{minWidth:"100px"}}>{name.dept === "01" ? "경영지원부" : "" || name.dept === "02" ? "경영관리" : "" || name.dept === "03" ? "침해대응부" : "" || name.dept === "04" ? "관제센터" : "" || name.dept === "05" ? "보안연구부" : "" || name.dept === "06" ? "보안취약점연구부" : ""}</td>
                                            <td style={{minWidth:"30px"}}>{name.rank === "1" ? "사원" : "" || name.rank === "2" ? "대리" : "" || name.rank === "3" ? "과장" : "" || name.rank === "4" ? "차장" : "" || name.rank === "5" ? "부장" : "" || name.rank === "6" ? "이사" : "" || name.rank === "7" ? "상무" : ""  }</td>
                                            <td style={{minWidth:"70px"}}>{name.start_date}</td>
                                            <td style={{minWidth:"30px"}}>{name.retire_date === null ? "-":""}</td>

                                      
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