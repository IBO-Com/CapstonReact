import React, { useEffect, useState } from "react";
import "../css/payslipCheck/formPayslip.css";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";

const App = ({ componentRef, sabun }) => {
    const [today, setToday] = useState(new Date());
    const [defaultYear, setDefaultYear] = useState("19");

    const [userData, setUserData] = useState();
    const [dept, setDept] = useState("");
    const [team, setTeam] = useState("");
    const [rank, setRank] = useState("");
    const [center, setCenter] = useState("");

    const todayTime = () => {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let toDayDate = now.getDate();

        return todayYear + "-" + todayMonth + "-" + toDayDate;
    }

    useEffect(() => {
        if (sabun == null) return;
        console.log(sabun);

        let postParam = qs.stringify({
            sabunOrName: sabun
        });

        axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((response) => {
            setUserData(response.data.ITEMS[0]);
            let userInfo = response.data.ITEMS[0];

            if (
                today.getFullYear() - 2000 <
                parseInt(userInfo["identity"].slice(0, 2))
            ) {
                setDefaultYear("19");
            } else {
                setDefaultYear("20");
            }

            GetCDTR.getCDTR(userInfo["center"], userInfo["dept"], userInfo["team"], userInfo["rank"],
                setCenter, setDept, setTeam, setRank);
        });

    }, [sabun]);

    return (
        <div className="payslip_box" ref={componentRef}>
            <div className="payslip_title">
                <p>{todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 급여명세서</p>
            </div>
            <div className="payslip_data">
                <div className="formPayslip_empInfo">
                    <p>성명 : {userData ? userData["name"] : ""}</p>
                    <p>부서명 : {dept}</p>
                    <p>직책 : {rank}</p>
                    <p>지급일 : {todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 5일</p>
                </div>

                <table className="formPayslipTable">
                    <thead>
                        <tr className="payslip_tableTitle">
                            <td colSpan={2} className='payslip_head1'>지급액</td>
                            <td colSpan={2} className='payslip_head2'>공제액</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="payslip_money">
                            <td>기본급</td>
                            <td>원</td>
                            <td>국민연금</td>
                            <td>원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>연장근무</td>
                            <td>원</td>
                            <td>건강보험외</td>
                            <td>원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>야간근무</td>
                            <td>원</td>
                            <td>고용보험</td>
                            <td>원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>휴일근무</td>
                            <td>원</td>
                            <td>근로소득세외</td>
                            <td>원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td className="payslip_pay">총 지급액</td>
                            <td>원</td>
                            <td className="payslip_deduct">총 공제액</td>
                            <td>원</td>
                        </tr>

                        <tr className="payslip_TotalPayTitle">
                            <td colSpan={4}>실수령액</td>
                        </tr>

                        <tr className="payslip_TotalPay">
                            <td colSpan={4}>원</td>
                        </tr>

                    </tbody>
                </table>

                <div className="payslip_form_footer">
                    <p>귀하의 노고에 감사드립니다.</p>
                    <p>{todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 5일</p>
                    <p className="mbt">IBO</p>
                    <p>대표이사 담 당 자 (인)</p>
                </div>
            </div>
        </div>
    );
};

export default App;
