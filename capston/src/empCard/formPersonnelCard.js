import React, { useEffect, useState } from 'react';
import "../css/personnelcard/formPerCard.css";
import axios from "axios";

const App = ({componentRef}) => {
    const [peopleData, setPeopleData] = useState();

    useEffect(() => {
        axios.post("http://43.200.115.198:8080/empselect.jsp").then((res) => {
            setPeopleData(res.data.ITEMS);
        }).catch((Error) => {
            console.log(Error);
        })
    }, [])

    return (
        <div className='perCard_box' ref={componentRef}>
            <div className='perCardtitle'>
                <p>인사기록카드</p>
            </div>

            <div className='perCard_data'>
                {!peopleData ? ("No data found") : (
                    <table>
                        <thead>
                            <tr>
                                <th>사진</th>
                                <th>한글 성명</th>
                                <th>영문 성명</th>
                                <th>부서명</th>
                                <th>입사년월일</th>
                                <th>직책</th>                                
                                <th>사번</th>
                                <th>생년월일</th>
                                <th>연락처</th>
                                <th>결혼</th>
                                <th>재직구분</th>
                                <th>주소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peopleData.map(function (name, index) {
                                return (
                                    <>
                                        <tr>
                                            <td>사진</td>
                                            <td>{name.name}</td>
                                            <td>{name.eng_name}</td>
                                            <td>{name.dept === "01" ? "경영지원부" : "" || name.dept === "02" ? "경영관리" : "" || name.dept === "03" ? "침해대응부" : "" || name.dept === "04" ? "관제센터" : "" || name.dept === "05" ? "보안연구부" : "" || name.dept === "06" ? "보안취약점연구부" : ""}</td>
                                            <td>{name.start_date.slice(0, 4)}년{name.start_date.slice(4, 6)}월{name.start_date.slice(6, 8)}일</td>
                                            <td>{name.rank === "1" ? "사원" : "" || name.rank === "2" ? "대리" : "" || name.rank === "3" ? "과장" : "" || name.rank === "4" ? "차장" : "" || name.rank === "5" ? "부장" : "" || name.rank === "6" ? "이사" : "" || name.rank === "7" ? "상무" : ""}</td>
                                            <td>{name.sabun}</td>
                                            <td>{name.identity.slice(0, 2)}년{name.identity.slice(2, 4)}월{name.identity.slice(4, 6)}일</td>
                                            <td>{name.tel_no.slice(0, 3)}-{name.tel_no.slice(3, 7)}-{name.tel_no.slice(7, 11)}</td>
                                            <td>{name.married === "0" ? "미혼" : "기혼"}</td>
                                            <td>{name.retire_cls === "0" ? "재직" : "퇴직"}</td>
                                            <td>{name.address}</td>
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

export default App;