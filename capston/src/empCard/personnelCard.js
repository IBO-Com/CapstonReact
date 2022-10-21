import React, { useEffect, useState, useRef } from 'react';
import "../css/personnelcard/PersonnelCard.css";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";
import qs from "qs";

import FormCareercert from "./formCareercert";
import FormPersonnelCard from './formPersonnelCard';
import FormProofofemp from './formProofofemp';
import ReactToPrint from 'react-to-print';

const App = () => {
    const [selectDepart, setSelectDepart] = useState("*")
    const [textName, setTextName] = useState('');
    const [peopleData, setPeopleData] = useState();
    const [sabun, setSabun] = useState();
    const componentRef = useRef(null);

    const [toogleState, setToggleState] = useState(1);

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
    
    const radioBoxChange = (sabun) => {
        setSabun(sabun);
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
        if (selectDepart == '*') {
            delete query["dept"];
        } else {
            query["dept"] = selectDepart;
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

    const handleSelectDepart = (event) => {
        setSelectDepart(event.target.value);
    };


    const textNameHandle = (e) => {
        setTextName(e.target.value);
    }


    return (
        <div className='personnelCard_box'>
            <div className='card_search_box'>
                <div className="card_dateBox">
                    <FormControl>
                        <Select
                            value={selectDepart || ""}
                            sx={{
                                minWidth: "153px",
                                height: 39,
                                marginLeft: "15px",
                                marginRight: "26px",
                            }}
                            onChange={handleSelectDepart}
                        >
                            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"*"}>
                                전체부서
                            </MenuItem>

                            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"01"}>
                                경영지원부
                            </MenuItem>

                            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"02"}>
                                경영관리부
                            </MenuItem>

                            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"03"}>
                                침해대응부
                            </MenuItem>

                            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"04"}>
                                관제센터
                            </MenuItem>

                            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"05"}>
                                보안연구부
                            </MenuItem>

                            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"06"}>
                                보안취약점연구부
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="outlined-card"
                            label="사번/성명"
                            variant="outlined"
                            size="small"
                            onChange={textNameHandle}
                        />
                    </FormControl>
                    <button className="card_search_btn" onClick={() => { sendSubmit() }}>검색</button>
                </div>

                <hr className='card_lineBar'></hr>

                <div className='personnelCard_box'>
                    <div className='CardInfoTable'>
                        <span>직원 목록</span>

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
                                                        <td><input type="radio" name="userSelect" className='Card_radio' onChange={() => {radioBoxChange(name.sabun)}} /></td>
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

                    <div className='card_empCard'>
                        <div className='card_Btnbox'>
                            
                            <ReactToPrint
                                trigger={() => <button className='print_Btn'>인쇄</button>}
                                content={() => componentRef.current}
                            />
                            <button className="empSelect_Btn" onClick={() => { toggleTab(1) }}>인사기록카드</button>
                            <button className="proof_of_emp_btn" onClick={() => { toggleTab(2) }}>재직증명서</button>
                            <button className="work_emp_btn" onClick={() => { toggleTab(3) }}>경력증명서</button>
                        </div>
                        <div className='Card_viewer'>
                            {toogleState === 1 ? <FormPersonnelCard componentRef={componentRef} sabun={sabun}/> : ""}
                            {toogleState === 2 ? <FormProofofemp componentRef={componentRef} sabun={sabun}/> : ""}
                            {toogleState === 3 ? <FormCareercert componentRef={componentRef} sabun={sabun}/> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;