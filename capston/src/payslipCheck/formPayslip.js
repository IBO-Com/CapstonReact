import React, { useEffect, useState } from "react";
import "../css/payslipCheck/formPayslip.css";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";
import IBOstamp from "../img/stamp.png";
import * as GetFinalTax from "../modules/getFinalTax";

const App = ({ componentRef, sabun, retrieveDate }) => {

    const [taxPack, setTaxPack] = useState();

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
        
        GetFinalTax.getAllTaxToJsonFast(sabun, retrieveDate.replace("-", "") + "01", retrieveDate.replace("-", "") + "32", setTaxPack);

        axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((response) => {
            setUserData(response.data.ITEMS[0]);
            let userInfo = response.data.ITEMS[0];

            GetCDTR.getCDTR(userInfo["center"], userInfo["dept"], userInfo["team"], userInfo["rank"],
                setCenter, setDept, setTeam, setRank);
        });

    }, [sabun, retrieveDate]);
    
    useEffect(() => {
        console.log("Tax : ", taxPack);
    }, [taxPack]);

    return (
        <div className="payslip_box" ref={componentRef}>
            <div className="payslip_title">
                <p>{retrieveDate.split("-")[0] + "년 " + retrieveDate.split("-")[1] + "월"} 급여명세서</p>
            </div>
            <div className="payslip_data">
                <div className="formPayslip_empInfo">
                    <p>성명 : {userData ? userData["name"] : ""}</p>
                    <p>부서명 : {dept}</p>
                    <p>직책 : {rank}</p>
                    <p>지급일 : {retrieveDate.split("-")[0] + "년 " + retrieveDate.split("-")[1] + "월"} 5일</p>
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
                            <td>{taxPack ? taxPack[Object.keys(taxPack)[1]].defaultMoney.toLocaleString() : 0}원</td>
                            <td>국민연금</td>
                            <td>{taxPack ? taxPack[Object.keys(taxPack)[1]].nationalPension.toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>연장근무</td>
                            <td>{taxPack ? taxPack[Object.keys(taxPack)[1]].overMoney.toLocaleString() : 0}원</td>
                            <td>건강보험외</td>
                            <td>{taxPack ? (taxPack[Object.keys(taxPack)[1]].healthInsurance + taxPack[Object.keys(taxPack)[1]].longCare).toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>야간근무</td>
                            <td>{taxPack ? taxPack[Object.keys(taxPack)[1]].nightMoney.toLocaleString() : 0}원</td>
                            <td>고용보험</td>
                            <td>{taxPack ? taxPack[Object.keys(taxPack)[1]].employmentInsurance.toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>휴일근무</td>
                            <td>{taxPack ? taxPack[Object.keys(taxPack)[1]].restMoney.toLocaleString() : 0}원</td>
                            <td>근로소득세외</td>
                            <td>{taxPack ? (taxPack[Object.keys(taxPack)[1]].incomeTax + taxPack[Object.keys(taxPack)[1]].residentTax).toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td className="payslip_pay">총 지급액</td>
                            <td className="payslip_pay_sub">{taxPack ? taxPack[Object.keys(taxPack)[1]].totalMoney.toLocaleString() : 0}원</td>
                            <td className="payslip_deduct">총 공제액</td>
                            <td className="payslip_deduct_sub">{taxPack ? taxPack[Object.keys(taxPack)[1]].totalDeductible.toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_TotalPayTitle">
                            <td colSpan={4}>실수령액</td>
                        </tr>

                        <tr className="payslip_TotalPay">
                            <td colSpan={4}>{taxPack ? taxPack[Object.keys(taxPack)[1]].finalUserMoney.toLocaleString() : 0}원</td>
                        </tr>

                    </tbody>
                </table>

                <div className="payslip_form_footer">
                    <p>귀하의 노고에 감사드립니다.</p>
                    <p>{retrieveDate.split("-")[0] + "년 " + retrieveDate.split("-")[1] + "월"} 5일</p>
                    <p className="mbt">IBO</p>
                    <p>대표이사 담 당 자 &nbsp;&nbsp; (인)</p>
                    <div className="formProofDiv">
                        <img className="formProof" src={IBOstamp} alt="직인" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
