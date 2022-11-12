import React, { useState, useRef } from "react";
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
const AppointmentModal = ({ setOpenModal }) => {
  // 사번 성명 인풋
  const [textName, setTextName] = useState("");
  const textNameHandle = (e) => {
    setTextName(e.target.value);
    console.log(e.target.value);
  };

  // 발령일자
  const [startDate, setStartDate] = useState(new Date());
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // 발령구분
  const [selectType, setSelectType] = useState("*");
  const handleSelectType = (event) => {
    setSelectType(event.target.value);
  };

  // 본부선택
  const [selectCenter, setSelectCenter] = useState("H");
  const handleSelectCenter = (event) => {
    setSelectCenter(event.target.value);
  };

  // 부서선택
  const [selectDepart, setSelectDepart] = useState("01");
  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  // 팀 선택
  const [selectTeam, setSelectTeam] = useState("101");
  const handleSelectTeam = (event) => {
    setSelectTeam(event.target.value);
  };

  // 직책선택
  const [selectRank, setSeletRank] = useState("1");
  const handleSelectRank = (event) => {
    setSeletRank(event.target.value);
  };

  const dateFormatString = (dateString) => {
    let year = dateString.getFullYear();
    let month =
      dateString.getMonth() < 10
        ? "0" + (dateString.getMonth() + 1)
        : dateString.getMonth() + 1;
    let day =
      dateString.getDate() < 10
        ? "0" + dateString.getDate()
        : dateString.getDate()();
    return year + "" + month + "" + day;
  };

  // 등록
  const formRef = useRef();
  const saveBtn = () => {
    if (formRef.current.reportValidity()) {
      if (window.confirm("등록하시겠습니까?")) {
        let postParm2 = {
          app_sabun: empData.sabun,
          app_name: empData.name,
          app_state: selectType,
          app_rank: selectRank,
          app_date: dateFormatString(startDate),
          app_dept: selectDepart,
          app_center: selectCenter,
          app_team: selectTeam,
        };
        console.log(postParm2);
        postParm2 = qs.stringify(postParm2);

        axios
          .post("http://43.200.115.198:8080/appointmentregister.jsp", postParm2)
          .then((response) => {
            console.log(response);
          })
          .catch((Error) => {
            console.log(Error);
          });
      }
    }
  };

  // 검색
  const [empData, setEmpData] = useState([]);
  const [dept, setDept] = useState("");
  const [team, setTeam] = useState("");
  const [rank, setRank] = useState("");
  const [center, setCenter] = useState("");

  const sendSubmit = () => {
    console.log("send submit");

    let postParam = {};
    let query = {};
    if (textName.trim() == "") {
      delete query["sabunOrName"];
    } else {
      query["sabunOrName"] = textName;
    }
    console.log("query : ", query);
    postParam = qs.stringify(query);
    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((res) => {
        setEmpData(res.data.ITEMS[0]);
        let empInfo = res.data.ITEMS[0];
        console.log("data : ", empInfo);
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
      <form ref={formRef}>
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
                <td>{rank}</td>
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
              <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"2"}>
                승진
              </MenuItem>
            </Select>
          </FormControl>
          <div className="AppointmentModal_table">
            <table>
              <thead>
                <tr>
                  <td style={{ width: "120px" }}>발령항목</td>
                  <td style={{ width: "120px" }}>발령 전</td>
                  <td>발령 후</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>본부</td>
                  <td>{center}</td>
                  <td>
                    <FormControl>
                      <Select
                        value={selectCenter || ""}
                        sx={{
                          minWidth: "153px",
                          height: 39,
                          marginLeft: "15px",
                          marginRight: "26px",
                        }}
                        onChange={handleSelectCenter}
                      >
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"H"}
                        >
                          경영관리본부
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"C"}
                        >
                          사이버보안본부
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"S"}
                        >
                          보안연구본부
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
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
                  <td>팀</td>
                  <td>{team}</td>
                  <td>
                    <FormControl>
                      <Select
                        value={selectTeam || ""}
                        sx={{
                          minWidth: "153px",
                          height: 39,
                          marginLeft: "15px",
                          marginRight: "26px",
                        }}
                        onChange={handleSelectTeam}
                      >
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"101"}
                        >
                          인사관리팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"102"}
                        >
                          마케팅팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"201"}
                        >
                          총무회계팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"202"}
                        >
                          경리팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"301"}
                        >
                          침해대응팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"302"}
                        >
                          위협분석팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"401"}
                        >
                          보안관제팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"402"}
                        >
                          정보보호팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"501"}
                        >
                          연구팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"502"}
                        >
                          연구기획팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"601"}
                        >
                          종합분석팀
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"602"}
                        >
                          취약점분석팀
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
                          value={"1"}
                        >
                          사원
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"2"}
                        >
                          대리
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"3"}
                        >
                          과장
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"4"}
                        >
                          차장
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"5"}
                        >
                          부장
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"6"}
                        >
                          이사
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"7"}
                        >
                          사장
                        </MenuItem>
                        <MenuItem
                          sx={{ minWidth: "153px", height: 30 }}
                          value={"8"}
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
      </form>

      <div className="AppointmentModal_btns">
        <button
          className="AppointmentModal_cancelBtn"
          onClick={() => setOpenModal(false)}
        >
          취소
        </button>
        <button
          className="AppointmentModal_registerBtn"
          onClick={() => {
            saveBtn();
            setOpenModal(false);
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
};
export default AppointmentModal;
