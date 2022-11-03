import React, { useState, useEffect } from "react";

import "./css/hrMain.css";

import Basic from "../src/img/basic.png";
import Profile from "../src/img/profile.png";
import User from "../src/img/user.png";
import ApexCharts from "react-apexcharts";

const App = () => {
  let maxAnnual = 15;
  const [annual, setAnnual] = useState(12.5); //연차 개수
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    setPicture(window.sessionStorage.getItem("picture"));
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
                <li className="hrMain_userName">김명지</li>
                <li>2022771010</li>
                <li className="hrMain_dept">경영관리본부</li>
                <li className="hrMain_subDept">경영기획부</li>
                <li className="hrMain_Team">총무인사팀</li>
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
                  }}
                >
                  2022.10.27 (목)
                </div>
                <div className="hrMain_workInfo_work">
                  <div className="hrMain_workState"> 출근 </div>
                  <div className="hrMain_workDate"> 2022-07-29 </div>
                  <div className="hrMain_workTime"> 08:49</div>
                </div>

                <ApexCharts
                  options={data.options}
                  series={data.series}
                  type="radialBar"
                  height={200}
                />
                <div className="hrMain_workBottomText">2022년 17개 갱신</div>
              </div>
            </div>
          </div>

          <div className="hrMain_work_container">
            <div>
              <h4>신청 내역</h4>
              <div className="hrMain_workTable">
                <table className="hrMain_table">
                  <thead>
                    <tr>
                      <td>신청종류</td>
                      <td>신청일자</td>
                      <td>처리</td>
                      <td>접수일자</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>연차휴가</td>
                      <td>2022.07.28</td>
                      <td>완료</td>
                      <td>2022.07.28</td>
                    </tr>

                    <tr>
                      <td>출장</td>
                      <td>2022.03.15</td>
                      <td>완료</td>
                      <td>2022.03.15</td>
                    </tr>
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
