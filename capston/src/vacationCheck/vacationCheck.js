import React, { useEffect, useState, useRef } from "react";
import "../css/vacationCheck/vacationCheck.css";
import axios from "axios";
import { FormControl, Select, MenuItem, TextField, Button } from "@mui/material";
import qs from "qs";

const App = () => {
    const [selectDepart, setSelectDepart] = useState("*");
    const [selectDep, setSelectDep] = useState('*');
    const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
    const [textName, setNameText] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    function getFormatDate(date) {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        return year + "-" + month;
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleChange = (event) => {
        setSelectDep(event.target.value)
    };

    const handleStartDateChange = (date) => {
        setRetrieveDate(getFormatDate(date));
    };


    const sendSubmit = () => {
        console.log("send submit");

        /* 쿼리 문 작성 */
        let postParam = {};
        let query = {};

        if (textName.trim() == "") {
            delete query["sabunOrName"];
        } else {
            query["sabunOrName"] = textName;
        }
        if (selectDepart == "*") {
            delete query["dept"];
        } else {
            query["dept"] = selectDepart;
        }

        postParam = qs.stringify(query);

        //console.log(query);

        axios
            .post("http://43.200.115.198:8080/empselect.jsp", postParam)
            .then((res) => {
                setPeopleData(res.data.ITEMS);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const handleSelectDepart = (event) => {
        setSelectDepart(event.target.value);
    };

    const textNameHandle = (e) => {
        setTextName(e.target.value);
    };

    return (
        <div className="personnelCard_box">
            <div className="card_search_box">
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
                    <button
                        className="card_search_btn"
                        onClick={() => {
                            sendSubmit();
                        }}
                    >
                        검색
                    </button>
                </div>

                <hr className="card_lineBar"></hr>
                <div className="vc_Flex">
                    <div className="vc_Request"> {/** */}
                    <p className="vc_Request_title">연차/휴가 요청</p>
                        <div className="vacationWrap">
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인</button>
                                    <button className="vc_refusal_btn">반려</button>
                                </div>
                            </div>
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인</button>
                                    <button className="vc_refusal_btn">반려</button>
                                </div>
                            </div>
                        </div>
                        <div className="vacationWrap">
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인</button>
                                    <button className="vc_refusal_btn">반려</button>
                                </div>
                            </div>
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인</button>
                                    <button className="vc_refusal_btn">반려</button>
                                </div>
                            </div>
                        </div>
                        <div className="vacationWrap">
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인</button>
                                    <button className="vc_refusal_btn">반려</button>
                                </div>
                            </div>
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인</button>
                                    <button className="vc_refusal_btn">반려</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="vc_compltion">
                        <p className="vc_compltion_title">완료된 요청</p>

                        <div className="vacationWrap">
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인됨</button>
                                </div>
                            </div>
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인됨</button>
                                </div>
                            </div>
                        </div>
                        <div className="vacationWrap">
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인됨</button>
                                </div>
                            </div>
                        </div>
                        <div className="vacationWrap">
                            <div className="vacationBox">
                                <p className="vc_name">연차 신청 - 김누구</p> {/* 오전반차면 오전반차 신청 - 김누구 */}
                                <p className="vc_date">일시&nbsp; : &nbsp;2022년 11월 20일</p>
                                <p className="vc_replace">대체 업무자&nbsp; : &nbsp;누구누구 대리</p>

                                <div className="vc_btnbox">
                                    <button className="vc_approval_btn">승인됨</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
