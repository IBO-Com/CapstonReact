import React, { useEffect, useState } from "react";
import "../css/payslipCheck/formPayslip.css";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";
import IBOstamp from "../img/stamp.png";
import * as GetFinalTax from "../modules/getFinalTax";

const App = ({ componentRef, sabun, retrieveDate }) => {

    const [taxPack, setTaxPack] = useState();
    const [today, setToday] = useState(new Date());
    const [userData, setUserData] = useState();
    const [payDate, setPayDate] = useState(new Date());

    function getFormatDate(date) {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        return year + "-" + month;
    }

    const todayTime = () => {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let toDayDate = now.getDate();

        return todayYear + "-" + todayMonth + "-" + toDayDate;
    }
    useEffect(() => {
        let getDate = new Date(retrieveDate.split("-")[0], parseInt(retrieveDate.split("-")[1]) - 1, "05"); 
        console.log(getDate);
        getDate.setMonth(getDate.getMonth() + 1);
        setPayDate(getDate);
    }, [retrieveDate])

    useEffect(() => {

        if (sabun == null) return;
        console.log(sabun);

        let postParam = qs.stringify({
            sabunOrName: sabun
        });
        
        axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((res) => {
            let data = res.data.ITEMS[0];
            setUserData(data);
        }).catch((Error)=> {
            console.log(Error);
        })

        postParam = qs.stringify({
            sabun: sabun,
            year: retrieveDate.slice(0, 4),
            month: retrieveDate.slice(5, 7)
        })
        axios.post("http://43.200.115.198:8080/getPayment.jsp", postParam).then((res) => {
            let data = res.data.ITEMS[0];    
            setTaxPack(data);
            console.log(data);
        }).catch((Error) => {
            console.log(Error);
        })


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
                    <p>부서명 : {userData ? userData["deptKR"] : ""}</p>
                    <p>직책 : {userData ? userData["rankKR"] : ""}</p>
                    <p>지급일 : {payDate.getFullYear() + "년 " + parseInt(payDate.getMonth() + 1) + "월"} 5일</p>
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
                            <td>{taxPack ? parseInt(taxPack["pay_normal"]).toLocaleString() : 0}원</td>
                            <td>국민연금</td>
                            <td>{taxPack ? parseInt(taxPack["tax_annu"]).toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>연장근무</td>
                            <td>{taxPack ? parseInt(taxPack["pay_over"]).toLocaleString() : 0}원</td>
                            <td>건강보험외</td>
                            <td>{taxPack ? (parseInt(taxPack["tax_health"]) + parseInt(taxPack["tax_insure"])).toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>야간근무</td>
                            <td>{taxPack ? parseInt(taxPack["pay_night"]).toLocaleString() : 0}원</td>
                            <td>고용보험</td>
                            <td>{taxPack ? parseInt(taxPack["tax_hire"]).toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td>휴일근무</td>
                            <td>{taxPack ? parseInt(taxPack["pay_off"]).toLocaleString() : 0}원</td>
                            <td>근로소득세외</td>
                            <td>{taxPack ? (parseInt(taxPack["tax_soduk"]) + parseInt(taxPack["tax_resi"])).toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_money">
                            <td className="payslip_pay">총 지급액</td>
                            <td className="payslip_pay_sub">{taxPack ? parseInt(taxPack["totalPay"]).toLocaleString() : 0}원</td>
                            <td className="payslip_deduct">총 공제액</td>
                            <td className="payslip_deduct_sub">{taxPack ? parseInt(taxPack["totalDud"]).toLocaleString() : 0}원</td>
                        </tr>

                        <tr className="payslip_TotalPayTitle">
                            <td colSpan={4}>실수령액</td>
                        </tr>

                        <tr className="payslip_TotalPay">
                            <td colSpan={4}>{taxPack ? (parseInt(taxPack["totalPay"]) - parseInt(taxPack["totalDud"])).toLocaleString() : 0}원</td>
                        </tr>

                    </tbody>
                </table>

                <div className="payslip_form_footer">
                    <p>귀하의 노고에 감사드립니다.</p>
                    <p>{today.getFullYear() + "년 " + (today.getMonth() + 1) + "월 " + today.getDate() + "일"} </p>
                    <p className="mbt">IBO</p>
                    <p>대표이사 김  유  경 &nbsp;&nbsp; (인)</p>
                    <div className="formProofDiv">
                        <img className="formProof" src={IBOstamp} alt="직인" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
