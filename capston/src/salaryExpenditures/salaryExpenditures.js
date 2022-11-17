import { React, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem } from "@material-ui/core";
import * as GetFinalTax from "../modules/getFinalTax";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";
import ReactApexChart from "react-apexcharts";
import "../css/salaryExpenditures/salaryExpenditures.css";

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
    const [salaryEx, setSalaryEx] = useState([]);
    const [loading, setLoading] = useState({});

    const [JanTax, setJanTax] = useState({usersTotalMoney: 0}); //1월
    const [FebTax, setFebTax] = useState({usersTotalMoney: 0}); //2월
    const [MarTax, setMarTax] = useState({usersTotalMoney: 0}); //3월
    const [AprTax, setAprTax] = useState({usersTotalMoney: 0}); //4월
    const [MayTax, setMayTax] = useState({usersTotalMoney: 0}); //5월
    const [JunTax, setJunTax] = useState({usersTotalMoney: 0}); //6월
    const [JulTax, setJulTax] = useState({usersTotalMoney: 0}); //7월
    const [AugTax, setAugTax] = useState({usersTotalMoney: 0}); //8월
    const [SepTax, setSepTax] = useState({usersTotalMoney: 0}); //9월
    const [OctTax, setOctTax] = useState({usersTotalMoney: 0}); //10월
    const [NovTax, setNovTax] = useState({usersTotalMoney: 0}); //11월
    const [DecTax, setDecTax] = useState({usersTotalMoney: 0}); //12월


    useEffect(() => {
        axios
            .post("http://43.200.115.198:8080/salaryEx.jsp")
            .then((res) => {
                setSalaryEx(res.data.ITEMS);
            })
            .catch((Error) => {
                alert("급여지출현황 오류!!");
            });
    }, []);

    useEffect(() => {
        if(!OctTax) return;
    }, [OctTax, NovTax])

    function getFormatDate(date) {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        return year + "-" + month;
    }

    const sendSubmit = async() => {
        let confYear = '2022';

        setLoading({opacity:0.5});
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0101', confYear + '0132', setJanTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0201', confYear + '0232', setFebTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0301', confYear + '0332', setMarTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0401', confYear + '0432', setAprTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0501', confYear + '0532', setMayTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0601', confYear + '0632', setJunTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0701', confYear + '0732', setJulTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0801', confYear + '0832', setAugTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '0901', confYear + '0932', setSepTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '1001', confYear + '1032', setOctTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '1101', confYear + '1132', setNovTax);
        await GetFinalTax.getAllTaxToJsonFast('', confYear + '1201', confYear + '1232', setDecTax);
        setLoading({});
    };


    useEffect(() => {
        if (!DecTax) return;
        setMonthlyBar(
            {
                series: [
                    {
                        name: "실수령액",
                        data: [
                            parseInt(JanTax.usersTotalMoney / 10000),
                            parseInt(FebTax.usersTotalMoney / 10000),
                            parseInt(MarTax.usersTotalMoney / 10000),
                            parseInt(AprTax.usersTotalMoney / 10000),
                            parseInt(MayTax.usersTotalMoney / 10000),
                            parseInt(JunTax.usersTotalMoney / 10000),
                            parseInt(JulTax.usersTotalMoney / 10000),
                            parseInt(AugTax.usersTotalMoney / 10000),
                            parseInt(SepTax.usersTotalMoney / 10000),
                            parseInt(OctTax.usersTotalMoney / 10000),
                            parseInt(NovTax.usersTotalMoney / 10000),
                            parseInt(DecTax.usersTotalMoney / 10000)
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
    }, [DecTax]);

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
        <div className="SalaryEx_conatainer" style={loading}>
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
                            {salaryEx.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.deptKR}</td>
                                    <td>{item.rankKR}</td>
                                    <td>{item.name}</td>
                                    <td>{JanTax[item.name] ? JanTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{FebTax[item.name] ? FebTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{MarTax[item.name] ? MarTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{AprTax[item.name] ? AprTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{MayTax[item.name] ? MayTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{JunTax[item.name] ? JunTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{JulTax[item.name] ? JulTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{AugTax[item.name] ? AugTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{SepTax[item.name] ? SepTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{OctTax[item.name] ? OctTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{NovTax[item.name] ? NovTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                    <td>{DecTax[item.name] ? DecTax[item.name].finalUserMoney.toLocaleString() : 0}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="SalaryEx_totalFooter">
                                <td colSpan={4} className="SalaryEx_total">총 합계</td>
                                <td>
                                  {
                                    (JanTax.usersTotalMoney + 
                                    FebTax.usersTotalMoney + 
                                    MarTax.usersTotalMoney + 
                                    AprTax.usersTotalMoney + 
                                    MayTax.usersTotalMoney + 
                                    JunTax.usersTotalMoney + 
                                    JulTax.usersTotalMoney + 
                                    AugTax.usersTotalMoney + 
                                    SepTax.usersTotalMoney + 
                                    OctTax.usersTotalMoney +
                                    NovTax.usersTotalMoney +
                                    DecTax.usersTotalMoney).toLocaleString()
                                  }
                                </td>
                                <td></td>
                                <td></td>
                                <td>{JanTax ? JanTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{FebTax ? FebTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{MarTax ? MarTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{AprTax ? AprTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{MayTax ? MayTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{JunTax ? JunTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{JulTax ? JulTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{AugTax ? AugTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{SepTax ? SepTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{OctTax ? OctTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{NovTax ? NovTax.usersTotalMoney.toLocaleString() : 0}</td>
                                <td>{DecTax ? DecTax.usersTotalMoney.toLocaleString() : 0}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default App;