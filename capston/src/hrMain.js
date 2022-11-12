import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./css/hrMain.css";
import axios from "axios";
import Basic from "../src/img/basic.png";
import Profile from "../src/img/profile.png";
import User from "../src/img/user.png";
import ApexCharts from "react-apexcharts";
import * as GetYearOfWork from "./modules/getYearOfWork";
import qs from "qs";

const App = () => {
  let maxAnnual = 15;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [today, setToday] = useState(new Date());
  const [defaultYear, setDefaultYear] = useState("19");
  const [workMonth, setWorkMonth] = useState("0");
  const [workYear, setWorkYear] = useState("0");
  const [workDay, setWorkDay] = useState("0");
  const [annual, setAnnual] = useState(12.5); //연차 개수
  const [picture, setPicture] = useState("null");
  const [userData, setUserData] = useState({});
  const [vacationData, setVacationData] = useState([]);

  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let toDayDate = now.getDate();

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let dayOfWeek = week[now.getDay()];

    return todayYear + "년 " + todayMonth + "월 " + toDayDate + "일 " + dayOfWeek + "요일";
  }

  useEffect(() => {
    let data = cookies["loginInfo"];
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
        let identityBase = userInfo["identity"].slice(6, 7);
        if (identityBase == "1" || identityBase == "2") {
          setDefaultYear("19");
        } else {
          setDefaultYear("20");
        }
        setUserData(response.data.ITEMS[0]);
      });

    postParam = {
      name: cookies.loginInfo.name
    }
    postParam = qs.stringify(postParam);

    axios
      .post("http://43.200.115.198:8080/vacationCheck.jsp", postParam)
      .then((res) => {
        console.log("ressult : ", res);
        setVacationData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);



  useEffect(() => {
    let empInfo = cookies["empInfo"];
    let postParam = qs.stringify({
      id: empInfo["id"],
    });

    axios
      .post("http://43.200.115.198:8080/getpicture.jsp", postParam)
      .then((response) => {
        sessionStorage.setItem("picture", response.data.ITEMS[0].picture);
        setPicture(window.sessionStorage.getItem("picture"));
      });
  }, []);

  const [data, setData] = useState({
    series: [(100 / maxAnnual) * annual], //100 -> 12
    options: {
      chart: {
        height: 0,
        type: "radialBar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "85%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "50%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return annual + "개";
              },
              color: "#111",
              fontSize: "20px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["잔여연차"],
    },
  });

  return (
    <div className="hrMain">
      <div className="hrMain_container">
        <div className="hrMain_Flex">
          <div className="hrMain_user_container">
            <h4>사용자 정보</h4>
            <div className="hrMain_userInfo">
              <div className="hrMain_userImg">
                {picture === "null" ? (
                  <img className="empimg" src={User} alt="이미지" />
                ) : (
                  <img className="empimg" src={picture} alt={"사진"} />
                )}
              </div>
              <div className="hrMain_userDetail">
                <li className="hrMain_userName">{userData["name"] ? userData["name"] : "로딩중"}</li>
                <li>{userData["sabun"] ? userData["sabun"] : "로딩중"}</li>
                <li className="hrMain_dept">{userData["centerKR"] ? userData["centerKR"] : "로딩중"}</li>
                <li className="hrMain_subDept">{userData["deptKR"] ? userData["deptKR"] : "로딩중"}</li>
                <li className="hrMain_Team">{userData["teamKR"] ? userData["teamKR"] : "로딩중"}</li>
              </div>
            </div>
          </div>
          <div className="hrMain_work_container">
            <div>
              <h4>근무 정보</h4>
              <div className="hrMain_workInfo">
                <div
                  style={{
                    padding: "15px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}>
                  {todayTime()}
                </div>
                <div className="hrMain_workInfo_work">
                  <div className="hrMain_workState"> 출근 </div>
                  <div className="hrMain_workDate"> {todayTime().slice(0, 4)}-{todayTime().slice(5, 8)}-{todayTime().slice(10, 12)} </div>
                  <div className="hrMain_workTime">08:49</div>
                </div>

                <ApexCharts
                  options={data.options}
                  series={data.series}
                  type="radialBar"
                  height={220}
                />
                <div className="hrMain_workBottomText">2022년 17개 갱신</div>
              </div>
            </div>
          </div>

          <div className="hrMain_work_container">
            <div>
              <h4>연차/휴가 신청 내역</h4>
              <div className="hrMain_workTable">
                <table className="hrMain_table">
                  <thead>
                    <tr>
                      <td>구분</td>
                      <td>일시</td>
                      <td>처리상태</td>
                      <td>대체 업무자</td>
                    </tr>
                  </thead>
                  <tbody>
                    {vacationData.map(function (item) {
                      return (
                        <>
                          <tr>
                            <td style={{ minWidth: "80px" }}>{item.vacation === "0"
                              ? "연차"
                              : "" || item.vacation === "1"
                                ? "오전반차"
                                : "" || item.vacation === "2"
                                  ? "오후반차"
                                  : "" || item.vacation === "3"
                                    ? "경조사휴가"
                                    : "" || item.vacation === "4"
                                      ? "병결"
                                      : "" || item.vacation === "5"
                                        ? "기타"
                                        : ""}</td>
                            <td>{item.ann_start_date.slice(0, 4)}년&nbsp;{" "}
                              {item.ann_start_date.slice(4, 6)}월&nbsp;{" "}
                              {item.ann_start_date.slice(6, 8)}일&nbsp; ~ &nbsp;
                              {item.ann_end_date.slice(6, 8)}일</td>
                            <td style={{ minWidth: "80px" }}>{item.ann_state === "0" ? "대기중":"처리완료"}</td>
                            <td style={{ minWidth: "100px" }}>{item.rep_name} {item.rep_rank === "1"
                              ? "사원"
                              : " " || item.rank === "2"
                                ? "대리"
                                : " " || item.rank === "3"
                                  ? "과장"
                                  : "" || item.rank === "4"
                                    ? "차장"
                                    : " " || item.rank === "5"
                                      ? "부장"
                                      : ""}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="hrMain_notice_container">
          <h4>공지사항</h4>
          <div className="hrMain_notice"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
