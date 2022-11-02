import axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from 'react';
import security_icon from "./img/iboLogoImg.png";
import "./css/login/login.css";
import { Link, useNavigate  } from 'react-router-dom';
import * as Cookie from "./cookies/cookies";


const App = ({isLogin, setIsLogin}) => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState(); 
  const [inputId, setInputId] = useState("1012210000");
  const [inputPw, setInputPw] = useState("1234");

  
  useEffect(() => {
    if(!loginInfo) {  //처음 로딩할때
      return;
    }

    if(Object.keys(loginInfo).length == 0) { //아이디, 비밀번호가 틀렸을 때
      alert("아이디 또는 비밀번호를 다시 확인해주세요.");
      return; //초기값 설정 시, 로그인 안됐을 때
    }
    Cookie.setCookie("loginInfo", JSON.stringify(loginInfo[0]));
    Cookie.setCookie("employeeInfo", JSON.stringify(loginInfo[0]));
    setIsLogin(true);
    //로그인 성공시 
    console.log("Login Success : ", Cookie.getCookie("loginInfo"));
    navigate('/mainNav');
  }, [loginInfo])

  const Submit = (e) => {
    e.preventDefault();
    //로그인이 되었다면 true 

    let postParam = qs.stringify({
      id: inputId,
      password: inputPw
    });

    axios.post("http://43.200.115.198:8080/loginCheck.jsp", postParam)
    .then((res) => {
      setLoginInfo(res.data.ITEMS);
    })
    .catch((Error) => {
      console.log(Error);
    });
  }

	return (
      <div className='LoginApp'>
        <div className="left_ibo">
          <img className="logo" src={security_icon} alt="IBO"/>
          <h2 className="com_name">IBO</h2>
          <p className="left">
            Welcome to IBO! <br/> Enter your account
          </p>
        </div>

        <div className="userlogin">
          <form className="input" >
            <div className="inputid">
              <input type="text" name="userid" id="userid" autocomplete="off" Value={inputId} onChange={(e) => {setInputId(e.target.value)}}
                placeholder="아이디를 입력해주세요."/>
            </div>
            <div className="inputpw">
              <input type="password" name="userpw" id="userpw" autocomplete="off"  Value={inputPw} onChange={(e) => {setInputPw(e.target.value)}}
                placeholder="비밀번호를 입력해주세요."/>
            </div>
            <div>
              <span className="rememid"><input type="checkbox"/> 아이디 저장</span>
            </div>
            <br/>
            <div>
                <input id="loginbtn" name="loginbtn" value="LOGIN" onClick={Submit}/>
            </div>
            <br/>
            <div className="findbtn">
              <Link to="/findpw">
                <span className='/findpw'>비밀번호를 잊어버리셨나요?</span>
              </Link>
              
            </div>
          </form>
        </div>
		  </div>
	);
};

export default App;