import qs from "qs";
import axios from "axios";

export const AttendanceRegisterToPay = () => {
  axios
    .post("http://43.200.115.198:8080/getAttendanceMonth.jsp")
    .then((res) => {
      let data = res.data.ITEMS;
      let userData = {};
      let keys = Object.keys(data);
      let normalSum = 0;
      console.log(data);
      for (let i = 0; i < keys.length; i++) {
        let eachData = data[i];

        let normal_datetime =
          eachData.normal_datetime === ""
            ? 0
            : parseInt(eachData.normal_datetime);
        let over_datetime =
          eachData.over_datetime === "" ? 0 : parseInt(eachData.over_datetime);
        let night_datetime =
          eachData.night_datetime === ""
            ? 0
            : parseInt(eachData.night_datetime);
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
            day: eachData.day,
          },
        };
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
    })
    .catch((Error) => {
      console.log(Error);
    });
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
  if (dept == "*") {
    postParam = {
      year: year,
    };
  } else {
    postParam = {
      year: year,
      dept: dept,
    };
  }
  console.log("postParam : ", postParam);

  let userData = {};
  let totalData = {
    total: 0,
    "01": 0,
    "02": 0,
    "03": 0,
    "04": 0,
    "05": 0,
    "06": 0,
    "07": 0,
    "08": 0,
    "09": 0,
    10: 0,
    11: 0,
    12: 0,
  };
  postParam = qs.stringify(postParam);

  axios
    .post("http://43.200.115.198:8080/getPayment.jsp", postParam)
    .then((res) => {
      let data = res.data.ITEMS;
      for (let i = 0; i < data.length; i++) {
        userData[data[i].sabun] = {
          ...userData[data[i].sabun],
          [data[i].month]: data[i],
        };

        totalData[data[i].month] +=
          parseInt(data[i].totalPay) - parseInt(data[i].totalDud);
        totalData["total"] +=
          parseInt(data[i].totalPay) - parseInt(data[i].totalDud);
      }
      setSaveData(userData);
      setTotalData(totalData);
      console.log("totalData : ", totalData);
      console.log("userData : ", userData);
    })
    .catch((Error) => {
      console.log(Error);
    });
};

const getPay = (data, userData) => {
  //퇴직금
  let before0Pay = parseInt(data.before0Pay);
  let before1Pay = parseInt(data.before1Pay);
  let before2Pay = parseInt(data.before2Pay);

  let before0Month = data.before0Month;
  let before1Month = data.before1Month;
  let before2Month = data.before2Month;

  let lastDay0Month = new Date(
    before0Month.slice(0, 4),
    before0Month.slice(4, 6),
    0
  ).getDate();
  let lastDay1Month = new Date(
    before1Month.slice(0, 4),
    before1Month.slice(4, 6),
    0
  ).getDate();
  let lastDay2Month = new Date(
    before2Month.slice(0, 4),
    before2Month.slice(4, 6),
    0
  ).getDate();

  let beforeTotal = before0Pay + before1Pay + before2Pay;
  let daySalary = (before0Pay / 209) * 8; //하루 일당
  let etcPay = 0;

  let totalDay = lastDay0Month + lastDay1Month + lastDay2Month;
  if (totalDay < 92) {
    let difDay = 92 - totalDay;
    etcPay = parseInt(difDay * daySalary);
  } else if (totalDay == 92) {
    etcPay = 0;
  }

  let startDate = new Date(
    userData.start_date.slice(0, 4),
    userData.start_date.slice(4, 6),
    userData.start_date.slice(6, 8)
  );
  let endDate = new Date(
    userData.retire_date.slice(0, 4),
    userData.retire_date.slice(4, 6),
    userData.retire_date.slice(6, 8)
  );

  let diffDate = startDate.getTime() - endDate.getTime();
  let diffDay = Math.abs(diffDate / (1000 * 60 * 60 * 24));
  let year = parseInt(diffDay / 30 / 12); //근속 년수

  let avgPay = parseInt(
    parseInt((beforeTotal + etcPay) / 92) * 30 * (diffDay / 365)
  );
  if (year == 0) {
    avgPay = 0;
  }

  let returnData = {
    totalPay: before0Pay + before1Pay + before2Pay,
    retirePay: avgPay,
    lastDay0Month: lastDay0Month,
    lastDay1Month: lastDay1Month,
    lastDay2Month: lastDay2Month,
    totalDay: totalDay,
    etcPay: etcPay,
  };
  return returnData;
};

