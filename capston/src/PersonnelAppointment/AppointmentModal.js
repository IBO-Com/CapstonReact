import React, { useState } from "react";
import "../css/PersonnelAppointment/AppointmentModal.css";
import testimg from "../img/testimg.jpg";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}
const AppointmentModal = ({
  peopleData,
  setPeopleData,
  openModal,
  setOpenModal,
}) => {
  // 사번 성명 인풋
  const [textName, setTextName] = useState("");
  const textNameHandle = (e) => {
    setTextName(e.target.value);

    console.log(e.target.value);
  };

  // 발령일자
  const [startDate, setStartDate] = useState(new Date("2022-10-01"));
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  // 발령구분
  const [selectType, setSelectType] = useState("*");
  const handleSelectType = (event) => {
    setSelectDepart(event.target.value);
  };

  // 부서선택
  const [selectDepart, setSelectDepart] = useState("*");
  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  // 직책선택
  const [selectRank, setSeletRank] = useState("*");
  const handleSelectRank = (event) => {
    setSeletRank(event.target.value);
  };

  // 등록

  const [empData, setEmpData] = useState();
  const [dept, setDept] = useState("");
  const [team, setTeam] = useState("");
  const [rank, setRank] = useState("");
  const [center, setCenter] = useState("");

  // 검색
  const sendSubmit = () => {
    console.log("send submit");
    /* 날짜 포멧 */
    let sYear = String(startDate.getFullYear());
    let sMonth = startDate.getMonth() + 1;
    let sDay = startDate.getDate();

    if (sMonth < 10) {
      sMonth = "0" + sMonth;
    }
    if (sDay < 10) {
      sDay = "0" + sDay;
    }

    let sDate = sYear + sMonth + sDay;

    /* 쿼리 문 작성 */
    let postParam = {};
    let query = {};

    query["startDate"] = sDate;

    if (textName.trim() == "") {
      delete query["sabunOrName"];
    } else {
      query["sabunOrName"] = textName;
    }

    postParam = qs.stringify(query);

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((res) => {
        setEmpData(res.data.ITEMS[0]);
        let empInfo = res.data.ITEMS[0];

        GetCDTR.getCDTR(
          empInfo["center"],
          empInfo["dept"],
          empInfo["team"],
          empInfo["rank"],
          setCenter,
          setDept,
          setTeam,
          setRank
        );
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <div className="AppointmentModal_container">
      <div className="AppointmentModal_title">
        <span>인사발령</span>
        <FormControl>
          <input
            style={{
              lineHeight: "33px",
              width: "170px",
              height: "33px",
              margin: "9px",
            }}
            placeholder="사번 / 성명"
            type="text"
            className="AppointmentModal_input"
            label="사번/성명"
            variant="outlined"
            size="small"
            onChange={textNameHandle}
          />
        </FormControl>
        <button
          className="AppointmentModal_searchBtn"
          onClick={() => {
            sendSubmit();
          }}
        >
          검색
        </button>
      </div>

      <div className="AppointmentModal_userInfo">
        <div className="AppointmentModal_userImg">
          <img className="AppointmentModal_img" src={testimg} alt="이미지" />
        </div>
        <div className="AppointmentModal_infoTable">
          <table>
            <tr>
              <td>사번</td>
              <td>성명</td>
              <td>직책</td>
            </tr>
            <tr>
              <td>{empData ? empData["sabun"] : ""}</td>
              <td>{empData ? empData["name"] : ""}</td>
              <td>{dept}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="AppointmentModal_appointment">
        <span>발령일자</span>
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
        <span className="AppointmentModal_state">발령구분</span>
        <FormControl>
          <Select
            value={selectType || ""}
            onChange={handleSelectType}
            sx={{
              minWidth: "153px",
              height: 39,
              marginLeft: "15px",
              marginRight: "26px",
            }}
          >
            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"*"}>
              전체
            </MenuItem>
            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"1"}>
              부서이동
            </MenuItem>
            <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"22"}>
              승진
            </MenuItem>
          </Select>
        </FormControl>
        <div className="AppointmentModal_table">
          <table>
            <thead>
              <tr>
                <td>발령항목</td>
                <td>발령 전</td>
                <td>발령 후</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>부서</td>
                <td>{dept}</td>
                <td>
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
                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"*"}
                      >
                        전체부서
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"01"}
                      >
                        경영지원부
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"02"}
                      >
                        경영관리부
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"03"}
                      >
                        침해대응부
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"04"}
                      >
                        관제센터
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"05"}
                      >
                        보안연구부
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"06"}
                      >
                        보안취약점연구부
                      </MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>직책</td>
                <td>{rank}</td>
                <td>
                  <FormControl>
                    <Select
                      value={selectRank || ""}
                      sx={{
                        minWidth: "153px",
                        height: 39,
                        marginLeft: "15px",
                        marginRight: "26px",
                      }}
                      onChange={handleSelectRank}
                    >
                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"*"}
                      >
                        사원
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"01"}
                      >
                        대리
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"02"}
                      >
                        과장
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"03"}
                      >
                        차장
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"04"}
                      >
                        부장
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"05"}
                      >
                        이사
                      </MenuItem>

                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"06"}
                      >
                        사장
                      </MenuItem>
                      <MenuItem
                        sx={{ minWidth: "153px", height: 30 }}
                        value={"07"}
                      >
                        대표이사
                      </MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="AppointmentModal_btns">
        <button
          className="AppointmentModal_cancelBtn"
          onClick={() => setOpenModal(false)}
        >
          취소
        </button>
        <button className="AppointmentModal_registerBtn">등록</button>
      </div>
    </div>
  );
};

export default AppointmentModal;
