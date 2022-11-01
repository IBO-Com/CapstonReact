import React from "react";
import axios from "axios";
import qs from "qs";

let defaultValue = {
    payOver: 1.5, //연장
    payNight: 0.5, //야근 
    payRest: 1.5, //휴일
    np: 0.045, //국민연금
    health:0.03495, //건강보험
    longCare: 0.1227, //장기요양
    emp: 0.009 //고용보험
 }

/**
 * 급여목록을 반환하는 함수
 * @param {*} sabunOrName 사번 혹은 성명 
 * @param {*} retrieveDate 년도-월  ex. 2022-01
 * @param {*} setSalary useState(설정) 연봉
 * @param {*} setDay useState(설정) 일한 일수
 * @param {*} setNormalWorkTime useState(설정) 일반근무 시간
 * @param {*} setOverMoney useState(설정) 연장근무 금액
 * @param {*} setOverWorkTime useState(설정) 연장근무 시간
 * @param {*} setNightMoney useState(설정) 야간근무 금액
 * @param {*} setNightWorkTime useState(설정) 야간근무 시간
 * @param {*} setRestMoney useState(설정) 휴일 금액
 * @param {*} setRestWorkTime useState(설정) 휴일근무 시간
 * @param {*} setNationalPension useState(설정) 국민연금
 * @param {*} setHealthInsurance useState(설정) 건강보험
 * @param {*} setLongCare useState(설정) 건강보험(장기요양)
 * @param {*} setEmploymentInsurance useState(설정) 고용보험
 * @param {*} setIncomTax useState(설정) 근로소득세
 * @param {*} setResidentTax useState(설정) 주민세
 * @param {*} setTotalMoney useState(설정) 총 지급액
 * @param {*} setTotalDeductible useState(설정) 총 공제액
 * @returns 
 */