const getPayAllow = (data, userData) => {
  //퇴직수당
  let startDate = new Date(
    userData.start_date.slice(0, 4),
    userData.start_date.slice(4, 6),
    userData.start_date.slice(6, 8)
  );
  let endDate = new Date(
    userData.retire_date.slice(0, 4),
    userData.retire_date.slice(4, 6),
    userData.retire_date.slice(6, 8)
  );

  let diffDate = startDate.getTime() - endDate.getTime();
  let diffDay = Math.abs(diffDate / (1000 * 60 * 60 * 24));

  let year = parseInt(diffDay / 30 / 12); //근속 년수
  if (year == 0) {
    return 0;
  }
  let ratio = 0.5;
  if (year <= 4) {
    ratio = 0.5;
  } else if (year >= 5) {
    ratio = 1;
  }

  let lastPay = parseInt(data.before0Pay);
  let allow = lastPay * year * ratio;
  return allow;
};

const getPayTax = (retirePay, userData) => {
  //퇴직소득세
  let startDate = new Date(
    userData.start_date.slice(0, 4),
    userData.start_date.slice(4, 6),
    userData.start_date.slice(6, 8)
  );
  let endDate = new Date(
    userData.retire_date.slice(0, 4),
    userData.retire_date.slice(4, 6),
    userData.retire_date.slice(6, 8)
  );

  let diffDate = startDate.getTime() - endDate.getTime();
  let diffDay = Math.abs(diffDate / (1000 * 60 * 60 * 24));
  let year = parseInt(diffDay / 30 / 12); //근속 년수

  if (year == 0) {
    //1년이 안되었을 때
    return 0;
  }
  //기본값 테스트
  //year = 20;
  //retirePay = 100000000;

  let incomeDud = 0;
  //퇴직소득공제
  if (year <= 5) {
    //5년 이하
    incomeDud = year * 300000;
  } else if (year <= 10) {
    //10년 이하
    incomeDud = 1500000 + (year - 5) * 500000;
  } else if (year <= 20) {
    //20년 이하
    incomeDud = 4000000 + (year - 10) * 800000;
  }
  console.log("퇴직소득공제 : ", incomeDud);

  //환산 급여
  let convertedSalary = ((retirePay - incomeDud) * 12) / year;
  console.log("환산 급여 : ", convertedSalary);

  let convertedSalaryDud = 0;
  if (convertedSalary <= 8000000) {
    convertedSalaryDud = 0;
  } else if (convertedSalary <= 70000000) {
    convertedSalaryDud = 8000000 + (convertedSalary - 8000000) * 0.6;
  } else if (convertedSalary <= 100000000) {
    convertedSalaryDud = 45200000 + (convertedSalary - 70000000) * 0.55;
  }
  console.log("환산 급여 공제 : " + convertedSalaryDud);

  //과세 표준
  let taxBase = convertedSalary - convertedSalaryDud;
  console.log("과세 표준 : ", taxBase);

  //환산산출세액
  let calculatedTaxAmount = 0;
  if (taxBase <= 12000000) {
    calculatedTaxAmount = taxBase * 0.06;
  } else if (taxBase <= 46000000) {
    calculatedTaxAmount = taxBase * 0.15 - 1080000;
  } else if (taxBase <= 88000000) {
    calculatedTaxAmount = taxBase * 0.24 - 5220000;
  } else if (taxBase <= 150000000) {
    calculatedTaxAmount = taxBase * 0.35 - 14900000;
  } else if (taxBase <= 300000000) {
    calculatedTaxAmount = taxBase * 0.38 - 19400000;
  } else if (taxBase <= 500000000) {
    calculatedTaxAmount = taxBase * 0.4 - 25400000;
  } else {
    calculatedTaxAmount = taxBase * 0.42 - 35400000;
  }
  console.log("환산산출세액 : ", calculatedTaxAmount);

  //산출세액
  let taxAmount = 0;
  taxAmount = (calculatedTaxAmount / 12) * year;
  console.log("산출세액 : ", taxAmount);

  return taxAmount;
};

