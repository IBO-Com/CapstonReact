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
    console.log(e.target.value);
  };

  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let toDayDate = now.getDate();

    return todayYear + "-" + todayMonth + "-" + toDayDate;
  };

  const [salary, setSalary] = useState("");
  const [normalWorkTime, setNormalWorkTime] = useState(0); //기본 시간
  const [restWorkTime, setRestWorkTime] = useState(0); //휴일 시간
  const [overWorkTime, setOverWorkTime] = useState(0); //연장시간
  const [nightWorkTime, setNightWorkTime] = useState(0); //야근시간
  const [day, setDay] = useState(0); //일한시간

  const [overMoney, setOverMoney] = useState(0); //연장 돈
  const [nightMoney, setNightMoney] = useState(0); //야근 돈
  const [restMoney, setRestMoney] = useState(0); //휴일 돈
  const [totalMoney, setTotalMoney] = useState(0); //총 금액

  const [nationalPension, setNationalPension] = useState(0); //국민연금
  const [healthInsurance, setHealthInsurance] = useState(0); //건강 보험
  const [longCare, setLongCare] = useState(0); //장기요양
  const [employmentInsurance, setEmploymentInsurance] = useState(0); //고용보험
  const [incomeTax, setIncomTax] = useState(0); //근로소득세
  const [residentTax, setResidentTax] = useState(0); //주민세
  const [totalDeductible, setTotalDeductible] = useState(0); //총 공제액

  const [empData, setEmpData] = useState("");
  const [dept, setDept] = useState("");
  const [team, setTeam] = useState("");
  const [rank, setRank] = useState("");
  const [center, setCenter] = useState("");
  const [textName, setTextName] = useState("");
  const [monthlyPayDebuct, setMonthlyPayDebuct] = useState(false);
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    return year + "-" + month;
  }

  const sendSubmit = () => {
    GetFinalTax.getAllTax(
      textName,
      retrieveDate,
      setSalary,
      setDay,
      setNormalWorkTime,
      setOverMoney,
      setOverWorkTime,
      setNightMoney,
      setNightWorkTime,
      setRestMoney,
      setRestWorkTime,
      setNationalPension,
      setHealthInsurance,
      setLongCare,
      setEmploymentInsurance,
      setIncomTax,
      setResidentTax,
      setTotalMoney,
      setTotalDeductible
    );
    /* 쿼리 문 작성 */
    let postParam = {};
    let query = {};

    if (textName.trim() == "") {
      delete query["sabunOrName"];
    } else {
      query["sabunOrName"] = textName;
    }

    postParam = qs.stringify(query);

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
    //총 공제액
    setTotalDeductible(
      nationalPension +
        healthInsurance +
        longCare +
        employmentInsurance +
        incomeTax +
        residentTax
    );
  }, [
    nationalPension,
    healthInsurance,
    longCare,
    employmentInsurance,
    incomeTax,
    residentTax,
  ]);

  useEffect(() => {
    //총 지급액
    setTotalMoney(overMoney + nightMoney + restMoney + parseInt(salary / 12));
  }, [overMoney, nightMoney, restMoney, salary]);

  const [monthlyBar, setMonthlyBar] = useState({
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
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
        position: "top",
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
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
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
              <td> {rank}</td>
            </tr>
            <tr>
              <th>성명</th>
              <td> {empData["name"]}</td>
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
            width={900}
          />
        </div>
      </div>
      <div className="PersonalSalary_payrollContainer">
        <div className="PersonalSalary_payrollTitle">
          <span>급여현황표</span>
          <button className="PersonalSalary_copyBtn">전월급여복사</button>
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
                <th colSpan={2}>실수령액</th>
                <td>{(totalMoney - totalDeductible).toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th rowSpan={4}>지급내역</th>
                <th>기본급</th>
                <td>{parseInt(salary / 12).toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>연장근무</th>
                <td>{overMoney.toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>야간근무</th>
                <td>{nightMoney.toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>휴일근무</th>
                <td>{restMoney.toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th rowSpan={4}>공제내역</th>
                <th>국민연금</th>
                <td>{nationalPension.toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>건강보험외</th>
                <td>{parseInt(healthInsurance + longCare).toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>고용보험</th>
                <td>{employmentInsurance.toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>근로소득세외</th>
                <td>{(incomeTax + residentTax).toLocaleString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