export const getAllTax = (sabunOrName, retrieveDate, setSalary, setDay, setNormalWorkTime, setOverMoney, setOverWorkTime, setNightMoney, setNightWorkTime, setRestMoney, setRestWorkTime,
    setNationalPension, setHealthInsurance, setLongCare, setEmploymentInsurance, setIncomTax, setResidentTax, setTotalMoney, setTotalDeductible) => {
    /* 쿼리 문 작성 */
    let postParam = {};
    let query = {};

    if (sabunOrName.trim() == '') {
        delete query["sabunOrName"];
        alert("사번/성명을 입력해주세요.");
        return;
    } else {
        query["sabunOrName"] = sabunOrName;
    }

    postParam = qs.stringify(
        query
    );

    axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((res) => { //값 가져오고 없으면 초기화
        let yearMoney = 0;
        let data = res.data.ITEMS;
        if(data.length == 0) {
        alert("사원이 존재하지 않습니다.");
        setTotalDeductible(0);
        setTotalMoney(0);
        setSalary(0);
        setNormalWorkTime(0);
        setOverMoney(0); setOverWorkTime(0);
        setNightMoney(0); setNightWorkTime(0);
        setRestMoney(0); setRestWorkTime(0);
        setDay(0);
        setNationalPension(0);
        setHealthInsurance(0); setLongCare(0);
        setEmploymentInsurance(0);
        setIncomTax(0); setResidentTax(0);
        return;
        }
        /* 기본연금 측정 */
        let postParam2 = {
        rank : data[0].rank
        }

        postParam2 = qs.stringify(postParam2)
        axios.post("http://43.200.115.198:8080/getPayCommon.jsp", postParam2).then((res2) => { // 연봉 데이터
        let data2 = res2.data.ITEMS;
        console.log("Salary Response Data : ", data2);
        yearMoney = (parseInt(data2[0].salary));
        setSalary(parseInt(data2[0].salary));

        let moneyData = Math.floor(data2[0].salary / 12);
        
        
        let postParam = {
            monthPay: parseInt(moneyData)
        }
        postParam = qs.stringify(postParam);
        axios.post("http://43.200.115.198:8080/getIncomTax.jsp", postParam).then((res) => { //근로소득세, 주민세 계산
            let data = res.data.ITEMS;
            setIncomTax(parseInt(data.incomeTax));
            setResidentTax(parseInt(parseInt(data.incomeTax) / 10));
        }).catch((Error) => {
            alert("Error Code : 103");
        })
        moneyData = parseInt(moneyData / 1000) * 1000;

        //연금 계산
        setNationalPension(parseInt(moneyData * defaultValue.np));
        setHealthInsurance(parseInt(moneyData * defaultValue.health));
        setLongCare(parseInt((moneyData * defaultValue.health) * defaultValue.longCare));
        setEmploymentInsurance(parseInt(moneyData * defaultValue.emp));

        /* 근무시간 측정 */
        postParam2 = {
            start_date:(retrieveDate + "01").replace("-", ""),
            retire_date:(retrieveDate + "32").replace("-", ""),
            sabunOrName:sabunOrName
        }
        console.log("OverWOrk Param : ", postParam2);
        postParam2 = qs.stringify(postParam2)
        axios.post("http://43.200.115.198:8080/getAttendanceTime.jsp", postParam2).then((res2) => { 
            let data2 = res2.data.ITEMS;
            let normalTime = parseInt(data2.s_normal_work_time == undefined ? 0 : data2.s_normal_work_time);
            let restTime = parseInt(data2.s_rest_work_time == undefined ? 0 : data2.s_rest_work_time);
            setNormalWorkTime(normalTime); //일반 근무시간
            setRestWorkTime(restTime); //휴일 근무시간
            setRestMoney(Math.floor(((yearMoney / 12 / 209) * defaultValue.payRest * parseFloat(restTime / 60).toFixed(1))));
            console.log("Response Data : ", data2);
        }).catch((Error) => {
            alert("Error Code : 101");
        })
 
        /* 근무 외 시간 측정 */
        axios.post("http://43.200.115.198:8080/getAttendanceOverTime.jsp", postParam2).then((res2) => {
            let data2 = res2.data.ITEMS;
            console.log("OverWork Data : ", data2);
            let overTime = parseInt(data2.s_over_datetime == undefined ? 0 : data2.s_over_datetime);
            setOverWorkTime(overTime); //연장시간
            setOverMoney(Math.floor(((yearMoney / 12 / 209) * defaultValue.payOver * parseFloat(overTime / 60).toFixed(1))));
            
            let nightTime = parseInt(data2.s_night_datetime == undefined ? 0 : data2.s_night_datetime);
            setNightWorkTime(nightTime); //야근시간
            setNightMoney(Math.floor(((yearMoney / 12 / 209) * defaultValue.payNight * parseFloat(nightTime / 60).toFixed(1))));
            setDay(parseInt(data2.day == undefined ? 0 : data2.day)); //일한일수
        }).catch((Error) => {
            alert("Error Code : 102");
        })
        //getAttendanceOverTime.jsp
        }).catch((Error) => {
        alert("Error Code : 100");
        })
    }).catch((Error) => {
        console.log(Error);
    })
}


/**
 * 세금을 Json으로 변경하는 함수
 * @param {*} sabunOrName 사번 혹은 성명 
 * @param {*} retrieveDate 년도-월  ex. 2022-01
 * @param {*} saveData 저장할 데이터
 * @returns 
 */
