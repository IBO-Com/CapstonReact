import React, { useState } from "react";
import "../css/severancePay/modalseverancepay.css";
import { BsFillPatchCheckFill } from "react-icons/bs";

/**
 * 국민연금 4.5% 공제
 * 건강보험 3.495% 공제 ex) 87,370원
 * 장기요양보험료 12.27% ex) 87,370원에서 12.27% 10,720원
 * 고용보험 0.9% 공제
 * 근로소득세 https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6583&cntntsId=7862 참고
 */

const App = ({ setSeverancePay }) => {
    return (
        <div className="modalSeverancePay_wrap">
            <div className="modalSeverancePay_Box">
                <p className="modalSeverancePayTitle"> 공제액의 공제 정보를 확인하세요!</p>
                <div className="modalSeverancePay">
                    <p className="modalSeverancePay_national1">국민연금</p>
                    <p className="modalSeverancePay_national">과세 금액의 4.5%를 공제합니다.</p>
                    <br></br>
                    <p className="modalSeverancePay_health1">건강보험외 (건강보험 + 장기요양)</p>
                    <p className="modalSeverancePay_health">건강보험은 과세 금액의 3.495%를 공제하며,</p>
                    <p className="modalSeverancePay_health">장기요양은 건강보험 금액의 12.27%를 공제합니다.</p>
                    <br></br>
                    <p className="modalSeverancePay_emp1">고용보험</p>
                    <p className="modalSeverancePay_emp">과세 금액의 0.9%를 공제합니다.</p>
                    <br></br>
                    <p className="modalSeverancePay_conval1">근로소득세외 (근로소득세 + 주민세)</p>
                    <p className="modalSeverancePay_conval">근로소득세는 월급여를 기준으로 소득 구간에 따라 세율을 다르게 적용합니다.</p>
                    <p className="modalSeverancePay_conval">주민세는 근로소득세의 10%를 공제합니다.</p>
                    <table className="modalSeverancePay_table">
                        <thead>
                            <tr>
                                <th>소득 구간</th>
                                <th>세율</th>
                                <th>누진 공제액</th>
                            </tr>
                        </thead>
                        <tbody className="modalSeverancePay_tbody">
                            <tr>
                                <td className="modalSeverancePay_pay">1,200만원 이하</td>
                                <td className="modalSeverancePay_per">6%</td>
                                <td className="modalSeverancePay_tablededu">-</td>
                            </tr>
                            <tr>
                                <td className="modalSeverancePay_pay">1,200만원 ~ 4,600만원</td>
                                <td className="modalSeverancePay_per">15%</td>
                                <td className="modalSeverancePay_tablededu">108만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverancePay_pay">4,600만원 ~ 8,800만원</td>
                                <td className="modalSeverancePay_per">24%</td>
                                <td className="modalSeverancePay_tablededu">522만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverancePay_pay">8,800만원 ~ 1억 5천만원</td>
                                <td className="modalSeverancePay_per">35%</td>
                                <td className="modalSeverancePay_tablededu">1,490만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverancePay_pay">1억 5천만원 ~ 3억원</td>
                                <td className="modalSeverancePay_per">38%</td>
                                <td className="modalSeverancePay_tablededu">1,940만원</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <p className="modalSeverancePay_totalDe1">예상 총 공제액</p>
                    <p className="modalSeverancePay_totalDe">공제액 합계를 계산한 금액입니다.</p>
                </div>
                <div className="modalSeverancePay_btnBox">
                    <button
                        className="modalSeverancePay_ok"
                        onClick={() => setSeverancePay(false)}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;