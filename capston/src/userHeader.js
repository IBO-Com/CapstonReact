import React from 'react';

//이미지
import notice from "./img/notice.png";
import profile from "./img/profile.png";

//css
import "./css/userHeader.css";

const App = () => {
	return (
        <div>
            <div class="userHeader_wrap">
                <div class="userHeader_sub_wrap">
                    <p class="userHeader_sub_tile">김명지님 환영합니다!</p>
                    <div class="userHeader_sub_menu">
                    <ul>
                        <li class="userHeader_notice"><img src={notice} alt="알림"/>
                        </li>
                        <li class="userHeader_profile"><img src={profile} alt="회원정보수정"/>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
	);
};

export default App;