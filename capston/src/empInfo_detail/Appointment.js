import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import qs from "qs";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import "../css/empinfo/Appointment.css";
const Appointment = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [tableList, setTableList] = useState("*");
  const [appointment, setAppointment] = useState([]);

  const handleTableList = (event) => {
    setTableList(event.target.value);
  };
  useEffect(() => {
    let loginInfo = cookies["loginInfo"];

    let postParam = {
      sabun: loginInfo.id  
    }

    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getAppointment.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      setAppointment(data);
    }).catch((Error) => {
      console.log(Error);
    })
    

  }, []);

  return (
    <div className="Appointment_main">
      <div className="Appointment_header">
        <span>발령</span>
        <FormControl  size="small">
          <Select
            value={tableList || ""}
            sx={{
              minWidth: "153px",
              marginLeft: "15px",
              marginRight: "26px",
            }}
            onChange={handleTableList}>

          <MenuItem value={"*"}>
            전체
          </MenuItem>
          </Select>
        </FormControl>
        

      </div>

      <div className="Appointment_Table">
        <table>
            <thead>
                <tr>
                    <td>번호</td>
                    <td>발령구분</td>
                    <td>발령일자</td>
                    <td>발령소속</td>
                    <td>직책</td>
                </tr>
            </thead>
            <tbody>
              {
                appointment.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.app_state == "1" ? "부서이동" : "승진"}</td>
                      <td>{item.app_date.slice(0, 4) + "년 " + item.app_date.slice(4, 6) + "월 " + item.app_date.slice(6, 8) + "일"}</td>
                      <td>{item.deptKR}</td>
                      <td>{item.rankKR}</td>
                  </tr>
                  )
                })
              }
                
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
