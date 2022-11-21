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
                <p className="modalSeverancePayTitle">퇴직금의 공제 정보를 확인하세요!</p>
                <div className="modalSeverancePay">
                    <p className="modalSeverancePay_national1">퇴직소득금액 소득공제</p>
                    <table className="modalSeverancePay_table">
                        <thead>
                            <tr>
                                <th>근속연수</th>
                                <th>퇴직소득공제</th>
                            </tr>
                        </thead>
                        <tbody className="modalSeverRetire_tbody">
                            <tr>
                                <td className="modalSeverRetire_tbody_year">5년 이하</td>
                                <td className="modalSeverRetire_tbody_text">근속연수 * 30만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_year">10년 이하</td>
                                <td className="modalSeverRetire_tbody_text">150만원 + (근속연수 - 5) * 50만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_year">20년 이하</td>
                                <td className="modalSeverRetire_tbody_text">400만원 + (근속연수 - 10) * 80만원</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br><br></br>


                    <p className="modalSeverancePay_health1">환산급여 공제액</p>
                    <p className="modalPayslip_health">(퇴직소득금액 - 퇴직소득공제) * 12 / 근속연수</p>
                    <table className="modalSeverancePay_table">
                        <thead>
                            <tr>
                                <th>환산급여</th>
                                <th>환산급여공제</th>
                            </tr>
                        </thead>
                        <tbody className="modalSeverRetire_tbody">
                            <tr>
                                <td className="modalSeverRetire_tbody_year">800만원 이하</td>
                                <td className="modalSeverRetire_tbody_text">전액 공제</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_year">7,000만원 이하</td>
                                <td className="modalSeverRetire_tbody_text">800만원 + (환산급여 - 800만원) * 60%</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_year">10,000만원 이하</td>
                                <td className="modalSeverRetire_tbody_text">4,520만원 + (환산급여 - 7,000만원) * 55%</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br><br></br>


                    <p className="modalSeverancePay_conval1">과세표준 기본세율</p>
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
                                <td className="modalSeverRetire_tbody_money">1,200만원 이하</td>
                                <td className="modalSeverRetire_tbody_per">6%</td>
                                <td className="modalSeverRetire_tbody_dedu">-</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_money">4,600만원 이하</td>
                                <td className="modalSeverRetire_tbody_per">15%</td>
                                <td className="modalSeverRetire_tbody_dedu">108만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_money">8,800만원 이하</td>
                                <td className="modalSeverRetire_tbody_per">24%</td>
                                <td className="modalSeverRetire_tbody_dedu">522만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_money">1억 5천만원 이하</td>
                                <td className="modalSeverRetire_tbody_per">35%</td>
                                <td className="modalSeverRetire_tbody_dedu">1,490만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_money">3억원 이하</td>
                                <td className="modalSeverRetire_tbody_per">38%</td>
                                <td className="modalSeverRetire_tbody_dedu">1,940만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_money">5억원 이하</td>
                                <td className="modalSeverRetire_tbody_per">40%</td>
                                <td className="modalSeverRetire_tbody_dedu">2,540만원</td>
                            </tr>
                            <tr>
                                <td className="modalSeverRetire_tbody_money">5억원 초과</td>
                                <td className="modalSeverRetire_tbody_per">42%</td>
                                <td className="modalSeverRetire_tbody_dedu">3,540만원</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br><br></br>


                    <p className="modalSeverancePay_totalDe1">총 공제액</p>
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