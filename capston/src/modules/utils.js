import qs from "qs";
import axios from "axios";

export const AttendanceRegisterToPay = (data) => {
  console.log(data);
  let userData = {};
  let keys = Object.keys(data);
  let normalSum = 0;
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
    if (eachData.sabun == "1012210000") {
      normalSum += normal_datetime;
    }
    //console.log(eachData.name, normal_datetime, over_datetime, night_datetime, holiday_datetime)
    if (userData[eachData.sabun]) {
      //데이터 있을 때
      userData[eachData.sabun].cnt += 1;
      userData[eachData.sabun].normal_datetime += normal_datetime;
      userData[eachData.sabun].over_datetime += over_datetime;
      userData[eachData.sabun].night_datetime += night_datetime;
      userData[eachData.sabun].holiday_datetime += holiday_datetime;
      userData[eachData.sabun].total_datetime += total_datetime;
    } else {
      //데이터 없을 때
      userData[eachData.sabun] = {
        cnt: 1,
        indate:
          eachData.in_date.slice(0, 4) + eachData.in_date.slice(5, 7) + "01",
        sabun: eachData.sabun,
        name: eachData.name,
        normal_datetime: normal_datetime,
        over_datetime: over_datetime,
        night_datetime: night_datetime,
        holiday_datetime: holiday_datetime,
        total_datetime: total_datetime,
      };
    }
  }

  let postParam = {
    data: JSON.stringify(userData),
    length: Object.keys(userData).length,
  };
  console.log(userData);

  postParam = qs.stringify(postParam);
  //http://localhost:8080/CapstonProject/AttendanceRegisterToPay.jsp
  //http://43.200.115.198:8080/AttendanceRegisterToPay.jsp
  axios
    .post(
      "http://localhost:8080/CapstonProject/AttendanceRegisterToPay.jsp",
      postParam
    )
    .then((res) => {
      console.log(res);
    })
    .catch((Error) => {
      console.log(Error);
    });
  console.log(userData);
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