export const getRetirePayment = (sabun, saveData) => {
  let returnData = {};
  let userData = null;
  axios
    .post(
      "http://43.200.115.198:8080/empselect.jsp",
      qs.stringify({
        sabunOrName: sabun,
      })
    )
    .then((retRes) => {
      userData = retRes.data.ITEMS[0];
      let startDate = new Date(
        userData.start_date.slice(0, 4),
        userData.start_date.slice(4, 6),
        userData.start_date.slice(6, 8)
      );
      let endDate = new Date(
        userData.retire_date.slice(0, 4),
        userData.retire_date.slice(4, 6),
        userData.retire_date.slice(6, 8)
      );

      let diffDate = startDate.getTime() - endDate.getTime();
      let diffDay = Math.abs(diffDate / (1000 * 60 * 60 * 24));
      let year = parseInt(diffDay / 30 / 12); //근속 년수

      let postParam = {
        sabun: sabun,
      };
      postParam = qs.stringify(postParam);

      axios
        .post("http://43.200.115.198:8080/getRetirePayment.jsp", postParam)
        .then((res) => {
          let data = res.data.ITEMS[0];
          let retirePayJson = getPay(data, userData); //퇴직금
          let retireAllow = parseInt(getPayAllow(data, userData)); //퇴직수당
          let retireTax = parseInt(
            getPayTax(retirePayJson.retirePay + retireAllow, userData)
          ); //퇴직소득세

          returnData = {
            ...data,
            ...retirePayJson,
            retireAllow: retireAllow,
            retireTax: retireTax,
          };
          console.log("리턴 데이터 : ", returnData);
          saveData(returnData);
        })
        .then((Error) => {
          console.log(Error);
        });
    })
    .catch((Error) => {
      console.log(Error);
    });
};

export const codeNameFiltering = async(saveData) => {
  
  let center = {};
  let dept = {};
  let team = {};
  let result = {};

  await axios.post("http://43.200.115.198:8080/getAllCodeNm.jsp", qs.stringify({
    code_cls: "003"
  })).then((res) => {
    let data = res.data.ITEMS;
    let keys = Object.keys(data);
    
    keys.map((item, index) => {
      team[item.split("-")[0]] = []
    })

    keys.map((item, index) => {
      team[item.split("-")[0]].push(item.split("-")[1])
    })

    console.log("team : ", team);
  }).catch((Error) => {
    console.log(Error);
  })

  await axios.post("http://43.200.115.198:8080/getAllCodeNm.jsp", qs.stringify({
    code_cls: "002"
  })).then((res) => {
    let data = res.data.ITEMS;
    let keys = Object.keys(data);
    
    keys.map((item, index) => {
      dept[item.split("-")[1]] = []
    })

    keys.map((item, index) => {
      dept[item.split("-")[1]].push(item.split("-")[0]);
     
      result[item.split("-")[1]] = {
        ...result[item.split("-")[1]],
        [item.split("-")[0]]: team[item.split("-")[0]]
      }
    })

    console.log("dept : ", dept);
    console.log("result : ", result);
    saveData(result);
  }).catch((Error) => {
    console.log(Error);
  })

}