import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../css/payslipCheck/payslipCheck.css";
import "react-datepicker/dist/react-datepicker.css";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import { Button, MenuItem, TextField } from "@mui/material";
import qs from "qs";
import ReactToPrint from "react-to-print";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";

import FormPayslip from "./formPayslip";


class koLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "yyyy년　　 MM월", { locale: this.locale });
    }
}


const App = () => {
    const [startDate, setStartDate] = useState(new Date("2020-10-01"));
    const [endDate, setEndDate] = useState(new Date());
    const [selectDepart, setSelectDepart] = useState("*");
    const [textName, setTextName] = useState("");
    const [peopleData, setPeopleData] = useState();
    const [sabun, setSabun] = useState();
    const componentRef = useRef(null);

    const [toogleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDatetDateChange = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        axios
            .post("http://43.200.115.198:8080/empselect.jsp")
            .then((res) => {
                setPeopleData(res.data.ITEMS);
            })
            .catch((Error) => {
                console.log(Error);
            });
    }, []);

    const radioBoxChange = (sabun) => {
        setSabun(sabun);
    };

    const sendSubmit = () => {
        /* 날짜 포멧 */
        console.log("isEnter????");
        let sYear = String(startDate.getFullYear());
        let sMonth = startDate.getMonth() + 1;

        let eYear = String(endDate.getFullYear());
        let eMonth = endDate.getMonth() + 1;

        if (sMonth < 10) {
            sMonth = "0" + sMonth;
        }

        if (eMonth < 10) {
            eMonth = " 0" + eMonth;
        }

        let sDate = sYear + sMonth;
        let eDate = eYear + eMonth;

        /* 쿼리 문 작성 */
        let postParam = {};
        let query = {};

        query["startDate"] = sDate;
        query["retireDate"] = eDate;
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
    };


    return (
        <div className="payslipCheck_box">
            <div className="payslip_search_box">
                <div className="payslip_dateBox">
                    <span>기준일자 </span>
                    <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
                        <DatePicker
                            autoOk
                            variant="inline"
                            views={["year", "month"]}
                            format="yyyy-MM"
                            value={startDate}
                            inputVariant="outlined"
                            showTodayButton
                            className="startDate"
                            size="small"
                            todayLabel="오늘"
                            onChange={handleStartDateChange}
                        />
                    </MuiPickersUtilsProvider>
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
                        className="payslip_search_btn"
                        onClick={() => { sendSubmit() }}
                    >
                        검색
                    </button>
                </div>

                <hr className="payslip_lineBar"></hr>

                <div className="payslipCheck_box">
                    <div className="payslipInfoTable">
                        <span>사원 정보</span>

                        <div className="payslipInfo">
                            {!peopleData ? (
                                "No data found"
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="payslip_Count">번호</th>
                                            <th className="payslip_Select">선택</th>
                                            <th className="payslip_Sabun">사번</th>
                                            <th className="payslip_Name">성명</th>
                                            <th className="payslip_Work">부서</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {peopleData.map(function (name, index) {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <input
                                                                type="radio"
                                                                name="userSelect" className="Card_radio"
                                                                onChange={() => {
                                                                    radioBoxChange(name.sabun);
                                                                }}
                                                                onClick={() => {
                                                                    toggleTab(1);
                                                                }}
                                                            />
                                                        </td>
                                                        <td>{name.sabun}</td>
                                                        <td>{name.name}</td>
                                                        <td>{name.dept === "01" ? "경영지원부" : "" || name.dept === "02" ? "경영관리" : "" || name.dept === "03" ? "침해대응부" : "" || name.dept === "04" ? "관제센터" : "" || name.dept === "05" ? "보안연구부" : "" || name.dept === "06" ? "보안취약점연구부" : ""}</td>
                                                    </tr>
                                                </>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    <div className="payslip_empCard">
                        <div className="payslip_Btnbox">
                            <ReactToPrint
                                trigger={() => <button className="print_Btn">인쇄</button>}
                                content={() => componentRef.current}
                            />
                            <button className="payslip_Btn">다운로드</button>
                        </div>
                        <div className="payslip_viewer">
                            {toogleState === 1 ? (
                                <FormPayslip componentRef={componentRef} sabun={sabun} />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;