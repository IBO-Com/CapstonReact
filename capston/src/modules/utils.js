export const AttendanceRegisterToPay = (data) => {
    let userData = {};
    let keys = Object.keys(data);
    for(let i = 0; i < keys.length; i ++) {
        let eachData = data[i];

        let normal_datetime = eachData.normal_datetime === "" ? 0 : parseInt(eachData.normal_datetime);
        let over_datetime = eachData.over_datetime === "" ? 0 : parseInt(eachData.over_datetime);
        let night_datetime = eachData.night_datetime === "" ? 0 : parseInt(eachData.night_datetime);
        let holiday_datetime = eachData.holiday_datetime === "" ? 0 : parseInt(eachData.holiday_datetime);
        
        console.log(eachData.name, normal_datetime, over_datetime, night_datetime, holiday_datetime)
        if(userData[eachData.sabun]) { //데이터 있을 때

        } else { //데이터 없을 때 

        }
    }
    console.log(userData);
}