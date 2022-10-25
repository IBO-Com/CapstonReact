import React, { useState } from "react";

const App = ({monthlyPayDebuct, setMonthlyPayDebuct}) => {
    return (
        <div className="modalMonthlySalary_wrap">
            <p>공제액 도움말</p>

            <div className="modalMonthlySalary_BtnBox">
                <button
                    className="modalMonthlySalary_cancel"
                    onClick={() => setMonthlyPayDebuct(false)}>
                    취소
                </button>
                <button className="modalMonthlySalary_ok">등록</button>
            </div>
        </div>
    );
};

export default App;