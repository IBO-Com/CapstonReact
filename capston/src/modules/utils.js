import qs from "qs";
import axios from "axios";

export const AttendanceRegisterToPay = (data) => {
    let userData = {};
    let keys = Object.keys(data);
    let normalSum = 0;
    for(let i = 0; i < keys.length; i ++) {
        let eachData = data[i];

        let normal_datetime = eachData.normal_datetime === "" ? 0 : parseInt(eachData.normal_datetime);
        let over_datetime = eachData.over_datetime === "" ? 0 : parseInt(eachData.over_datetime);
        let night_datetime = eachData.night_datetime === "" ? 0 : parseInt(eachData.night_datetime);
        let holiday_datetime = eachData.holiday_datetime === "" ? 0 : parseInt(eachData.holiday_datetime);
        let total_datetime = normal_datetime + over_datetime + night_datetime + holiday_datetime;
        if(eachData.sabun == "1012210000") {
            normalSum += normal_datetime;
            console.log(eachData.in_date + " normalData : ", normalSum);
        }
        //console.log(eachData.name, normal_datetime, over_datetime, night_datetime, holiday_datetime)
        if(userData[eachData.sabun]) { //데이터 있을 때
            userData[eachData.sabun].cnt += 1;
            userData[eachData.sabun].normal_datetime += normal_datetime;
            userData[eachData.sabun].over_datetime += over_datetime;
            userData[eachData.sabun].night_datetime += night_datetime;
            userData[eachData.sabun].holiday_datetime += holiday_datetime;
            userData[eachData.sabun].total_datetime += total_datetime;
        } else { //데이터 없을 때 
            userData[eachData.sabun] = {
                cnt: 1,
                indate: eachData.in_date.slice(0, 4) + eachData.in_date.slice(5, 7) + '01',
                sabun: eachData.sabun,
                name: eachData.name,
                normal_datetime: normal_datetime,
                over_datetime: over_datetime,
                night_datetime: night_datetime,
                holiday_datetime: holiday_datetime,
                total_datetime: total_datetime
            }
        }
    }

    let postParam = {
        data: JSON.stringify(userData),
        length: Object.keys(userData).length
    }
    console.log(normalSum);
    console.log(postParam)
    
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/AttendanceRegisterToPay.jsp", postParam).then((res) => {
        console.log(res);
    }).catch((Error) => {
        console.log(Error);
    })
    console.log(userData);
}

export const dateFormatString = (date) => {
    // 20201010

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + month + day;
  };