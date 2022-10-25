import React, { useState } from "react";
import "../css/monthlySalary/modalMonthlysalary.css";

/**
 * 국민연금 4.5% 공제
 * 건강보험 3.495% 공제 ex) 87,370원
 * 장기요양보험료 12.27% ex) 87,370원에서 12.27% 10,720원
 * 고용보험 0.9% 공제
 * 근로소득세는? 잠시만
 */

const App = ({ setMonthlyPayDebuct }) => {
    return (
        <div className="modalMonthlySalary_wrap">
            <div className="modalMonthlySalary_Box">
                <p className="modalMonthlyTitle">공제액의 공제 정보를 확인하세요!</p>
                <div className="modalMonthly">
                    <p className="modalMonthly_national1">국민연금</p>
                    <p className="modalMonthly_national">과세 금액의 4.5%를 공제합니다.</p>
                    <br></br>
                    <p className="modalMonthly_health1">건강보험</p>
                    <p className="modalMonthly_health">과세 금액의 3.4%를 공제합니다.</p>
                    <br></br>
                    <p className="modalMonthly_conval1">장기요양</p>
                    <p className="modalMonthly_conval">건강보험 금액의 12.27%를 공제합니다.</p>
                    <br></br>
                    <p className="modalMonthly_emp1">고용보험</p>
                    <p className="modalMonthly_emp">과세 금액의 0.9%를 공제합니다.</p>
                    <br></br>
                    <p className="modalMonthly_totalDe1">예상 총 공제액</p>
                    <p className="modalMonthly_totalDe">공제액 합계를 계산한 금액입니다.</p>
                </div>
                <div className="modalMonthly_btnBox">
                    <button
                        className="modalMonthlySalary_cancel"
                        onClick={() => setMonthlyPayDebuct(false)}>
                        취소
                    </button>
                    <button className="modalMonthlySalary_ok">등록</button>
                </div>
            </div>
        </div>
    );
};

export default App;