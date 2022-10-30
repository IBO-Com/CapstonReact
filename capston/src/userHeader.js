import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import "./css/userHeader.css";
import { Link } from 'react-router-dom';
import * as Cookie from "./cookies/cookies";


const App = () => {
    const name = Cookie.getCookie("employeeInfo").name

    useEffect(() => {
        axios
            .post("http://43.200.115.198:8080/empselect.jsp")
            .then((res) => {
                console.log(res);
                setPeopleData(res.data.ITEMS);
            })
            .catch((Error) => {
                console.log(Error);
            });
           
    }, []);

    const [peopleData, setPeopleData] = useState();

    return (
        <div>
            <div className="userHeader_wrap">
                <div className="userHeader_sub_wrap">
                    <p className="userHeader_sub_tile">{name}님 환영합니다!</p>
                    <div className="userHeader_sub_menu">
                        <button className="userHeader_logout"><BiLogOut size={"30px"} color={"gray"} /></button>
                        <div class="userHeader_dropdown">
                            <ul>
                                <li><Link to="/" className="userHeader_logout">로그아웃</Link></li>
                                <li><Link to="../login/changepw" className="userHeader_changepw">비밀번호 변경</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;