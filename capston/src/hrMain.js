import React, {useState} from "react";

import "./css/hrMain.css";

import Basic from "../src/img/basic.png";
import Profile from "../src/img/profile.png";
import User from "../src/img/user.png";
import ApexCharts from 'react-apexcharts';

const App = () => {
  const [data, setData] = useState({
    series: [12],
    options: {
      chart: {
        height: 0,
        type: 'radialBar',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
           hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
      
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              formatter: function(val) {
                return parseInt(val);
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Percent'],
    },
}
  );

  return (
    <div className="hrMain">
      <div className="hrMain_container">
        <div className="hrMain_Flex">
          <div className="hrMain_user_container">
            <h4>사용자 정보</h4>
            <div className="hrMain_userInfo">
              <div className="hrMain_userImg">
                <img src={User} alt="userImg" />
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
            <h4>근무 정보</h4>
            <div className="hrMain_workInfo">
              <ul>
                <li className="hrMain_today">2022.09.29 목</li>
                <li>출근 2022-07-29 08:49</li>
                <li>
                <ApexCharts options={data.options} series={data.series} type="radialBar" height={350} />

    
                </li>
                <p>
                  {" "}
                  잔여 연차 12개 / 총 연차 5개 <br /> 2022년 17개 갱신{" "}
                </p>
              </ul>
            </div>
            <div className="hrMain_history">
              <h4>신청내역</h4>
              <button className="hrMain_history_btn">
                <img className="hrMain_button_img" src={Basic} alt="detail" />
              </button>
            </div>
            <div className="hrMain_historyList">
              <table className="hrMain_historyTable">
                <th>신청종류</th>
                <th>신청일자</th>
                <th>처리</th>
                <th>접수일자</th>
                <tr>
                  <td>연차휴가</td>
                  <td>2022.07.28</td>
                  <td>완료</td>
                  <td>2022.07.28</td>
                </tr>
                <tr>
                  <td>연차휴가</td>
                  <td>2022.07.15</td>
                  <td>완료</td>
                  <td>2022.07.15</td>
                </tr>
                <tr>
                  <td>연차휴가</td>
                  <td>2022.05.15</td>
                  <td>완료</td>
                  <td>2022.05.15</td>
                </tr>
                <tr>
                  <td>출장</td>
                  <td>2022.03.15</td>
                  <td>완료</td>
                  <td>2022.03.15</td>
                </tr>
                <tr>
                  <td>연차휴가</td>
                  <td>2022.02.15</td>
                  <td>완료</td>
                  <td>2022.02.15</td>
                </tr>
              </table>
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
