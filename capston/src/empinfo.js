import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";
import { useCookies } from "react-cookie";

import testimg from "./img/user.png";
import "./css/empinfo/empinfo.css";
import Empbase from "./empInfo_detail/Empbase";
import Appointment from "./empInfo_detail/Appointment";
import Account from "./empInfo_detail/Account";
import Family from "./empInfo_detail/Family";
import License from "./empInfo_detail/License";

import axios from "axios";
import qs from "qs";
import * as GetYearOfWork from "./modules/getYearOfWork";

const App = () => {
  const [today, setToday] = useState(new Date());
  const [defaultYear, setDefaultYear] = useState("19");
  const [workMonth, setWorkMonth] = useState("0");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [workYear, setWorkYear] = useState("0");
  const [workDay, setWorkDay] = useState("0");
  const [cookies, setCookie, removeCookie] = useCookies();

  const [selectDepart, setSelectDepart] = useState("*");
  const [textName, setTextName] = useState("");
  const [peopleData, setPeopleData] = useState();
  const [sabun, setSabun] = useState();

  const [picture, setPicture] = useState(
    window.sessionStorage.getItem("picture")
  );
  const [toogleState, setToggleState] = useState(1);
  const [userData, setUserData] = useState({});

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
  };

  const searchBtnHandler = () => {
    let data = textName;
    let userInfo = {};

    let postParam = qs.stringify({
      sabunOrName: data,
    });

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((response) => {
        userInfo = response.data.ITEMS[0];

        let identityBase = userInfo["identity"].slice(6, 7);
        if (identityBase == "1" || identityBase == "2") {
          setDefaultYear("19");
        } else {
          setDefaultYear("20");
        }
        console.log("userInfo : ", userInfo);
        setUserData(userInfo);

        let postParam2 = qs.stringify({
          id: userInfo["sabun"],
        });

        let resData = response.data.ITEMS[0];
        let date = new Date(
          resData["start_date"].slice(0, 4),
          parseInt(resData["start_date"].slice(4, 6)) - 1,
          resData["start_date"].slice(6, 8)
        );

        let retDate = new Date();
        if (resData["retire_date"]) {
          retDate = new Date(
            resData["retire_date"].slice(0, 4),
            parseInt(resData["retire_date"].slice(4, 6)) - 1,
            resData["retire_date"].slice(6, 8)
          );
        }

        axios
          .post("http://43.200.115.198:8080/getpicture.jsp", postParam2)
          .then((response) => {
            setPicture(response.data.ITEMS[0].picture);
          });

        GetYearOfWork.getYearOfWork(
          date,
          retDate,
          setWorkYear,
          setWorkMonth,
          setWorkDay
        );
      });
  };

  useEffect(() => {
    let data = cookies["loginInfo"];
    console.log("cookies : ", data);
    let userInfo = {};

    let postParam = qs.stringify({
      sabunOrName: data["id"],
    });

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((response) => {
        userInfo = response.data.ITEMS[0];

        let identityBase = userInfo["identity"].slice(6, 7);
        if (identityBase == "1" || identityBase == "2") {
          setDefaultYear("19");
        } else {
          setDefaultYear("20");
        }
        setUserData(response.data.ITEMS[0]);

        let resData = response.data.ITEMS[0];
        let date = new Date(
          resData["start_date"].slice(0, 4),
          parseInt(resData["start_date"].slice(4, 6)) - 1,
          resData["start_date"].slice(6, 8)
        );
        let retDate = new Date();
        if (resData["retire_date"]) {
          retDate = new Date(
            resData["retire_date"].slice(0, 4),
            parseInt(resData["retire_date"].slice(4, 6)) - 1,
            resData["retire_date"].slice(6, 8)
          );
        }

        console.log(response.data.ITEMS[0]);
        GetYearOfWork.getYearOfWork(
          date,
          retDate,
          setWorkYear,
          setWorkMonth,
          setWorkDay
        );
      });
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="empInfo">
      {cookies["loginInfo"].authority == "1" ? ( //???????????????
        <>
          <div className="card_dateBox">
            <span>?????? ?????? &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <FormControl>
              <TextField
                id="outlined-card"
                label="??????/??????"
                variant="outlined"
                size="small"
                onChange={textNameHandle}
              />
            </FormControl>

            <button
              className="card_search_btn"
              onClick={() => {
                searchBtnHandler();
              }}
            >
              ??????
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="plzEmp">
        <div>
          <div className="empWrapimg">
            {picture === null || picture === "" ? (
              <img className="empimg" src={testimg} alt={"?????????"} /> //?????? ????????? ?????? null?????????
            ) : (
              <img className="empimg" src={picture} alt={"??????"} />
            )}
          </div>
        </div>

        <div className="nameAnddept">
          <p className="empinfoName">
            {userData["name"] ? userData["name"] : "?????????"}
          </p>

          <p className="empinfoDept">
            {userData["centerKR"] ? userData["centerKR"] : "?????????"}
          </p>
        </div>

        <div className="empBox">
          <table className="empFirstTable">
            <tbody className="empinfoList">
              <tr>
                <td>?????????</td>
                <td>???????????????</td>
                <td>????????????</td>
                <td>?????????</td>
              </tr>
              <tr>
                <td>{userData["sabun"] ? userData["sabun"] : "?????????"}</td>
                <td>{userData["retire_cls"] == 0 ? "??????" : "??????"}</td>
                <td>{userData["deptKR"] ? userData["deptKR"] : "?????????"}</td>
                <td>{userData["rankKR"] ? userData["rankKR"] : "?????????"}</td>
              </tr>
              <p></p>
              <tr>
                <td>???????????????</td>
                <td>????????????</td>
                <td>???????????????</td>
                <td>?????????????????????</td>
                <td>????????????</td>
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
                    : "?????????"}
                </td>
                <td>
                  {userData["start_date"]
                    ? userData["start_date"].slice(0, 4) +
                      "-" +
                      userData["start_date"].slice(4, 6) +
                      "-" +
                      userData["start_date"].slice(6, 8)
                    : "?????????"}
                </td>
                <td>
                  {workYear}??? {workMonth}??????
                </td>
                <td>
                  {userData["start_date"]
                    ? userData["start_date"].slice(0, 4) +
                      "-" +
                      userData["start_date"].slice(4, 6) +
                      "-" +
                      userData["start_date"].slice(6, 8)
                    : "?????????"}
                </td>
                <td>
                  {userData["retire_date"]
                    ? userData["retire_date"].slice(0, 4) +
                      "-" +
                      userData["retire_date"].slice(4, 6) +
                      "-" +
                      userData["retire_date"].slice(6, 8)
                    : "?????????"}
                </td>
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
            ????????????
          </div>
          <div
            className="appoint btn"
            onClick={() => {
              toggleTab(2);
            }}
          >
            ??????
          </div>
          <div
            className="account btn"
            onClick={() => {
              toggleTab(3);
            }}
          >
            ??????
          </div>
          <div
            className="family btn"
            onClick={() => {
              toggleTab(4);
            }}
          >
            ??????
          </div>
          <div
            className="license btn"
            onClick={() => {
              toggleTab(5);
            }}
          >
            ??????
          </div>
        </div>

        <hr className="empFirstLine" align="left"></hr>
        <div>
          {toogleState === 1 ? (
            <Empbase
              userData={userData}
              setUserData={setUserData}
              defaultYear={defaultYear}
            />
          ) : (
            ""
          )}
          {toogleState === 2 ? <Appointment userData={userData} /> : ""}
          {toogleState === 3 ? <Account userData={userData} /> : ""}
          {toogleState === 4 ? <Family userData={userData} /> : ""}
          {toogleState === 5 ? <License userData={userData} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default App;
