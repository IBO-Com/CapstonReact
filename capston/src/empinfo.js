import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";

import testimg from "./img/user.png";
import "./css/empinfo/empinfo.css";
import Empbase from "./empInfo_detail/Empbase";
import Appointment from "./empInfo_detail/Appointment";
import Account from "./empInfo_detail/Account";
import Family from "./empInfo_detail/Family";
import License from "./empInfo_detail/License";

import axios from "axios";
import qs from "qs";
import * as Cookie from "./cookies/cookies";
import * as GetYearOfWork from "./modules/getYearOfWork";
import * as GetCDTR from "./modules/getCDTR";

const App = () => {
  const [today, setToday] = useState(new Date());
  const [defaultYear, setDefaultYear] = useState("19");
  const [workMonth, setWorkMonth] = useState("0");
  const [workYear, setWorkYear] = useState("0");
  const [workDay, setWorkDay] = useState("0");

  const [selectDepart, setSelectDepart] = useState("*");
  const [textName, setTextName] = useState("");
  const [peopleData, setPeopleData] = useState();
  const [sabun, setSabun] = useState();

  const [dept, setDept] = useState("");
  const [team, setTeam] = useState("");
  const [rank, setRank] = useState("");
  const [center, setCenter] = useState("");
  const [picture, setPicture] = useState(
    window.sessionStorage.getItem("picture")
  );
  const [toogleState, setToggleState] = useState(1);
  const [userData, setUserData] = useState({});

  const sendSubmit = () => {
    console.log("send submit");

    /* 쿼리 문 작성 */
    let postParam = {};
    let query = {};

    if (textName.trim() == "") {
      delete query["sabunOrName"];
    } else {
      query["sabunOrName"] = textName;
    }
    if (selectDepart == "*") {
      delete query["dept"];
    } else {
      query["dept"] = selectDepart;
    }

    postParam = qs.stringify(query);

    //console.log(query);

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((res) => {
        setPeopleData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
  };


  useEffect(() => {
    let data = Cookie.getCookie("loginInfo");
    let userInfo = {};

    let postParam = qs.stringify({
      sabunOrName: data["id"],
    });

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((response) => {
        userInfo = response.data.ITEMS[0];

        let startDate = new Date(
          userInfo["start_date"].slice(0, 4),
          parseInt(userInfo["start_date"].slice(4, 6)) - 1, //Date 연산으로 인한 -1을 해주어야 함
          userInfo["start_date"].slice(6, 8)
        );
        GetYearOfWork.getYearOfWork(
          startDate,
          today,
          setWorkYear,
          setWorkMonth,
          setWorkDay
        );

        if (
          today.getFullYear() - 2000 <
          parseInt(userInfo["identity"].slice(0, 2))
        ) {
          setDefaultYear("19");
        } else {
          setDefaultYear("20");
        }
        setUserData(response.data.ITEMS[0]);

        GetCDTR.getCDTR(
          userInfo["center"],
          userInfo["dept"],
          userInfo["team"],
          userInfo["rank"],
          setCenter,
          setDept,
          setTeam,
          setRank
        );
      });
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="empInfo">
      <div className="card_dateBox">
        <span>사원 조회 &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <FormControl>
          <TextField
            id="outlined-card"
            label="사번/성명"
            variant="outlined"
            size="small"
            onChange={textNameHandle}
          />
        </FormControl>
        <button
          className="card_search_btn"
          onClick={() => {
            sendSubmit();
          }}
        >
          검색
        </button>
      </div>

      <hr className="empSearchBar"></hr>

      <div className="plzEmp">
        <div>
          <div className="empWrapimg">
            {picture === "null" ? (
              <img className="empimg" src={testimg} alt="이미지" />
            ) : (
              <img className="empimg" src={picture} alt={"사진"} />
            )}
          </div>
        </div>

        <div className="nameAnddept">
          <p className="empinfoName" style={{ fontSize: "20px" }}>
            {userData["name"] ? userData["name"] : "로딩중"}
          </p>

          <p className="empinfoDept" style={{ fontSize: "13px" }}>
            {center}
          </p>
        </div>

        <div className="empBox">
          <table className="empFirstTable">
            <tbody className="empinfoList">
              <tr>
                <td>ㆍ사번</td>
                <td>ㆍ재직상태</td>
                <td>ㆍ부서명</td>
                <td>ㆍ직책</td>
              </tr>
              <tr>
                <td>{userData["sabun"] ? userData["sabun"] : "로딩중"}</td>
                <td>{userData["retire_cls"] == 0 ? "재직" : "퇴직"}</td>
                <td>{dept ? dept : ""}</td>
                <td>{rank ? rank : ""}</td>
              </tr>
              <br></br>
              <tr>
                <td>ㆍ생년월일</td>
                <td>ㆍ입사일</td>
                <td>ㆍ근속기간</td>
                <td>ㆍ현부서발령일</td>
                <td>ㆍ퇴사일</td>
              </tr>
              <tr>
                <td>
                  {userData["identity"]
                    ? defaultYear +
                    userData["identity"].slice(0, 2) +
                    "-" +
                    userData["identity"].slice(2, 4) +
                    "-" +
                    userData["identity"].slice(4, 6)
                    : "로딩중"}
                </td>
                <td>
                  {userData["start_date"]
                    ? userData["start_date"].slice(0, 4) +
                    "-" +
                    userData["start_date"].slice(4, 6) +
                    "-" +
                    userData["start_date"].slice(6, 8)
                    : "로딩중"}
                </td>
                <td>
                  {workYear}년 {workMonth}개월
                </td>
                <td>
                  {userData["start_date"]
                    ? userData["start_date"].slice(0, 4) +
                    "-" +
                    userData["start_date"].slice(4, 6) +
                    "-" +
                    userData["start_date"].slice(6, 8)
                    : "로딩중"}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="empLine">
        <hr className="empFirstLine" align="left"></hr>
        <div className="empTabFlex">
          <div
            className="empBasic btn"
            onClick={() => {
              toggleTab(1);
            }}
          >
            인사기본
          </div>
          <div
            className="appoint btn"
            onClick={() => {
              toggleTab(2);
            }}
          >
            발령
          </div>
          <div
            className="account btn"
            onClick={() => {
              toggleTab(3);
            }}
          >
            계좌
          </div>
          <div
            className="family btn"
            onClick={() => {
              toggleTab(4);
            }}
          >
            가족
          </div>
          <div
            className="license btn"
            onClick={() => {
              toggleTab(5);
            }}
          >
            자격
          </div>
        </div>

        <hr className="empFirstLine" align="left"></hr>
        <div>
          {toogleState === 1 ? (
            <Empbase userData={userData} defaultYear={defaultYear} />
          ) : (
            ""
          )}
          {toogleState === 2 ? <Appointment /> : ""}
          {toogleState === 3 ? <Account /> : ""}
          {toogleState === 4 ? <Family /> : ""}
          {toogleState === 5 ? <License /> : ""}
        </div>
      </div>
    </div>
  );
};

export default App;
