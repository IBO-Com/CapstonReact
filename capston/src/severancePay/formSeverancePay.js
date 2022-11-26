import React, { useEffect, useState } from "react";
import "../css/severancePay/formSeverancePay.css";
import * as GetCDTR from "../modules/getCDTR";
import axios from "axios";
import qs from "qs";
import IBOstamp from "../img/stamp.png";
import bankCode from "../bankCode";
import * as GetYearOfWork from "../modules/getYearOfWork";
import BankCode from "../bankCode.json";

const App = ({retirePayment, componentRef, sabun }) => {
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
    const [getBank, setGetBank] = useState();

    const [workYear, setWorkYear] = useState("0");
    const [workMonth, setWorkMonth] = useState("0");
    const [workDay, setWorkDay] = useState("0");

    useEffect(() => {
        if (!sabun) return;
        let postParam = qs.stringify({
            sabunOrName: sabun
        });

        axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((response) => {
            setUserData(response.data.ITEMS[0]);
            let userInfo = response.data.ITEMS[0];
            let startDate = new Date(userInfo["start_date"].slice(0, 4), parseInt(userInfo["start_date"].slice(4, 6))-1, userInfo["start_date"].slice(6, 8));
            let endDate = new Date(userInfo["retire_date"].slice(0, 4), parseInt(userInfo["retire_date"].slice(4, 6))-1, userInfo["retire_date"].slice(6, 8));
            
            if (
                today.getFullYear() - 2000 <
                parseInt(userInfo["identity"].slice(0, 2))
            ) {
                setDefaultYear("19");
            } else {
                setDefaultYear("20");
            }
            GetYearOfWork.getYearOfWork(startDate, endDate, setWorkYear, setWorkMonth, setWorkDay);

            GetCDTR.getCDTR(userInfo["center"], userInfo["dept"], userInfo["team"], userInfo["rank"],
                setCenter, setDept, setTeam, setRank);
        });

        axios.post("http://43.200.115.198:8080/getBank.jsp", qs.stringify({
            sabun: sabun
        })).then((res) => {
            let data = res.data.ITEMS[0];
            setGetBank(data);
        }).catch((Error) => {
            console.log(Errorr);
        })
    }, [sabun])


    return (
        <div ref={componentRef} className="formSeverPay_box">
            <div className="formSeverancePaytitle">
                <p>퇴직금명세서</p>
            </div>
            <table className="formRetireTable">
                <tr className="formSeverance_boldcolor">
                    <td colSpan={5}>퇴직자 정보</td>
                </tr>

                <tr className="formSeverance_Info">
                    <td>성명</td>
                    <td>{userData ? userData["name"] : ""}</td>
                    <td>입사년월일</td>
                    <td>{userData ? userData["start_date"].slice(0, 4) : ""}년 {userData ? userData["start_date"].slice(4, 6) : ""}월 {userData ? userData["start_date"].slice(6, 8) : ""}일</td>
                </tr>

                <tr className="formSeverance_Info">
                    <td>부서명</td>
                    <td>{userData ? userData["deptKR"] : ""}</td>
                    <td>퇴사년월일</td>
                    <td>{userData ? userData["retire_date"].slice(0,4) + "년 " + userData["retire_date"].slice(4,6) + "월 " + userData["retire_date"].slice(6,8) + "일": ""}</td>
                </tr>

                <tr className="formSeverance_Info">
                    <td>직책</td>
                    <td>{userData ? userData["rankKR"] : ""}</td>
                    <td>근속년수</td>
                    <td>{workYear}년 {workMonth}개월 {workDay}일</td>
                </tr>


                <tr className="formRetire_bankInfo">
                    <td rowSpan={3}>수령계좌</td>
                    <td className="formRetire_noBack">은행명</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                        getBank ? (
                            BankCode[getBank.bank.padStart(3, '0')]
                        ) : (
                            ""
                        )
                    }
                    </td>
                </tr>

                <tr className="formRetire_bankInfo">
                    <td className="formRetire_noBack">예금주</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                        getBank ? (
                            getBank.bank_nam
                        ) : (
                            ""
                        )
                    }
                    </td>
                </tr>

                <tr className="formRetire_bankInfo">
                    <td className="formRetire_noBack">계좌번호</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                        getBank ? (
                            getBank.ac_number
                        ) : (
                            ""
                        )
                    }
                    </td>
                </tr>


                <tr className="formSeverance_boldcolor">
                    <td colSpan={5}>퇴직금 산출내역</td>
                </tr>

                <tr className="formRetire_money">
                    <td rowSpan={4}>최근 3개월 급여</td>
                    <td className="formRetire_noBack" >
                       1개월 전
                    </td>
                    <td colSpan={2} className="formRetire_noBack">
                        {
                            retirePayment ? (
                                parseInt(retirePayment.before0Pay).toLocaleString() + "원"
                            ) : (
                                ""
                            )
                        }
                    </td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">2개월 전</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                            retirePayment ? (
                                parseInt(retirePayment.before1Pay).toLocaleString() + "원"
                            ) : (
                                ""
                            )
                        }
                    </td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">3개월 전</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                            retirePayment ? (
                                parseInt(retirePayment.before2Pay).toLocaleString() + "원"
                            ) : (
                                ""
                            )
                        }
                    </td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">기타</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                            retirePayment ? (
                                parseInt(retirePayment.etcPay).toLocaleString() + "원"
                            ) : (
                                ""
                            )
                        }
                    </td>
                </tr>


                <tr className="formRetire_RetireMoney">
                    <td rowSpan={3}>퇴직금액 내역</td>
                    <td className="formRetire_noBack">퇴직수당</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                        retirePayment ? (
                            parseInt(retirePayment.retireAllow).toLocaleString() + "원"
                        ) : (
                            ""
                        )
                    }
                    </td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">퇴직총액</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                        retirePayment ? (
                            parseInt(retirePayment.retirePay).toLocaleString() + "원"
                        ) : (
                            ""
                        )
                    }
                    </td>
                </tr>

                <tr className="formRetire_money">
                    <td className="formRetire_noBack">퇴직소득세</td>
                    <td colSpan={2} className="formRetire_noBack">
                    {
                        retirePayment ? (
                            parseInt(retirePayment.retireTax).toLocaleString() + "원"
                        ) : (
                            ""
                        )
                    }
                    </td>
                </tr>

                <tr className="formSeverance_boldcolor">
                    <td colSpan={5}>퇴직 총 공제액</td>
                </tr>

                <tr>
                    <td colSpan={5}>
                    {
                        retirePayment ? (
                            parseInt(retirePayment.retireTax).toLocaleString() + "원"
                        ) : (
                            ""
                        )
                    }
                    </td>
                </tr>

                <tr className="formSeverance_boldcolor">
                    <td colSpan={5}>퇴직 실수령액</td>
                </tr>

                <tr>
                    <td colSpan={5}>
                    {
                        retirePayment ? (
                            (parseInt(retirePayment.retirePay) + parseInt(retirePayment.retireAllow) - parseInt(retirePayment.retireTax)).toLocaleString() + "원"
                        ) : (
                            ""
                        )
                    }
                    </td>
                </tr>
            </table>

            <div className="formSeverPay_footer">
                <p>상기 금액을 퇴직금으로 정히 영수합니다.</p>
                <p>{todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 {todayTime().slice(8, 10)}일</p>
                <p className="mbt">IBO</p>
                <p>대표이사 김  유  경 &nbsp;&nbsp; (인)</p>
                <div className="formSeverDiv">
                    <img className="formSever" src={IBOstamp} alt="직인" />
                </div>
            </div>
        </div>
    );
};

export default App;
