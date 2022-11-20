import qs from "qs";
import axios from "axios";

export const AttendanceRegisterToPay = () => {
  axios.post("http://43.200.115.198:8080/getAttendanceMonth.jsp").then((res)=> {
    let data = res.data.ITEMS;
    let userData = {};
    let keys = Object.keys(data);
    let normalSum = 0;
    console.log(data);
    for (let i = 0; i < keys.length; i++) {
      let eachData = data[i];

      let normal_datetime =
        eachData.normal_datetime === "" ? 0 : parseInt(eachData.normal_datetime);
      let over_datetime =
        eachData.over_datetime === "" ? 0 : parseInt(eachData.over_datetime);
      let night_datetime =
        eachData.night_datetime === "" ? 0 : parseInt(eachData.night_datetime);
      let holiday_datetime =
        eachData.holiday_datetime === ""
          ? 0
          : parseInt(eachData.holiday_datetime);
      let total_datetime =
        normal_datetime + over_datetime + night_datetime + holiday_datetime;
      
      //console.log(eachData.name, normal_datetime, over_datetime, night_datetime, holiday_datetime)
      userData[eachData.sabun] = {
        ...userData[eachData.sabun],
        [eachData.in_date.slice(0, 6)]: {
          normal_datetime: normal_datetime,
          over_datetime: over_datetime,
          night_datetime: night_datetime,
          total_datetime: total_datetime,
          holiday_datetime: holiday_datetime,
          sabun: eachData.sabun,
          indate: eachData.in_date,
          day: eachData.day
        }
      }
      
      
    }

    let postParam = {
      data: JSON.stringify(userData),
      length: Object.keys(userData).length,
    };
    console.log("getAttend Data : ", userData);

    postParam = qs.stringify(postParam);
    
    //http://localhost:8080/CapstonProject/AttendanceRegisterToPay.jsp
    //http://43.200.115.198:8080/AttendanceRegisterToPay.jsp
    
    axios
      .post(
        "http://43.200.115.198:8080/AttendanceRegisterToPay.jsp",
        postParam
      )
      .then((res) => {
        console.log(res);
      })
      .catch((Error) => {
        console.log(Error);
      });
    console.log(userData);
    
    }).catch((Error) => {
      console.log(Error);
    })
  
};

export const dateFormatString = (date) => {
  // 20201010

  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return year + month + day;
};

/**
 * 시작과 끝 날짜를 통해 일한 연도 구하는 함수
 * @param {String} sabun 사번
 * @param {*} saveData 저장 데이터
 */
export const getYearOfWork = (sabun, saveData) => {
  let data = null;
  axios
    .post(
      "http://43.200.115.198:8080/empselect.jsp",
      qs.stringify({
        sabunOrName: sabun,
      })
    )
    .then((res) => {
      data = res.data.ITEMS[0];
      console.log("data : ", data.start_date);
      let startDate = new Date(
        data.start_date.slice(0, 4),
        parseInt(data.start_date.slice(4, 6)) - 1,
        data.start_date.slice(6, 8)
      );
      let endDate =
        data.retire_date == null || data.retire_date == ""
          ? new Date()
          : new Date(
              data.retire_date.slice(0, 4),
              parseInt(data.retire_date.slice(4, 6)) - 1,
              data.retire_date.slice(6, 8)
            );
      let subDate = Math.abs(endDate.getTime() - startDate.getTime());

      let tempDay = subDate / 1000 / 60 / 60 / 24;
      let workDay = parseInt(tempDay % 30);

      let tempMonth = subDate / 1000 / 60 / 60 / 24 / 30;
      let workMonth = parseInt(tempMonth % 12);
      let workYear = parseInt(tempMonth / 12);

      let result = {
        year: workYear,
        month: workMonth,
        day: workDay,
      };

      saveData(result);
      console.log(result);
    })
    .catch((Error) => {
      console.log(Error);
    });
};

/** 
 * 모든 회원의 급여 내역 확인
 * @param {*} year 년도
 * @param {*} dept 부서
 * @param {*} setSaveData 저장 데이터
 * @param {*} setTotalData Total 저장 데이터
 */
export const getPaymentAll = (year, dept, setSaveData, setTotalData) => {
  let postParam = {};
  if(dept == "*") {
    postParam = {
      year: year,
    }
  } else {
    postParam = {
      year: year,
      dept: dept
    }
  }
  console.log("postParam : ", postParam);
  
  let userData = {};
  let totalData = {total:0, "01" : 0, "02" : 0, "03" : 0, "04" : 0, "05" : 0, "06" : 0, "07" : 0, "08" : 0, "09" : 0, "10" : 0, "11" : 0, "12" : 0};
  postParam = qs.stringify(postParam);

  axios.post("http://43.200.115.198:8080/getPayment.jsp", postParam).then((res) => {
    let data = res.data.ITEMS;
    for(let i = 0; i < data.length; i ++) {
      userData[data[i].sabun] = {
        ...userData[data[i].sabun],
        [data[i].month]: data[i]
      }

      totalData[data[i].month] += parseInt(data[i].totalPay) - parseInt(data[i].totalDud);
      totalData["total"] += parseInt(data[i].totalPay) - parseInt(data[i].totalDud);
    }
    setSaveData(userData);
    setTotalData(totalData)
    console.log("totalData : ", totalData);
    console.log("userData : ", userData);
  }).catch((Error) => {
    console.log(Error);
  })
}