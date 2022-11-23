import React, { useState, useRef, useEffect } from "react";
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

const dateFormatString = (date) => {
  // 20201010

  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return year + month + day;
};

const AppointmentModal = ({ setOpenModal }) => {
  const [textName, setTextName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [selectType, setSelectType] = useState("*");
  const [selectCenter, setSelectCenter] = useState("H-경영관리본부");
  const [selectDepart, setSelectDepart] = useState("01-경영지원부");
  const [selectTeam, setSelectTeam] = useState("101-인사관리팀");
  const [selectRank, setSeletRank] = useState("1");
  const [rankList, setRankList] = useState("");

  useEffect(() => {
    let array_center = [];
    let array_dept = [];
    let array_team = [];
    let array_rank = [];

    axios.get(urlGetCls).then((response) => {
      for (let i = 0; i < response.data.ITEMS.length; i++) {
        let items = response.data.ITEMS[i];
        if (items.cls == "001") {
          array_center.push(items.code_cd + "-" + items.code_nm);
        } else if (items.cls == "002") {
          array_dept.push(items.code_cd + "-" + items.code_nm);
        } else if (items.cls == "003") {
          array_team.push(items.code_cd + "-" + items.code_nm);
        } else if (items.cls == "004") {
          array_rank.push(items);
        }
      }
      setRankList(array_rank);
    });
  }, []);

  useEffect(() => {
    let findDept = Object.keys(center_list[selectCenter])[0];
    setSelectDepart(findDept);
  }, [selectCenter]);

  useEffect(() => {
    let findTeam = center_list[selectCenter][selectDepart][0];
    setSelectTeam(findTeam);
  }, [selectDepart]);

  const center_list = {
    "H-경영관리본부": {
      "01-경영지원부": ["101-인사관리팀", "102-마케팅팀"],
      "02-경영관리부": ["201-총무회계팀", "202-경리팀"],
    },
    "C-사이버보안본부": {
      "03-침해대응부": ["301-침해대응팀", "302-위협분석팀"],
      "04-관제센터": ["401-보안관제팀", "402-정보보호팀"],
    },
    "S-보안연구본부": {
      "05-보안연구부": ["501-연구팀", "502-연구기획팀"],
      "06-보안취약점분석부": ["601-종합분석팀", "602-취약점분석팀"],
    },
  };

  const urlGetCls = "http://43.200.115.198:8080/empGetOrg.jsp";

  const textNameHandle = (e) => {
    setTextName(e.target.value);
    console.log(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleSelectType = (event) => {
    setSelectType(event.target.value);
  };

  const handleSelectCenter = (event) => {
    setSelectCenter(event.target.value);
  };

  const handleSelectDepart = (event) => {
    setSelectDepart(event.target.value);
  };

  const handleSelectTeam = (event) => {
    setSelectTeam(event.target.value);
  };

  const handleSelectRank = (event) => {
    setSeletRank(event.target.value);
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
          app_dept: selectDepart.split("-")[0],
          app_center: selectCenter.split("-")[0],
          app_team: selectTeam.split("-")[0],
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
                        value={selectCenter}
                        size="small"
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectCenter}
                      >
                        {Object.keys(center_list).map((e, i) => (
                          <MenuItem value={e}>{e.split("-")[1]}</MenuItem>
                        ))}
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
                        value={selectDepart}
                        size="small"
                        fullWidth
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectDepart}
                      >
                        {Object.keys(center_list[selectCenter]).map((e, i) => (
                          <MenuItem value={e}>{e.split("-")[1]}</MenuItem>
                        ))}
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
                        value={selectTeam}
                        size="small"
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectTeam}
                      >
                        {center_list[selectCenter][selectDepart] ? (
                          center_list[selectCenter][selectDepart].map(
                            (e, i) => (
                              <MenuItem value={e}>{e.split("-")[1]}</MenuItem>
                            )
                          )
                        ) : (
                          <div></div>
                        )}
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
                        value={selectRank}
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectRank}
                      >
                        {rankList.length > 0 ? (
                          rankList.map((item) => (
                            <MenuItem value={item.code_cd}>
                              {item.code_nm}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={1} />
                        )}
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