export const getAllTaxToJson = async(sabunOrName, retrieveDate, saveData) => {
    /* 쿼리 문 작성 */
    let postParam = {};
    let query = {};
    console.log("%c---- File, Function : getFinalTax.js,  getAllTaxToJson ----", 'color: #FF0000');
    if (sabunOrName.trim() == '') {
        delete query["sabunOrName"];
        alert("사번/성명을 입력해주세요.");
        return;
    } else {
        query["sabunOrName"] = sabunOrName;
    }

    postParam = qs.stringify(
        query
    );

    axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((res) => { //값 가져오고 없으면 초기화
        let salary = 0;
        let data = res.data.ITEMS;
        let incomeTax = 0;
        let residentTax = 0;

        if(data.length == 0) {
            return;
        }
        /* 기본연금 측정 */
        let postParam2 = {
            rank : data[0].rank
        }

        postParam2 = qs.stringify(postParam2)
        axios.post("http://43.200.115.198:8080/getPayCommon.jsp", postParam2).then(async(res2) => { // 연봉 데이터
            let data2 = res2.data.ITEMS;
            salary = parseInt(data2[0].salary); //연봉
          
            /* 근무시간 측정 */
            postParam2 = {
                start_date:(retrieveDate + "01").replace("-", ""),
                retire_date:(retrieveDate + "32").replace("-", ""),
                sabunOrName:sabunOrName
            }

            let normalWorkTime = 0;
            let restWorkTime = 0;
            let restMoney = 0;
            postParam2 = qs.stringify(postParam2)
            await axios.post("http://43.200.115.198:8080/getAttendanceTime.jsp", postParam2).then((res2) => { 
                let data2 = res2.data.ITEMS;
                normalWorkTime = parseInt(data2.s_normal_work_time == undefined ? 0 : data2.s_normal_work_time); //일반 근무시간
                restWorkTime = parseInt(data2.s_rest_work_time == undefined ? 0 : data2.s_rest_work_time);
                restMoney = Math.floor(((salary / 12 / 209) * defaultValue.payRest * parseFloat(restWorkTime / 60).toFixed(1)));
                console.log("Response Data : ", data2);
            }).catch((Error) => {
                alert("Error Code : 101");
            })
            console.log("---- data Pass 02 ----");
    
            let overWorkTime = 0;
            let overMoney = 0;
            let nightWorkTime = 0;
            let nightMoney = 0;
            let day = 0;
            /* 근무 외 시간 측정 */
            await axios.post("http://43.200.115.198:8080/getAttendanceOverTime.jsp", postParam2).then((res2) => {
                let data2 = res2.data.ITEMS;
                overWorkTime = parseInt(data2.s_over_datetime == undefined ? 0 : data2.s_over_datetime); //연장시간
                overMoney = Math.floor(((salary / 12 / 209) * defaultValue.payOver * parseFloat(overWorkTime / 60).toFixed(1)));
                console.log("overWork Time : ", overWorkTime);

                nightWorkTime = parseInt(data2.s_night_datetime == undefined ? 0 : data2.s_night_datetime); //야근시간
                nightMoney = Math.floor(((salary / 12 / 209) * defaultValue.payNight * parseFloat(nightWorkTime / 60).toFixed(1)));
                day = parseInt(data2.day == undefined ? 0 : data2.day); //일한일수
            }).catch((Error) => {
                alert("Error Code : 102");
            })


            ///////
            let monthPay = Math.floor((salary / 12 / 209) * 8 * day); //월급

            let postParam = {
                monthPay: parseInt(monthPay)
            }
            postParam = qs.stringify(postParam);
            await axios.post("http://43.200.115.198:8080/getIncomTax.jsp", postParam).then((res) => { //근로소득세, 주민세 계산
                let data = res.data.ITEMS;
                if(Object.keys(data).length == 0) {
                    incomeTax = 0;
                    residentTax = 0;
                } else {
                    incomeTax = parseInt(data.incomeTax);
                    residentTax = (parseInt(parseInt(data.incomeTax) / 10));
                }
            }).catch((Error) => {
                alert("Error Code : 103");
            })
            let moneyData = parseInt(monthPay / 1000) * 1000; //뒷 3자리 0으로 ex. 123456789 -> 123456000

            //연금 계산
            let nationalPension = parseInt(moneyData * defaultValue.np);
            let healthInsurance = parseInt(moneyData * defaultValue.health);
            let longCare = parseInt((moneyData * defaultValue.health) * defaultValue.longCare);
            let employmentInsurance = parseInt(moneyData * defaultValue.emp);


            let totalMoney = overMoney + nightMoney + restMoney + monthPay;
            let totalDeductible = nationalPension + healthInsurance + longCare + employmentInsurance + incomeTax + residentTax;
            
            //16개
            let finalJson = {
                sabunOrName: sabunOrName,
                retrieveDate: retrieveDate,
                day: day,
                연봉: salary,
                월급: monthPay,

                일반근무시간: normalWorkTime,
                연장근무금액: overMoney,
                연장근무시간: overWorkTime,
                야간근무금액: nightMoney,
                야간근무시간: nightWorkTime,
                
                휴일근무금액: restMoney,
                휴일근무시간: restWorkTime,
                국민연금: nationalPension,
                건강보험: healthInsurance,
                장기요양: longCare,
                
                고용보험: employmentInsurance, 
                근로소득세: incomeTax,
                주민세: residentTax,
                총지급액: totalMoney,
                총공제액: totalDeductible,
                
                실수령액: totalMoney - totalDeductible
            }
            console.log(finalJson);
            saveData(finalJson);
            //getAttendanceOverTime.jsp
        }).catch((Error) => {
            alert("Error Code : 100");
        })
    }).catch((Error) => {
        console.log(Error);
    })
}


