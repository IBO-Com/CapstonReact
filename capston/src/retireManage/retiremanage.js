import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import qs from "qs";
import "../css/retireManage/retiremanage.css";
import FormControl from "@mui/material/FormControl";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import * as GetYearOfWork from "../modules/getYearOfWork";
import { useCookies } from "react-cookie";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";


class koLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "yyyy년　　 MM월", { locale: this.locale });
    }
}

function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    return year + "-" + month;
}

const dateFormatString = (date) => {
    // 20201010

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + month + day;
};

const App = () => {

    const todayTime = () => {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let toDayDate = now.getDate();

        return todayYear + "년 " + todayMonth + "월 " + toDayDate + "일 ";
    }
    const [cookies, setCookie, removeCookie] = useCookies();
    const [textName, setTextName] = useState('');
    const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectDepart, setSelectDepart] = useState("*");
    const [peopleData, setPeopleData] = useState();

    const [workYear, setWorkYear] = useState("0");
    const [workMonth, setWorkMonth] = useState("0");
    const [workDay, setWorkDay] = useState("0");


    const handleTextReason = (e) => {
        setTextReason(e.target.value);
    };


    //console.log(monthlyPayDebuct);

    const textNameHandle = (e) => {
        setTextName(e.target.value);
    }

    const handleDateChange = (date) => {
        setRetrieveDate(getFormatDate(date));
    };

    // 부서 검색
    const handleSelectDepart = (event) => {
        setSelectDepart(event.target.value);
    };

    // 사번/성명 인풋
    const handleTextName = (e) => {
        setTextName(e.target.value);
    };

    useEffect(() => {
        let loginInfo = cookies["loginInfo"];
        let date = new Date();
        let postParam = {
            sabunOrName: loginInfo.id
        }
        postParam = qs.stringify(postParam);
        axios
            .post("http://43.200.115.198:8080/empselect.jsp", postParam)
            .then((res) => {
                let data = res.data.ITEMS[0];
                setPeopleData(data);
                date = new Date(data["start_date"].slice(0, 4),  parseInt(data["start_date"].slice(4, 6)) -1, data["start_date"].slice(6, 8)); 
                GetYearOfWork.getYearOfWork(date, endDate, setWorkYear, setWorkMonth, setWorkDay);
            })
            .catch((Error) => {
                console.log(Error);
            });
    }, []);


    return (
        <div className="monthlyPay_background">
            <div className="retire">
                <div className="monthlyPay_ment">
                    <span>오늘은 {todayTime()} 입니다!</span>
                    <button className="monthlyPay_Btn">(주) IBO</button>
                </div>
                <div className="monthlyPay_total">
                    <p>소속</p> {/* 부서 + 팀 붙여서 */}
                    <span className="totalPay">{peopleData ? peopleData["deptKR"] + " " + peopleData["teamKR"] : "Not Found Data"}</span>
                </div>
                <div className="monthlyPay_amount">
                    <p>재직기간</p> {/* 입사일부터 오늘 날까지 계산 */}
                    <span className="amountPay">{workYear}년 {workMonth}개월 {workDay}일</span> 
                </div>
            </div>

            <div className="monthlyWork_title">
                <p>퇴직 신청</p>
            </div>
            <div className="retire_viewer">
                <div className="retire_date">
                    <p>퇴직일을 선택해주세요.</p>
                    <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
                        <DatePicker
                            style={{ marginLeft: "18px" }}
                            autoOk
                            variant="inline"
                            views={["date"]}
                            format="yyyy-MM-dd"
                            value={startDate}
                            inputVariant="outlined"
                            size="small"
                            onChange={(date) => { setStartDate(date) }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="retire_reason">
                    <p>퇴직 사유</p>
                    <textarea
                        placeholder="퇴직 사유를 적어주세요."
                        className="retire_reason_text"
                        name="reason"
                        rows={3}
                        cols={60}
                        onChange={handleTextReason}
                    ></textarea>
                </div>
            </div>

            <div className="retire_notice">
                <p>퇴직 신청을 누르기 전에 꼭 읽어주세요!</p>
            </div>
            <div className="retire_notice_text">
                <p>! IBO는 퇴사자의 건강과 발전을 기원합니다.</p>
                <p>! 퇴직 신청을 한 후에는 취소하거나 되돌릴 수 없습니다.</p>
                <p>! 퇴직 후 회사의 영업방식을 제 3자에게 공개하거나 누설하지 않습니다.</p>
            </div>{/*왔어욥  */}

            <button className="retire_btn">신청하기</button>
        </div>
    );
};

export default App;