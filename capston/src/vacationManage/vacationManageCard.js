import React from "react";

const App = () => {
    return (
        <div className="vactionManage_card">
            <div className="vactionManage_card_text">
                <span className="vactionManage_card_title">휴가 생성 - 김길동</span> 
                <span>2020-09-16 (수) 9:00AM - 11:00AM</span> 
                <span>연차</span>
            </div>
            <div className="vactionManage_card_flex">
                <div className="vactionManage_card_state">
                    대기중
                </div>

                <p className="vactionManage_card_text2">
                    To. 박관리
                </p>
            </div>
        </div>
    )
}

export default App;