import React from 'react';
import "../css/login/findpw.css"
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <div className='findpwBox'>
                <div>
                    <span className='findpwTitle'>비밀번호 찾기</span>
                    <span className='findpwContent'>비밀번호는 이름, 사번, 이메일을 통해 찾을 수 있습니다.</span>
                </div>

                <div className='userFindpw'>
                    <form className="findpwInput">
                        <div className="findpwInputName">
                            <input type="text" name="findpwName" id="findpwName" autocomplete="off" placeholder="이름을 입력해주세요." />
                        </div>
                        <div className="findpwInputSabun">
                            <input type="text" name="findpwSabun" id="findpwSabun" autocomplete="off" placeholder="사번을 입력해주세요." />
                        </div>
                        <div className="findpwInputEmail">
                            <input type="text" name="findpwEmail" id="findpwEmail" autocomplete="off" placeholder="이메일을 입력해주세요." />
                        </div>

                        <Link to="/findpw">
                            <button className="findpwBtn" type="button">비밀번호 찾기</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>

        //<Empinfo />
    );
};

export default App;