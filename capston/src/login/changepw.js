import React from 'react';
import "../css/login/change.css"
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <div className='findpwBox'>
                <div>
                    <span className='findpwTitle'>비밀번호 변경</span>
                    <span className='findpwContent'>안전한 사용을 위해, 기존의 비밀번호를 변경합니다.<br></br>새로운 비밀번호를 입력해주세요.</span>
                </div>

                <div className='userFindpw'>
                    <form className="findpwInput">
                        <div className="findpwInputName">
                            <input type="text" name="findpwName" id="findpwName" autocomplete="off" placeholder="현재 비밀번호" />
                        </div>
                        <div className="findpwInputSabun">
                            <input type="text" name="findpwSabun" id="findpwSabun" autocomplete="off" placeholder="새 비밀번호" />
                        </div>
                        <div className="findpwInputEmail">
                            <input type="text" name="findpwEmail" id="findpwEmail" autocomplete="off" placeholder="비밀번호 확인" />
                        </div>

                        <Link to="../login">
                            <button className="findpwBtn" type="button">등록</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>

        //<Empinfo />
    );
};

export default App;