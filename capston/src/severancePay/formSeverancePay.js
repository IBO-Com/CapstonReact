import React, { useEffect, useState } from "react";
import "../css/severancePay/formSeverancePay.css";
import * as GetCDTR from "../modules/getCDTR";
import axios from "axios";
import qs from "qs";
import IBOstamp from "../img/stamp.png";

const App = ({ componentRef, sabun }) => {
    const todayTime = () => {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let toDayDate = now.getDate();

        return todayYear + "-" + todayMonth + "-" + toDayDate;
    }

    const [today, setToday] = useState(new Date());
    const [defaultYear, setDefaultYear] = useState("19");
    const [userData, setUserData] = useState();
    const [dept, setDept] = useState("");
    const [team, setTeam] = useState("");
    const [rank, setRank] = useState("");
    const [center, setCenter] = useState("");

    useEffect(() => {
        if (!sabun) return;
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
    }, [sabun])


    return (
        <div ref={componentRef} className="formSeverPay_box">
            <div className="perCardtitle">
                <p>퇴직금명세서</p>
            </div>
            <table className="formRetireTable">
                <tr className="formRetire_boldcolor">
                    <td colSpan={5}>퇴직자 정보</td>
                </tr>

                <tr className="formSeverance_Info">
                    <td>성명</td>
                    <td>{userData ? userData["name"] : ""}</td>
                    <td>입사년월일</td>
                    <td></td>
                </tr>

                <tr className="formSeverance_Info">
                    <td>부서명</td>
                    <td>{dept}</td>
                    <td>퇴사년월일</td>
                    <td></td>
                </tr>

                <tr className="formSeverance_Info">
                    <td>직책</td>
                    <td>{rank}</td>
                    <td>총 근무기간</td>
                    <td></td>
                </tr>


                <tr className="formRetire_bankInfo">
                    <td rowSpan={3}>수령계좌</td>
                    <td className="formRetire_noBack">은행명</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>

                <tr className="formRetire_bankInfo">
                    <td className="formRetire_noBack">예금주</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>

                <tr className="formRetire_bankInfo">
                    <td className="formRetire_noBack">계좌번호</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>


                <tr className="formRetire_boldcolor">
                    <td colSpan={5}>퇴직금 산출내역</td>
                </tr>

                <tr className="formRetire_money">
                    <td rowSpan={3}>최근 3개월 급여</td>
                    <td className="formRetire_noBack">월</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">월</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">월</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>


                <tr className="formRetire_RetireMoney">
                    <td rowSpan={3}>퇴직금액 내역</td>
                    <td className="formRetire_noBack">1일 평균임금</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">최근 3개월 근무일수</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">재직일수</td>
                    <td colSpan={2} className="formRetire_noBack"></td>
                </tr>


                <tr className="formRetire_boldcolor">
                    <td colSpan={5}>퇴직총액</td>
                </tr>

                <tr>
                    <td colSpan={5}>원</td>
                </tr>
            </table>

            <div className="formSeverPay_footer">
                <p>상기 금액을 퇴직금으로 정히 영수합니다.</p>
                <p>{todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 {todayTime().slice(8, 10)}일</p>
                <p className="mbt">IBO</p>
                <p>대표이사 담 당 자 &nbsp;&nbsp; (인)</p>
                <div className="formProofDiv">
                    <img className="formProof" src={IBOstamp} alt="직인" />
                </div>
            </div>
        </div>
    );
};

export default App;
