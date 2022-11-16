export const AttendanceRegisterToPay = (data) => {
    let userData = {};
    let keys = Object.keys(data);
    for(let i = 0; i < keys.length; i ++) {
        let eachData = data[i];

        let normal_datetime = eachData.normal_datetime.trim() === "" ? 0 : parseInt(eachData.normal_datetime);
        
    }
    console.log(userData);
}