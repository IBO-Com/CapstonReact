import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import testimg from "../img/testimg.jpg";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import styles from "../css/emp/empRegister/empRegister.module.css";
import FormControl from "@mui/material/FormControl";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import koLocale from "date-fns/locale/ko";
import DateFnsUtils from "@date-io/date-fns";
import qs from "qs";
import format from "date-fns/format";


class koLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
      return format(date, "yyyy년　　 MM월", { locale: this.locale });
    }
  }

const App = () => {
    const url = "http://43.200.115.198:8080/empselect.jsp";
    const [dateComeIn, setDateComeIn] = React.useState(new Date());

    useEffect(() => {
        //데이터가 없으면 비어둘것
        let postParam = qs.stringify({
            startDate: '20221117',
            retireDate: '20221120',
            sabunOrName: 'TEST유저',
            dept: '02'
          });

          axios.post(url, postParam).then((response) => {
            console.log(response);
          });
    }, []);

    function getFormatDate(date) {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        var day = date.getDate(); //d
        day = day >= 10 ? day : "0" + day; //day 두자리로 저장
        return year + "-" + month + "-" + day;
    }
      

    const handleDateChange = (date) => {
        setDateComeIn(getFormatDate(date));
        console.log(dateComeIn);
      };

  return (
    <div>
        <div className="EmpSelect_header">
        <div className="EmpSelect_inputForm">
        <div>
            <MuiPickersUtilsProvider 
                utils={koLocalizedUtils}
                locale={koLocale}
            >
            <DatePicker
                autoOk
                variant="inline"
                views={["year", "month", "date"]}
                format="yyyy-MM-dd"
                value={dateComeIn}
                inputVariant="outlined"
                showTodayButton
                size="small"
                todayLabel="오늘"
                onChange={handleDateChange}
            />

            <DatePicker
                autoOk
                variant="inline"
                views={["year", "month", "date"]}
                format="yyyy-MM-dd"
                value={dateComeIn}
                inputVariant="outlined"
                showTodayButton
                size="small"
                todayLabel="오늘"
                onChange={handleDateChange}
            />
            </MuiPickersUtilsProvider>
        </div>
       
        </div>
        
        </div>
        
    </div>
  );
};

export default App;