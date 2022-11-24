import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import "./css/userHeader.css";
import { Link } from "react-router-dom";
import * as Cookie from "./cookies/cookies";

const App = () => {
  let isShow = false;
  const [showOption, setShowOption] = useState(false)
  const handleToggleOption = () => setShowOption((prev) => !prev)
  const modalRef = useRef();
  const btnRef = useRef();

  const handleClickOutSide = (e) => {
    console.log("포함이 되어 있나?", modalRef.current.contains(e.target))
    if (showOption && !modalRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
      setShowOption(false);
    }
  }


  const name = Cookie.getCookie("loginInfo").name;
  
  useEffect(() => {
    if (showOption) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [showOption])

  useEffect(() => {
    axios
      .post("http://43.200.115.198:8080/empselect.jsp")
      .then((res) => {
        setPeopleData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });

  }, []);

  const [peopleData, setPeopleData] = useState();

  const hd_dropdown = () => {
    setShowOption(!showOption);
  }


  return (
    <div>
      <div className="userHeader_wrap">
        <div className="userHeader_sub_wrap">
          <p className="userHeader_sub_tile">{name}님 환영합니다!</p>
          <div className="userHeader_sub_menu">
            <button className="userHeader_logout" onClick={hd_dropdown} ref={btnRef}>
              <BiLogOut size={"30px"} color={"gray"} />
            </button>
            {
              <div className={showOption ? "userHeader_dropdown_show" : "userHeader_dropdown_hidden"} ref={modalRef}>
                <div className="userHeader_dropdown_title">
                  <Link to="/" className="userHeader_dropdown_subtitle">
                    <div>
                      로그아웃
                    </div>
                  </Link>
                </div>
                <div className="userHeader_dropdown_title">
                  <Link to="/changepw" className="userHeader_dropdown_subtitle">
                    <div>
                      비밀번호 변경
                    </div>
                  </Link>
                </div>
              </div>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
