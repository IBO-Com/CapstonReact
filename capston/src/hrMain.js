import React from 'react';

import "./css/hrMain.css";

const App = () => {
	return (
        <div className='hrMain'>
           <div className="container">
                <div className="user_container">
                    <h4>사용자 정보</h4>
                    <div className="userInfo">
                        <div className="userImg">
                            <img src="img/profile.png" alt="userImg"/>
                        </div>
                        <div className="userDetail">
                            <li className="userName">김명지</li>
                            <li>2022771010</li>
                            <li>경영관리본부</li>
                            <li>경영기획부</li>
                            <li>총무인사팀</li>
                        </div>
                    </div>
                </div>
                <div className="work_container">
                    <h4>근무 정보</h4>
                    <div className="workInfo">
                        <ul>
                            <li className='today'>2022.09.29 목</li>
                            <li>출근	2022-07-29	08:49</li>
                            <li>연차 <progress value="20" max="100"></progress></li>
                            <p> 잔여 연차 12개 / 총 연차 5개 <br/> 2022년 17개 갱신 </p>
                        </ul>
                    </div>
                    <div className="history">
                        <h4>신청내역</h4>
                        <button className="history_btn">
                            <img className="button_img" src="img/basic.png" alt="detail"/>
                        </button>
                    </div>
                    <div className="historyList">
                        <table>
                            <th>신청종류</th>
                            <th>신청일자</th>
                            <th>처리</th>
                            <th>접수일자</th>
                            <tr>
                                <td>연차휴가</td>
                                <td>2022.07.28</td>
                                <td>완료</td>
                                <td>2022.07.28</td>
                            </tr>
                            <tr>
                                <td>연차휴가</td>
                                <td>2022.07.15</td>
                                <td>완료</td>
                                <td>2022.07.15</td>
                            </tr>
                            <tr>
                                <td>연차휴가</td>
                                <td>2022.05.15</td>
                                <td>완료</td>
                                <td>2022.05.15</td>
                            </tr>
                            <tr>
                                <td>출장</td>
                                <td>2022.03.15</td>
                                <td>완료</td>
                                <td>2022.03.15</td>
                            </tr>
                            <tr>
                                <td>연차휴가</td>
                                <td>2022.02.15</td>
                                <td>완료</td>
                                <td>2022.02.15</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            
            <div className="notice_container">
                    <h4>공지사항</h4>
                    <div className="notice"></div>
                </div>
        </div>
	);
};

export default App;