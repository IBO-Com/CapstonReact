import React, { useEffect, useState } from 'react';
import security_icon from "./img/security.png";
import "./css/login/login.css";
import MainNav from "./mainNav";


const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const Submit = (e) => {
    e.preventDefault();
    //로그인이 되었다면 true 
    setIsLogin(true);
  }

	return (
    isLogin == false ? (  //로그인이 안되었다면
      <div className='LoginApp'>
        <div class="left_ibo">
          <img class="logo" src={security_icon} alt="IBO"/>
          <h2 class="com_name">IBO</h2>
          <p class="left">
            Welcome to IBO! <br/> Enter your account
          </p>
        </div>

        <div class="userlogin">
          <form class="input" onSubmit={Submit}>
            <div class="inputid">
              <input type="text" name="userid" id="userid" autocomplete="off"
                placeholder="아이디를 입력해주세요."/>
            </div>
            <div class="inputpw">
              <input type="password" name="userpw" id="userpw" autocomplete="off"
                placeholder="비밀번호를 입력해주세요."/>
            </div>
            <div>
              <span class="rememid"><input type="checkbox"/> 아이디 저장</span>
            </div>
            <br/>
            <div>
              <input type="submit" id="loginbtn" name="loginbtn" value="LOGIN" />
            </div>
            <br/>
            <div class="findbtn">
              <a class="findpw" href="">비밀번호를 잊어버리셨나요?</a>
            </div>
          </form>
        </div>
		  </div>
    ) : ( //로그인이 되었다면
      <MainNav/>
    )
		
	);
};

export default App;