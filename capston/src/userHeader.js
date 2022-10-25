import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineSetting, AiOutlineBell } from "react-icons/ai";
import "./css/userHeader.css";

const App = () => {

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

    return (
        <div>
            <div className="userHeader_wrap">
                <div className="userHeader_sub_wrap">
                    <p className="userHeader_sub_tile">이정재님 환영합니다!</p>
                    <div className="userHeader_sub_menu">
                        <button className="userHeader_notice"><AiOutlineSetting size={"30px"} color={"gray"} /></button>
                        <button className="userHeader_profile"><AiOutlineBell size={"30px"} color={"gray"} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;