const monthFormat = (month) => {
    return month < 10 ? "0" + String(month) : String(month)
} 

/**
 * 세금을 Json으로 변경하는 함수
 * @param {*} sabunOrName 사번 혹은 성명 
 * @param {*} retrieveDate 년도  ex. 2022
 * @param {*} saveData 저장할 데이터
 * @returns 
 */
 export const getAllTaxToJsonAllMonth = async(sabunOrName, retrieveDate, saveData) => {
    let finalJson = {};
    /* 쿼리 문 작성 */
    let postParam = {};
    let query = {};
    if (sabunOrName.trim() == '') {
        delete query["sabunOrName"];
        alert("사번/성명을 입력해주세요.");
        return;
    } else {
        query["sabunOrName"] = sabunOrName;
    }

    postParam = qs.stringify(
        query
    );

    axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then(async (res) => { //값 가져오고 없으면 초기화
        for(let i = 1; i <= 12; i ++) { //1월부터 12월까지
            let salary = 0;
            let data = res.data.ITEMS;
            let incomeTax = 0;
            let residentTax = 0;

            if(data.length == 0) {
                return;
            }
            /* 기본연금 측정 */
            let postParam2 = {
                rank : data[0].rank
            }

            postParam2 = qs.stringify(postParam2)
            await axios.post("http://43.200.115.198:8080/getPayCommon.jsp", postParam2).then(async(res2) => { // 연봉 데이터
                let data2 = res2.data.ITEMS;

                salary = parseInt(data2[0].salary); //연봉
                /* 근무시간 측정 */
                postParam2 = {
                    start_date:(retrieveDate + monthFormat(i) + "01").replace("-", ""),
                    retire_date:(retrieveDate + monthFormat(i) + "32").replace("-", ""),
                    sabunOrName:sabunOrName
                }
                let normalWorkTime = 0;
                let restWorkTime = 0;
                let restMoney = 0;
                postParam2 = qs.stringify(postParam2)
                await axios.post("http://43.200.115.198:8080/getAttendanceTime.jsp", postParam2).then((res2) => { 
                    let data2 = res2.data.ITEMS;
                    normalWorkTime = parseInt(data2.s_normal_work_time == undefined ? 0 : data2.s_normal_work_time); //일반 근무시간
                    restWorkTime = parseInt(data2.s_rest_work_time == undefined ? 0 : data2.s_rest_work_time);
                    restMoney = Math.floor(((salary / 12 / 209) * defaultValue.payRest * parseFloat(restWorkTime / 60).toFixed(1)));
                }).catch((Error) => {
                    alert("Error Code : 101");
                })

                let day = 0;
                let overWorkTime = 0;
                let overMoney = 0;
                let nightWorkTime = 0;
                let nightMoney = 0;
                await axios.post("http://43.200.115.198:8080/getAttendanceOverTime.jsp", postParam2).then((res2) => {
                    let data2 = res2.data.ITEMS;
                    overWorkTime = parseInt(data2.s_over_datetime == undefined ? 0 : data2.s_over_datetime); //연장시간
                    overMoney = Math.floor(((salary / 12 / 209) * defaultValue.payOver * parseFloat(overWorkTime / 60).toFixed(1)));

                    nightWorkTime = parseInt(data2.s_night_datetime == undefined ? 0 : data2.s_night_datetime); //야근시간
                    nightMoney = Math.floor(((salary / 12 / 209) * defaultValue.payNight * parseFloat(nightWorkTime / 60).toFixed(1)));
                    day = parseInt(data2.day == undefined ? 0 : data2.day); //일한일수
                }).catch((Error) => {
                    alert("Error Code : 102");
                })

                let monthPay = Math.floor((salary / 12 / 209) * 8 * day); //월급

                let postParam = {
                    monthPay: parseInt(monthPay)
                }
                postParam = qs.stringify(postParam);
                await axios.post("http://43.200.115.198:8080/getIncomTax.jsp", postParam).then((res) => { //근로소득세, 주민세 계산
                    let data = res.data.ITEMS;
                    if(Object.keys(data).length == 0) {
                        incomeTax = 0;
                        residentTax = 0;
                    } else {
                        incomeTax = parseInt(data.incomeTax);
                        residentTax = (parseInt(parseInt(data.incomeTax) / 10));
                    }
                }).catch((Error) => {
                    alert("Error Code : 103");
                })
                let moneyData = parseInt(monthPay / 1000) * 1000; //뒷 3자리 0으로 ex. 123456789 -> 123456000

                let nationalPension = parseInt(moneyData * defaultValue.np);
                let healthInsurance = parseInt(moneyData * defaultValue.health);
                let longCare = parseInt((moneyData * defaultValue.health) * defaultValue.longCare);
                let employmentInsurance = parseInt(moneyData * defaultValue.emp);
        
                let totalMoney = overMoney + nightMoney + restMoney + monthPay;
                let totalDeductible = nationalPension + healthInsurance + longCare + employmentInsurance + incomeTax + residentTax;
                //16개
                let tempJson = {
                    sabunOrName: sabunOrName,
                    retrieveDate: retrieveDate + "-" + monthFormat(i),
                    day: day,
                    연봉: salary,
                    월급: monthPay,

                    일반근무시간: normalWorkTime,
                    연장근무금액: overMoney,
                    연장근무시간: overWorkTime,
                    야간근무금액: nightMoney,
                    야간근무시간: nightWorkTime,
                    
                    휴일근무금액: restMoney,
                    휴일근무시간: restWorkTime,
                    국민연금: nationalPension,
                    건강보험: healthInsurance,
                    장기요양: longCare,
                    
                    고용보험: employmentInsurance, 
                    근로소득세: incomeTax,
                    주민세: residentTax,
                    총지급액: totalMoney,
                    총공제액: totalDeductible,
                    
                    실수령액: totalMoney - totalDeductible
                }
                finalJson[retrieveDate + "-" + monthFormat(i)] = tempJson;
                //getAttendanceOverTime.jsp
            }).catch((Error) => {
                alert("Error Code : 100");
            })   
        }
        if(Object.keys(finalJson).length == 0) {
            saveData(null);
            console.log("save null");
        } else {
            saveData(finalJson);
        }
    }).catch((Error) => {
        console.log(Error);
    })
}