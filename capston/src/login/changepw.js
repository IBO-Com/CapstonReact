import React from 'react';
import "../css/login/changepw.css"
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <div className='changepwBox'>
                <div>
                    <span className='changepwTitle'>비밀번호 변경</span>
                    <span className='changepwContent'>안전한 사용을 위해, 기존의 비밀번호를 변경합니다.<br></br>새로운 비밀번호를 입력해주세요.</span>
                </div>

                <div className='userchangepw'>
                    <form className="changepwInput">
                        <div className="changepwInputName">
                            <input type="text" name="changepwName" id="changepwName" autocomplete="off" placeholder="현재 비밀번호" />
                        </div>
                        <div className="changepwInputSabun">
                            <input type="text" name="changepwSabun" id="changepwSabun" autocomplete="off" placeholder="새 비밀번호" />
                        </div>
                        <div className="changepwInputEmail">
                            <input type="text" name="changepwEmail" id="changepwEmail" autocomplete="off" placeholder="비밀번호 확인" />
                        </div>

                        <div className='changpw_box'>
                            <Link to="/mainNav">
                                <button className="changepwBack" type="button">이전으로</button>
                            </Link>
                            <Link to="/login">
                                <button className="changepwBtn" type="button">변경</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;