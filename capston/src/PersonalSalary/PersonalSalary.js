import { React, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem } from "@material-ui/core";
import * as GetFinalTax from "../modules/getFinalTax";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";
import ReactApexChart from "react-apexcharts";
import "../css/PersonalSalary/PersonalSalary.css";

const App = () => {
  const [selectDepart, setSelectDepart] = useState("*");
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
  const [center, setCenter] = useState("");
  const [dept, setDept] = useState("");
  const [team, setTeam] = useState("");
  const [empData, setEmpData] = useState();
  const [rank, setRank] = useState("");
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));
  const [taxPack, setTaxPack] = useState();
  const [year, setYear] = useState(new Date().getFullYear())

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    return year + "-" + month;
  }

  const sendSubmit = () => {
    /* 쿼리 문 작성 */
    let postParam = {};
    let query = {};

    if (textName.trim() == "") {
      delete query["sabunOrName"];
    } else {
      query["sabunOrName"] = textName;
    }

    postParam = qs.stringify(query);

    //1월 부터 12월까지 데이터 받아오는 함수
    GetFinalTax.getAllTaxToJsonAllMonth(textName, year, setTaxPack);

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((res) => {
        // setPeopleData(res.data.ITEMS);
        setEmpData(res.data.ITEMS[0]);
        let empInfo = res.data.ITEMS[0];

        GetCDTR.getCDTR(
          empInfo["center"],
          empInfo["dept"],
          empInfo["team"],
          empInfo["rank"],
          setCenter,
          setDept,
          setTeam,
          setRank
        );
      });
  };
  
  useEffect(() => {
    if(!taxPack) return;
    setMonthlyBar(
      {
        series: [
          {
            name: "실수령액",
            data: [
              parseInt(taxPack["2022-01"].실수령액 / 10000), 
              parseInt(taxPack["2022-02"].실수령액 / 10000),
              parseInt(taxPack["2022-03"].실수령액 / 10000),
              parseInt(taxPack["2022-04"].실수령액 / 10000),
              parseInt(taxPack["2022-05"].실수령액 / 10000),
              parseInt(taxPack["2022-06"].실수령액 / 10000),
              parseInt(taxPack["2022-07"].실수령액 / 10000),
              parseInt(taxPack["2022-08"].실수령액 / 10000),
              parseInt(taxPack["2022-09"].실수령액 / 10000),
              parseInt(taxPack["2022-10"].실수령액 / 10000),
              parseInt(taxPack["2022-11"].실수령액 / 10000),
              parseInt(taxPack["2022-12"].실수령액 / 10000),
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
      }
    )
  }, [taxPack]);

  //초기값
  const [monthlyBar, setMonthlyBar] = useState({
    series: [
      {
        name: "실수령액",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      <div className="PersonalSalary_search">
        <FormControl>
          <Select
            value={selectDepart || ""}
            sx={{
              minWidth: "153px",
              height: 39,
              marginLeft: "15px",
              marginRight: "26px",
            }}
            onChange={handleSelectDepart}
          >
            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"*"}>
              전체부서
            </MenuItem>

            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"01"}>
              경영지원부
            </MenuItem>

            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"02"}>
              경영관리부
            </MenuItem>

            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"03"}>
              침해대응부
            </MenuItem>

            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"04"}>
              관제센터
            </MenuItem>

            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"05"}>
              보안연구부
            </MenuItem>

            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"06"}>
              보안취약점연구부
            </MenuItem>
          </Select>
        </FormControl>
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
      <div className="PersonalSalary_basicInfo">
        <div className="personalSalary_userInfo">
          <span>기본정보</span>
          <table>
            <tr>
              <th>부서</th>
              <td>{dept}</td>
            </tr>
            <tr>
              <th>직책</th>
              <td>{rank}</td>
            </tr>
            <tr>
              <th>성명</th>
              <td>{empData ? empData["name"] : ""}</td>
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
              <td> </td>
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
                <td>{taxPack ? taxPack[year + "-01"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-02"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-03"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-04"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-05"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-06"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-07"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-08"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-09"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-10"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-11"].실수령액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-12"].실수령액.toLocaleString() : 0}원</td>
              </tr>
              <tr>
                <th rowSpan={4}>지급내역</th>
                <th>기본급</th>
                <td className="perSal_month1">{taxPack ? taxPack[year + "-01"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month2">{taxPack ? taxPack[year + "-02"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month3">{taxPack ? taxPack[year + "-03"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month4">{taxPack ? taxPack[year + "-04"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month5">{taxPack ? taxPack[year + "-05"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month6">{taxPack ? taxPack[year + "-06"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month7">{taxPack ? taxPack[year + "-07"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month8">{taxPack ? taxPack[year + "-08"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month9">{taxPack ? taxPack[year + "-09"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month10">{taxPack ? taxPack[year + "-10"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month11">{taxPack ? taxPack[year + "-11"].월급.toLocaleString() : 0}원</td>
                <td className="perSal_month12">{taxPack ? taxPack[year + "-12"].월급.toLocaleString() : 0}원</td>
              </tr>
              <tr>
                <th>연장근무</th>
                <td>{taxPack ? taxPack[year + "-01"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-02"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-03"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-04"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-05"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-06"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-07"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-01"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-09"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-10"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-11"].연장근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-12"].연장근무금액.toLocaleString() : 0}원</td>
              </tr>
              <tr>
                <th>야간근무</th>
                <td>{taxPack ? taxPack[year + "-01"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-02"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-03"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-04"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-05"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-06"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-07"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-08"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-09"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-10"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-11"].야간근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-12"].야간근무금액.toLocaleString() : 0}원</td>
              </tr>
              <tr>
                <th>휴일근무</th>
                <td>{taxPack ? taxPack[year + "-01"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-02"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-03"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-04"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-05"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-06"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-07"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-08"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-09"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-10"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-11"].휴일근무금액.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-12"].휴일근무금액.toLocaleString() : 0}원</td>
              </tr>
              <tr>
                <th rowSpan={4}>공제내역</th>
                <th>국민연금</th>
                <td>{taxPack ? taxPack[year + "-01"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-02"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-03"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-04"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-05"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-06"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-07"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-08"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-09"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-10"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-11"].국민연금.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-12"].국민연금.toLocaleString() : 0}원</td>
              </tr>
              <tr>
                <th>건강보험외</th>
                <td>{taxPack ? (taxPack[year + "-01"].건강보험 + taxPack[year + "-01"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-02"].건강보험 + taxPack[year + "-02"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-03"].건강보험 + taxPack[year + "-03"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-04"].건강보험 + taxPack[year + "-04"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-05"].건강보험 + taxPack[year + "-05"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-06"].건강보험 + taxPack[year + "-06"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-07"].건강보험 + taxPack[year + "-07"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-08"].건강보험 + taxPack[year + "-08"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-09"].건강보험 + taxPack[year + "-09"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-10"].건강보험 + taxPack[year + "-10"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-11"].건강보험 + taxPack[year + "-11"].장기요양).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-12"].건강보험 + taxPack[year + "-12"].장기요양).toLocaleString() : 0}원</td>
              </tr>
              <tr>
                <th>고용보험</th>
                <td>{taxPack ? taxPack[year + "-01"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-02"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-03"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-04"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-05"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-06"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-07"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-08"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-09"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-10"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-11"].고용보험.toLocaleString() : 0}원</td>
                <td>{taxPack ? taxPack[year + "-12"].고용보험.toLocaleString() : 0}원</td>
              </tr>
              <tr>
                <th>근로소득세외</th>
                <td>{taxPack ? (taxPack[year + "-01"].근로소득세 + taxPack[year + "-01"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-02"].근로소득세 + taxPack[year + "-02"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-03"].근로소득세 + taxPack[year + "-03"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-04"].근로소득세 + taxPack[year + "-04"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-05"].근로소득세 + taxPack[year + "-05"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-06"].근로소득세 + taxPack[year + "-06"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-07"].근로소득세 + taxPack[year + "-07"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-08"].근로소득세 + taxPack[year + "-08"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-09"].근로소득세 + taxPack[year + "-09"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-10"].근로소득세 + taxPack[year + "-10"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-11"].근로소득세 + taxPack[year + "-11"].주민세).toLocaleString() : 0}원</td>
                <td>{taxPack ? (taxPack[year + "-12"].근로소득세 + taxPack[year + "-12"].주민세).toLocaleString() : 0}원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
