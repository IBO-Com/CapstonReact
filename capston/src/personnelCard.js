import React, { useEffect, useState } from 'react';
import "./css/personnelcard/PersonnelCard.css";
import axios from "axios";

const App = () => {
    const [peopleData, setPeopleData] = useState();

    useEffect(() => {
        axios.post("http://43.200.115.198:8080/empselect.jsp").then((res) => {
            setPeopleData(res.data.ITEMS);
        }).catch((Error) => {
            console.log(Error);
        })
    }, [])


    return (
        <div className='personnelCard_box'>
            <div className='CardInfoTable'>
                <span>직원 목록</span>
                <button className="empSelect_Btn">선택직원 미리보기</button>

                <div className='hrCardInfo'>
                    {!peopleData ? ("No data found") : (
                        <table>
                            <thead>
                                <tr>
                                    <th className='Card_Count'>번호</th>
                                    <th className='Card_Select'>선택</th>
                                    <th className='Card_Sabun'>사번</th>
                                    <th className='Card_Name'>성명</th>
                                    <th className='Card_Work'>재직상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peopleData.map(function (name, index) {
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td><input type="checkbox" className='Card_check' /></td>
                                                <td>{name.sabun}</td>
                                                <td>{name.name}</td>
                                                <td>{name.retire_cls === "0" ? "재직" : "퇴직"}</td>
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

            <div className='card_rightBox'>
                <div className='card_empCard'>
                    <span>Hi</span>
                </div>
            </div>
        </div>
    );
};

export default App;