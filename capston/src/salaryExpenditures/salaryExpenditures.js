import { React, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem } from "@material-ui/core";
import * as GetFinalTax from "../modules/getFinalTax";
import axios from "axios";
import qs from "qs";
import ReactApexChart from "react-apexcharts";
import "../css/salaryExpenditures/salaryExpenditures.css";
import * as Utils from "../modules/utils";

const App = () => {
    const [selectDepart, setSelectDepart] = useState("*");
    const handleSelectDepart = (event) => {
        setSelectDepart(event.target.value);
    };
 
    const textNameHandle = (e) => {
        setTextName(e.target.value);
    };

    const [textName, setTextName] = useState("");
    const [usersInfo, setUsersInfo] = useState([]);
    const [payData, setPayData] = useState();
    const [totalData, setTotalData] = useState();
    let defaultMonth = ["01","02","03","04","05","06","07","08","09","10","11","12"];


    useEffect(() => {
        axios
            .post("http://43.200.115.198:8080/empselect.jsp")
            .then((res) => {
                setUsersInfo(res.data.ITEMS);
            })
            .catch((Error) => {
                alert(Error);
            });

        Utils.getPaymentAll(2022, selectDepart, setPayData, setTotalData);
    }, []);

    useEffect(() => {
        if(!totalData) return;
        setMonthlyBar({
            series: [
                {
                    name: "실수령액",
                    data: [
                        parseInt(parseInt(totalData["01"]) / 10000),
                        parseInt(parseInt(totalData["02"]) / 10000),
                        parseInt(parseInt(totalData["03"]) / 10000),
                        parseInt(parseInt(totalData["04"]) / 10000),
                        parseInt(parseInt(totalData["05"]) / 10000),
                        parseInt(parseInt(totalData["06"]) / 10000),
                        parseInt(parseInt(totalData["07"]) / 10000),
                        parseInt(parseInt(totalData["08"]) / 10000),
                        parseInt(parseInt(totalData["09"]) / 10000),
                        parseInt(parseInt(totalData["10"]) / 10000),
                        parseInt(parseInt(totalData["11"]) / 10000),
                        parseInt(parseInt(totalData["12"]) / 10000)
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
        })
    }, [totalData])

    function getFormatDate(date) {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        return year + "-" + month;
    }

    const sendSubmit = async() => {
        let confYear = '2022';
        let postParam = {};
        if(selectDepart != "*") {
            postParam = {
                dept: selectDepart
            }
        }
        postParam = qs.stringify(postParam);
        axios
        .post("http://43.200.115.198:8080/empselect.jsp", postParam)
        .then((res) => {
            setUsersInfo(res.data.ITEMS);
        })
        .catch((Error) => {
            alert(Error);
        });
        Utils.getPaymentAll(2022, selectDepart, setPayData, setTotalData);

    };


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
        <div className="SalaryEx_conatainer">
            <div className="SalaryEx_search">
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
                <button
                    className="SalaryEx_searchBtn"
                    onClick={() => {
                        sendSubmit();
                    }}
                >
                    검색
                </button>
            </div>
            <div className="SalaryEx_basicInfo">

                <div className="SalaryEx_monthlyGraph">

                    <ReactApexChart
                        options={monthlyBar.options}
                        series={monthlyBar.series}
                        type="bar"
                        height={280}
                        width={1560}
                    />

                </div>
            </div>
            <div className="SalaryEx_payrollContainer">
                <div className="SalaryEx_payrollTitle">
                    <span>급여 지출 현황</span>
                </div>

                <div className="SalaryEx_payrollTable">
                    <table>
                        <thead>
                            <tr>
                                <td className="SalaryEx_index">번호</td>
                                <td className="SalaryEx_dept">부서</td>
                                <td className="SalaryEx_rank">직책</td>
                                <td className="SalaryEx_name">성명</td>
                                <td className="SalaryEx_1">1월</td>
                                <td className="SalaryEx_2">2월</td>
                                <td className="SalaryEx_3">3월</td>
                                <td className="SalaryEx_4">4월</td>
                                <td className="SalaryEx_5">5월</td>
                                <td className="SalaryEx_6">6월</td>
                                <td className="SalaryEx_7">7월</td>
                                <td className="SalaryEx_8">8월</td>
                                <td className="SalaryEx_9">9월</td>
                                <td className="SalaryEx_10">10월</td>
                                <td className="SalaryEx_11">11월</td>
                                <td className="SalaryEx_12">12월</td>
                            </tr>
                        </thead>
                        <tbody className="SalaryEx_SecondTable">
                            {usersInfo.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.deptKR}</td>
                                    <td>{item.rankKR}</td>
                                    <td>{item.name}</td>
                                    {
                                        defaultMonth.map((month, index) => (

                                            <td>{payData ? payData[item.sabun] ? 
                                                payData[item.sabun][month] ? (parseInt(payData[item.sabun][month].totalPay) - parseInt(payData[item.sabun][month].totalDud)).toLocaleString() 
                                                : 0 : 0 : 0}원</td>
                                        ))
                                    }
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="SalaryEx_totalFooter">
                                <td className="SalaryEx_total">총 합계</td>
                                <td>{totalData ? parseInt(totalData["total"]).toLocaleString() : 0}원</td>
                                <td></td>
                                <td></td>
                                {
                                    defaultMonth.map((month, index) => (
                                        <td>{
                                            totalData ? parseInt(totalData[month]).toLocaleString() : 0
                                        }원</td>
                                    ))
                                }
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default App;