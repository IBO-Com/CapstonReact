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
import ModalPayslip from "./modalPayslip";


class koLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "yyyy년　　 MM월", { locale: this.locale });
    }
}


const App = () => {
    const [monthlyPayDebuct, setMonthlyPayDebuct] = useState(false);
    const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));

    const [selectDepart, setSelectDepart] = useState("*");
    const [textName, setTextName] = useState("");
    const [peopleData, setPeopleData] = useState();
    const [sabun, setSabun] = useState();
    const componentRef = useRef(null);
    const [codeData, setCodeData] = useState();


    const [payslip, setPayslip] = useState(false);
    console.log(payslip);

    const [toogleState, setToggleState] = useState(1);
    let Index = 1;

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const handleStartDateChange = (date) => {
        setRetrieveDate(getFormatDate(date));
    };

    function getFormatDate(date) {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        return year + "-" + month;
    }

    useEffect(() => {

        axios.post("http://43.200.115.198:8080/getAllCodeNm.jsp", qs.stringify({
            code_cls: "002"
        })).then((res) => {
            setCodeData(res.data.ITEMS);
        }).catch((Error) => {

        })

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
        console.log(e.target.value);
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
                            value={retrieveDate}
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
                            {
                                codeData ? (
                                    Object.keys(codeData).map((item, index) => (
                                        <MenuItem sx={{ minWidth: "153px", height: 30 }} value={item}>
                                            {codeData[item]}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <></>
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <input
                            style={{
                                lineHeight: "33px",
                                width: "170px",
                                height: "33px"
                            }}
                            placeholder="사번 / 성명"
                            type="text"
                            className="HRorganization_input"
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
                                                    {name.retire_cls == "0" ? (
                                                        <>
                                                            <tr>
                                                                <td>{Index++}</td>
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
                                                                <td>{name.deptKR}</td>
                                                            </tr>
                                                        </>
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

                    <div className="payslip_empCard">
                        <div className="payslip_Btnbox">
                            <ReactToPrint
                                trigger={() => <button className="print_Btn">인쇄</button>}
                                content={() => componentRef.current}
                            />
                            <button
                                className="payslip"
                                onClick={() => {
                                    setPayslip(true);
                                }}>
                                공제액 도움말
                            </button>
                            {payslip == true ? (
                                <ModalPayslip setPayslip={setPayslip} />
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="payslip_viewer">
                            {toogleState === 1 ? (
                                <FormPayslip componentRef={componentRef} sabun={sabun} retrieveDate={retrieveDate} />
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