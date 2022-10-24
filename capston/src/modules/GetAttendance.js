import axios from "axios";
import qs from "qs";

/**
 * Attend정보를 받아오는 함수
 * @param setAttendData useState의 set설정
 */


export const getInfo = (setAttendData) => {
/*    
    let param = qs.stringify({
        start_date: "20221023",
        end_date: "20221025"
    });
*/      
    let param = qs.stringify ({
        work_form : "EW"
    });
    
    
    axios
        .post("http://43.200.115.198:8080/getAttendance.jsp", param)
        .then((response) => { 
            setAttendData(response.data.ITEMS);
            console.log(response.data.ITEMS);
        });
}