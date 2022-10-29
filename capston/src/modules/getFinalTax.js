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

        postParam2 = qs.stringify(postParam2)
        axios.post("http://43.200.115.198:8080/getAttendanceTime.jsp", postParam2).then((res2) => { 
            let data2 = res2.data.ITEMS;
            setNormalWorkTime(parseInt(data2.s_normal_work_time)); //일반 근무시간
            setRestWorkTime(parseInt(data2.s_rest_work_time)); //휴일 근무시간
            setRestMoney(Math.floor(((yearMoney / 12 / 209) * defaultValue.payRest * parseFloat(parseInt(data2.s_rest_work_time) / 60).toFixed(1))));
            console.log("Response Data : ", data2);
        }).catch((Error) => {
            alert("Error Code : 101");
        })

        /* 근무 외 시간 측정 */
        axios.post("http://43.200.115.198:8080/getAttendanceOverTime.jsp", postParam2).then((res2) => {
            let data2 = res2.data.ITEMS;
            setOverWorkTime(parseInt(data2.s_over_datetime)); //연장시간
            setOverMoney(Math.floor(((yearMoney / 12 / 209) * defaultValue.payOver * parseFloat(parseInt(data2.s_over_datetime) / 60).toFixed(1))));
            
            setNightWorkTime(parseInt(data2.s_night_datetime)); //야근시간
            setNightMoney(Math.floor(((yearMoney / 12 / 209) * defaultValue.payNight * parseFloat(parseInt(data2.s_night_datetime) / 60).toFixed(1))));
            setDay(parseInt(data2.day)); //일한일수
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
