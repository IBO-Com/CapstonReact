import React, {useState} from "react";
import "../css/workManage/workManage.css";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Select from "@mui/material/Select";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField } from "@mui/material";
import "../css/HRorganization/HrInfoTable.css";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";

import WorkManageTable from "./workManageTable";
import axios from "axios";
import qs from "qs";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
    const [startDate, setStartDate] = useState(new Date("2020-01-01"));
    const [endDate, setEndDate] = useState(new Date());
  
    const [selectDepart, setSelectDepart] = useState("*");
  
    const [textName, setTextName] = useState("");
    const [peopleData, setPeopleData] = useState();

    const handleStartDateChange = (date) => {
        setStartDate(date);
      };
    
      const handleEndDatetDateChange = (date) => {
        setEndDate(date);
      };
    
      const handleSelectDepart = (event) => {
        setSelectDepart(event.target.value);
      };
    
      const textNameHandle = (e) => {
        setTextName(e.target.value);
        console.log(e.target.value);
      };

      const sendSubmit = () => {
        console.log("send submit")
      }
    
    return (
        <div className="workManage_App">
            <>
            <div className="HRorganization_main">
                <div className="HRorganization_dateBox">
                <span>기준일자</span>

                <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
                    <DatePicker
                    autoOk
                    variant="inline"
                    views={["year", "month", "date"]}
                    format="yyyy-MM-dd"
                    value={startDate}
                    inputVariant="outlined"
                    showTodayButton
                    className="startDate"
                    size="small"
                    todayLabel="오늘"
                    onChange={handleStartDateChange}
                    />
                </MuiPickersUtilsProvider>
                <div className="HRorganization_bar"></div>

                <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
                    <DatePicker
                    autoOk
                    variant="inline"
                    views={["year", "month", "date"]}
                    format="yyyy-MM-dd"
                    value={endDate}
                    inputVariant="outlined"
                    className="startDate"
                    showTodayButton
                    size="small"
                    todayLabel="오늘"
                    onChange={handleEndDatetDateChange}
                    />
                </MuiPickersUtilsProvider>

                <FormControl>
                    <Select
                    value={selectDepart || ""}
                    sx={{
                        minWidth: "153px",
                        height: 39,
                        marginLeft: "15px",
                        marginRight: "26px",
                    }}
                    onChange={handleSelectDepart}
                    >
                    <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"*"}>
                        전체부서
                    </MenuItem>

                    <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"01"}>
                        경영지원부
                    </MenuItem>

                    <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"02"}>
                        경영관리부
                    </MenuItem>

                    <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"03"}>
                        침해대응부
                    </MenuItem>

                    <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"04"}>
                        관제센터
                    </MenuItem>

                    <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"05"}>
                        보안연구부
                    </MenuItem>

                    <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"06"}>
                        보안취약점연구부
                    </MenuItem>
                    </Select>
                </FormControl> 
                    <input
                    style={{
                        lineHeight: "33px",
                        width: "170px",
                        height: "33px"
                    }}
                    placeholder="사번 / 성명"
                    type="text"
                    className="HRorganization_input"
                    label="사번/성명"
                    variant="outlined"
                    size="small"
                    onChange={textNameHandle}
                    />
                <button
                    className="HRorganization_btn"
                    onClick={() => {
                    sendSubmit();
                    }} 
                >
                    검색
                </button>
                </div>
                    
                
                <div className="workManage_contents">
                    <p style={{marginLeft:"62px"}}>근무관리</p>
                    <WorkManageTable/>
                </div>
            </div>
            </>
        </div>
    )
}

export default App;