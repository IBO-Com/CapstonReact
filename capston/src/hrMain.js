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
  const [cookies, setCookie, removeCookie] = useCookies();
  const [today, setToday] = useState(new Date());
  const [defaultYear, setDefaultYear] = useState("19");
  const [workMonth, setWorkMonth] = useState("0");
  const [workYear, setWorkYear] = useState("0");
  const [workDay, setWorkDay] = useState("0");
  const [annual, setAnnual] = useState(0);
  const [maxAnnual, setMaxAnnual] = useState(0);
  const [picture, setPicture] = useState("null");
  const [userData, setUserData] = useState({});
  const [vacationData, setVacationData] = useState([]);
  const [data, setData] = useState();

  const annualData = {
    "0": "연차",
    "01": "오전반차",
    "02": "오후반차",
    "03": "경조휴가",
    "04": "병결",
    "05": "기타"
  }

  
  useEffect(() => {
    axios.post("http://43.200.115.198:8080/vacationcount.jsp", qs.stringify({
      sabunOrName: cookies["loginInfo"].id
    })).then((res) => {
      let data_ = res.data.ITEMS[0];
      let _max = parseFloat(data_.remain_annual) + parseFloat(data_.use_annual);
      let _use = parseFloat(data_.remain_annual);
      
      setMaxAnnual(_max);
      setAnnual(_use);
      
      setData({
        series: [(100 / _max) * _use], //100 -> 12
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
                size: "80%",
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
                  color: "black",
                  fontSize: "17px",
                },
                value: {
                  formatter: function (val) {
                    return _use +  "개";
                  },
                  color: "black",
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
      })
      
    }).catch((Error) => {
      console.log(Error);
    });
  }, []);



  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let toDayDate = now.getDate();

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let dayOfWeek = week[now.getDay()];

    return todayYear + "년 " + todayMonth + "월 " + toDayDate + "일 " + dayOfWeek + "요일";
  }

  const daytime = () => { //공지사항 월급날 전용 함수
    let now = new Date();
    let toDayDate = now.getDate();

    return toDayDate;
  }

  const pay = () => {
    if (daytime() >= 0) { //월급일은 매달 5일이기 때문에 5일에 보게함.
      return (
        <div style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}>
          <div style={{
            lineHeight: "30px",
            color: "white",
            textAlign: "center",
            width: "65px",
            height: "30px",
            backgroundColor: "cornflowerblue",
            border: "1px solid cornflowerblue",
            borderRadius: "5px",
            boxShadow: "1px 1px 5px white",

          }}>정보</div>
          <p style={{ marginLeft: "10px", marginTop: "0px", lineHeight: "30px" }}> {todayTime().slice(0, 10)} 급여가 들어왔어요!</p>
        </div>
      );
    } else {
      return (<p>오늘도 좋은하루 되세요!</p>);
    }
  }
  //0 연차, 01 오전반차, 02 오후반차, 03 경조휴가, 04 병결, 05기타
  const annNotice = () => {
    let component = [];
    for (let i = 0; i < vacationData.length; i++) {
      let data = vacationData[i];
      if (data.ann_state == "0") { //0 대기 / 1 승인 
        component.push(
          <p></p>
        )
      } else if (data.ann_state == "1") {
        component.push(
          <div style={{ display: "flex", flexDirection: "row", marginLeft: "5px", marginBottom: "10px" }}>
            <div style={{
              lineHeight: "30px",
              color: "white",
              textAlign: "center",
              width: "65px",
              height: "30px",
              backgroundColor: "#21BF54",
              border: "1px solid #21BF54",
              borderRadius: "5px",
              boxShadow: "1px 1px 5px white",

            }}>승인</div>
            <p style={{ marginLeft: "10px", marginTop: "0px", lineHeight: "30px" }}> {annualData[data.vacation]} 신청이 승인됐어요!</p>
          </div>
        )
      }
    }
    return component;
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
      sabunOrName: cookies.loginInfo.id
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
              <h4>연차 정보</h4>
              <div className="hrMain_workInfo">
                <div className="hr_timeNwork">
                  {todayTime()}
                </div>
                {
                  data ? (
                    <ApexCharts
                  options={data.options}
                  series={data.series}
                  type="radialBar"
                  height={290}
                />
                  ) : (
                    <>
                      <span>데이터를 불러올 수 없습니다.</span>
                    </>
                  )
                }
                
                {/* <div className="hrMain_workBottomText"></div> */}
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
                            <td style={{ minWidth: "80px" }}>{annualData[item.vacation]}</td>
                            <td>{item.ann_start_date.slice(0, 4)}년&nbsp;{" "}
                              {item.ann_start_date.slice(4, 6)}월&nbsp;{" "}
                              {item.ann_start_date.slice(6, 8)}일&nbsp; ~ &nbsp;
                              {item.ann_end_date.slice(6, 8)}일</td>
                            <td style={{ minWidth: "80px" }}>{item.ann_state === "0" ? "대기중" : "처리완료"}</td>
                            <td style={{ minWidth: "100px" }}>{item.rep_name} {item.rep_rankKR}</td>
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
          <h4>새로운 알림</h4>
          <div className="hrMain_notice">
            <p>{pay()}</p>
            <p>{
              annNotice().map((item, index) => (
                item
              ))
            }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
