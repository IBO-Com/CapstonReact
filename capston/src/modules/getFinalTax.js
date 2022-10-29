import React from "react";
import axios from "axios";
import qs from "qs";

let defaultValue = {
    payOver: 1.5, //연장
    payNight: 1.5, //야근 
    payRest: 1.5, //휴일
    np: 0.045, //국민연금
    health:0.03495, //건강보험
    longCare: 0.1227, //장기요양
    emp: 0.009 //고용보험
 }

const sendSubmit = (sabunOrName, setSalary) => {
    /*
    // 쿼리 문 작성 
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

    axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((res) => {
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
       // 기본연금 측정 
       let postParam2 = {
          rank : data[0].rank
       }

       postParam2 = qs.stringify(postParam2)
       axios.post("http://43.200.115.198:8080/getPayCommon.jsp", postParam2).then((res2) => {
          let data2 = res2.data.ITEMS;
          console.log("Salary Response Data : ", data2);
          setSalaryData(data2[0]);
          setSalary(parseInt(data2[0].salary));

          let moneyData = Math.floor(data2[0].salary / 12);
          moneyData = parseInt(moneyData / 1000) * 1000;
         

          setNationalPension(parseInt(moneyData * defaultValue.np));
          setHealthInsurance(parseInt(moneyData * defaultValue.health));
          setLongCare(parseInt((moneyData * defaultValue.health) * defaultValue.longCare));
          setEmploymentInsurance(parseInt(moneyData * defaultValue.emp));
       }).catch((Error) => {
          console.log(Error);
       })


       // 근무시간 측정 
       postParam2 = {
          start_date:(retrieveDate + "01").replace("-", ""),
          retire_date:(retrieveDate + "32").replace("-", ""),
          sabunOrName:textName
       }

       postParam2 = qs.stringify(postParam2)
       axios.post("http://43.200.115.198:8080/getAttendanceTime.jsp", postParam2).then((res2) => {
          let data2 = res2.data.ITEMS;
          setNormalWorkTime(parseInt(data2.s_normal_work_time)); //일반 근무시간
          setRestWorkTime(parseInt(data2.s_rest_work_time)); //휴일 근무시간
          console.log("Response Data : ", data2);
       }).catch((Error) => {
          console.log(Error);
       })

       // 근무 외 시간 측정 
       axios.post("http://43.200.115.198:8080/getAttendanceOverTime.jsp", postParam2).then((res2) => {
          let data2 = res2.data.ITEMS;
          setOverWorkTime(parseInt(data2.s_over_datetime)); //연장시간
          setNightWorkTime(parseInt(data2.s_night_datetime)); //야근시간
          setDay(parseInt(data2.day)); //일한일수
       }).catch((Error) => {
          console.log(Error);
       })
       //getAttendanceOverTime.jsp
       

    }).catch((Error) => {
       console.log(Error);
    })
    */
 }
