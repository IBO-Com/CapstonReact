import { React, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem } from "@material-ui/core";
import axios from "axios";
import qs from "qs";
import ReactApexChart from "react-apexcharts";
import "../css/PersonalSalary/PersonalSalary.css";
import * as Utils from "../modules/utils";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [selectDepart, setSelectDepart] = useState("*");
  const [searchDate, setSearchDate] = useState(new Date());
  let defaultMonth = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const textNameHandle = (e) => {
    setTextName(e.target.value);
  };

  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let toDayDate = now.getDate();

    return todayYear + "-" + todayMonth + "-" + toDayDate;
  };

  const [textName, setTextName] = useState("");
  const [taxPack, setTaxPack] = useState({});
  const [empInfo, setEmpInfo] = useState();
  const [account, setAccount] = useState();

  const sendSubmit = () => { //전송 
    let todayString = Utils.dateFormatString(searchDate);
    let empData = null;
    axios.post("http://43.200.115.198:8080/empselect.jsp", qs.stringify({
      sabunOrName: textName
    })).then((res) => {
      setEmpInfo(res.data.ITEMS[0]);
      empData = res.data.ITEMS[0]; //동일 인물있을때는 첫번째 인물만

      axios.post("http://43.200.115.198:8080/getBank.jsp", qs.stringify({
      sabun: empData.sabun
    })).then((res) => {
      setAccount(res.data.ITEMS[0]);
    }).catch((Err) => {
      console.log(Err);
    })

   
    let postParam = {
      sabun: empData.sabun,
      year: todayString.slice(0, 4)
    }
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getPayment.jsp", postParam).then((res) => {
      let data = res.data.ITEMS; 
      let tableData = {};
      console.log(data);
      for(let i = 12; i >= 1; i --) {
        let monthStr = i < 10 ? "0" + i : String(i);
        if(data.length > 0) {
          let lastData = data[data.length - 1];
          if(lastData.month == monthStr) {
            tableData[lastData.year + lastData.month] = lastData;
            data.pop();
          }
        }
      }
      setTaxPack(tableData);
    }).catch((Error) => {
      console.log(Error);
    });
  }).catch((Err) => {
    console.log(Err);
  })
  };
  
  useEffect(() => {
    let todayString = Utils.dateFormatString(searchDate);
    
    axios.post("http://43.200.115.198:8080/getBank.jsp", qs.stringify({
      sabun: cookies["loginInfo"].id
    })).then((res) => {
      setAccount(res.data.ITEMS[0]);
    }).catch((Err) => {
      console.log(Err);
    })

    axios.post("http://43.200.115.198:8080/empselect.jsp", qs.stringify({
      sabunOrName: cookies["loginInfo"].id
    })).then((res) => {
      setEmpInfo(res.data.ITEMS[0]);
    }).catch((Err) => {
      console.log(Err);
    })

    let postParam = {
      sabun: cookies["loginInfo"].id,
      year: todayString.slice(0, 4)
    }
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getPayment.jsp", postParam).then((res) => {
      let data = res.data.ITEMS; 
      let tableData = {};
      console.log(data);
      for(let i = 12; i >= 1; i --) {
        let monthStr = i < 10 ? "0" + i : String(i);
        if(data.length > 0) {
          let lastData = data[data.length - 1];
          if(lastData.month == monthStr) {
            tableData[lastData.year + lastData.month] = lastData;
            data.pop();
          }
        }
      }
      console.log(tableData);
      setTaxPack(tableData);
    }).catch((Error) => {
      console.log(Error);
    })
  }, []);

  useEffect(() => {
    if(!taxPack) return;
    setMonthlyBar(
      {
        series: [
          {
            name: "실수령액",
            data: [
              taxPack[searchDate.getFullYear() + "01"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "01"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "01"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "02"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "02"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "02"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "03"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "03"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "03"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "04"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "04"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "04"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "05"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "05"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "05"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "06"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "06"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "06"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "07"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "07"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "07"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "08"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "08"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "08"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "09"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "09"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "09"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "10"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "10"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "10"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "11"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "11"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "11"].totalDud)) / 10000): 0,
              taxPack[searchDate.getFullYear() + "12"] ? Math.floor((parseInt(taxPack[searchDate.getFullYear() + "12"].totalPay) - parseInt(taxPack[searchDate.getFullYear() + "12"].totalDud)) / 10000): 0
            ],
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 5, //표 테두리 둥글게
              dataLabels: {
                position: "top", // 데이터 값 표시 위치 top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true, //값 보여줄거야 말거야
            formatter: function (val) {
              return val;
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"], //표 바로 위에 글자색
            },
          },
    
          xaxis: {
            categories: [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ],
            position: "bottom", //카테고리의 방향
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.1,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: false, //마우스 호버할 때 카테고리에 잡히는 말풍선 모양
            },
          },
          yaxis: {
            axisBorder: {
              show: false, //표 왼쪽 세로로 마감처리 하냐 마냐
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: true, //옆에 최대 최소값 표시하냐
              formatter: function (val) {
                return val + "만원";
              },
            },
          },
          title: {
            text: "", //표 타이틀 필요없어서 텍스트 지움
            floating: true,
            offsetY: 0,
            align: "center",
            style: {
              color: "#000000",
            },
          },
        },
      }
    )
  }, [taxPack]);

  //초기값
  const [monthlyBar, setMonthlyBar] = useState({
    series: [
      {
        name: "실수령액",
        data: [1, 20, 300, 400, 5000, 60, 700, 800,90, 1000, 1100, 120],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 5, //표 테두리 둥글게
          dataLabels: {
            position: "top", // 데이터 값 표시 위치 top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true, //값 보여줄거야 말거야
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"], //표 바로 위에 글자색
        },
      },

      xaxis: {
        categories: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
        position: "bottom", //카테고리의 방향
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false, //마우스 호버할 때 카테고리에 잡히는 말풍선 모양
        },
      },
      yaxis: {
        axisBorder: {
          show: false, //표 왼쪽 세로로 마감처리 하냐 마냐
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true, //옆에 최대 최소값 표시하냐
          formatter: function (val) {
            return val + "만원";
          },
        },
      },
      title: {
        text: "", //표 타이틀 필요없어서 텍스트 지움
        floating: true,
        offsetY: 0,
        align: "center",
        style: {
          color: "#000000",
        },
      },
    },
  });

  return (
    <div className="PersonalSalary_conatainer">
    {
      cookies["loginInfo"].authority == '1' ? (
        <div className="PersonalSalary_search">
        
        <FormControl>
          <input
            style={{
              lineHeight: "33px",
              width: "170px",
              height: "33px",
            }}
            placeholder="사번 / 성명"
            type="text"
            className="PersonalSalary_input"
            label="사번/성명"
            variant="outlined"
            size="small"
            onChange={textNameHandle}
          />
        </FormControl>
        <button
          className="PersonalSalary_searchBtn"
          onClick={() => {
            sendSubmit();
          }}
        >
          검색
        </button>
      </div>
      ) : (
        <></>
      )
    }
      
      <div className="PersonalSalary_basicInfo">
        <div className="personalSalary_userInfo">
          <span>기본정보</span>
          <table>
            <tr>
              <th>부서</th>
              <td>{empInfo ? empInfo["deptKR"] : "로딩중"}</td>
            </tr>
            <tr>
              <th>직책</th>
              <td>{empInfo ? empInfo["rankKR"] : "로딩중"}</td>
            </tr>
            <tr>
              <th>성명</th>
              <td>{empInfo ? empInfo["name"] : "로딩중"}</td>
            </tr>
            <tr>
              <th>급여일자</th>
              <td>
                {" "}
                {todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 5일
              </td>
            </tr>
            <tr>
              <th>급여계좌</th>
              <td>{account ? account["ac_number"] : "등록되지 않았습니다."}</td>
            </tr>
          </table>
        </div>
        <div className="PersonalSalary_monthlyGraph">
          
          <ReactApexChart
            options={monthlyBar.options}
            series={monthlyBar.series}
            type="bar"
            height={240}
            width={1210}
          />
        
        </div>
      </div>
      <div className="PersonalSalary_payrollContainer">
        <div className="PersonalSalary_payrollTitle">
          <span>급여현황표</span>
        </div>

        <div className="PersonalSalary_payrollTable">
          <table>
            <thead>
              <tr>
                <td colSpan={2}></td>
                <td>1월</td>
                <td>2월</td>
                <td>3월</td>
                <td>4월</td>
                <td>5월</td>
                <td>6월</td>
                <td>7월</td>
                <td>8월</td>
                <td>9월</td>
                <td>10월</td>
                <td>11월</td>
                <td>12월</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan={2} className='perSal_total'>실수령액</th>
                {
                  defaultMonth.map((item, index) => (
                    <td>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].totalPay) - parseInt(taxPack[searchDate.getFullYear() + item].totalDud)).toLocaleString() : 0}원</td>
                  ))
                }
                
              </tr>
              <tr>
                <th rowSpan={4}>지급내역</th>
                <th>기본급</th>
                {
                  defaultMonth.map((item, index) => (
                    <td className={"perSal_month" + (index + 1)}>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].pay_normal)).toLocaleString() : 0}원</td>
                  ))
                }
              </tr>
              <tr>
                <th>연장근무</th>
                {
                  defaultMonth.map((item, index) => (
                    <td>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].pay_over)).toLocaleString() : 0}원</td>
                  ))
                }
              </tr>
              <tr>
                <th>야간근무</th>
                {
                  defaultMonth.map((item, index) => (
                    <td>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].pay_night)).toLocaleString() : 0}원</td>
                  ))
                }
              </tr>
              <tr>
                <th>휴일근무</th>
                {
                  defaultMonth.map((item, index) => (
                    <td>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].pay_off)).toLocaleString() : 0}원</td>
                  ))
                }
              </tr>
              <tr>
                <th rowSpan={4}>공제내역</th>
                <th>국민연금</th>
                {
                  defaultMonth.map((item, index) => (
                    <td>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].tax_annu)).toLocaleString() : 0}원</td>
                  ))
                }
              </tr>
              <tr>
                <th>건강보험외</th>
                {
                  defaultMonth.map((item, index) => (
                    <td>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].tax_health) + (parseInt(taxPack[searchDate.getFullYear() + item].tax_insure))).toLocaleString() : 0}원</td>
                  ))
                }
              </tr>
              <tr>
                <th>고용보험</th>
                {
                  defaultMonth.map((item, index) => (
                    <td>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].tax_hire)).toLocaleString() : 0}원</td>
                  ))
                }
              </tr>
              <tr>
                <th>근로소득세외</th>
                {
                  defaultMonth.map((item, index) => (
                    <td>{taxPack[searchDate.getFullYear() + item] ? (parseInt(taxPack[searchDate.getFullYear() + item].tax_soduk) + (parseInt(taxPack[searchDate.getFullYear() + item].tax_resi))).toLocaleString() : 0}원</td>
                  ))
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
