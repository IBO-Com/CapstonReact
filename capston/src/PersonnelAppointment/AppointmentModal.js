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
import * as Utils from "../modules/utils";
import userImg from "../img/user.png";
import { dateTimePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import { useCookies } from "react-cookie";

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

const AppointmentModal = ({
  setOpenModal,
  setAppointmentData,
  openModal,
  startDate,
  endDate,
}) => {
  const [textName, setTextName] = useState("");
  const [_startDate, _setStartDate] = useState(new Date());
  const [selectType, setSelectType] = useState("1");
  const [selectCenter, setSelectCenter] = useState("");
  const [selectDepart, setSelectDepart] = useState("");
  const [selectTeam, setSelectTeam] = useState("");
  const [selectRank, setSeletRank] = useState("1");
  const [rankList, setRankList] = useState("");
  const [picture, setPicture] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [codeData, setCodeData] = useState();
  const [codeName, setCodeName] = useState();
  // 검색
  const [empData, setEmpData] = useState([]);
  const [rData, setRData] = useState();

  function getParametersForUnsplash({ width, height, quality, format }) {
    //이미지 최적화
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}& fit=crop`;
  }

  useEffect(() => {
    sendSubmit(cookies["loginInfo"].id);

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

    axios
      .post(urlCode)
      .then((res) => {
        let data = res.data.ITEMS;
        console.log("data : ", data);
        setCodeName(data);
      })
      .catch((Error) => {});
    Utils.codeNameFiltering(setCodeData);
  }, []);

  useEffect(() => {
    if (empData.length == 0) return;
    setSelectCenter(empData["center"]);
    setSelectDepart(empData["dept"]);
    setSelectTeam(empData["team"]);

    console.log(empData["center"], empData["dept"], empData["team"]);
  }, [empData]);

  const urlGetCls = "http://43.200.115.198:8080/empGetOrg.jsp";
  const urlCode = "http://43.200.115.198:8080/getAllCodeNm.jsp";

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
    let data = event.target.value;
    setSelectCenter(data);
    let key = Object.keys(codeData[data])[0];
    setSelectDepart(key + "-" + data);

    let subKey = key + "-" + codeData[data][key][0];
    setSelectTeam(subKey);
  };

  const handleSelectDepart = (event) => {
    let data = event.target.value;
    setSelectDepart(data);

    let key = data.split("-")[0];
    setSelectTeam(key + "-" + codeData[selectCenter][key][0]);
  };

  const handleSelectTeam = (event) => {
    setSelectTeam(event.target.value);
  };

  const handleSelectRank = (event) => {
    setSeletRank(event.target.value);
  };

  const reLoading = () => {
    console.log("Re Loading");
    /* 날짜 포멧 */
    let sYear = String(startDate.getFullYear());
    let sMonth = startDate.getMonth() + 1;
    let sDay = startDate.getDate();

    let eYear = String(endDate.getFullYear());
    let eMonth = endDate.getMonth() + 1;
    let eDay = endDate.getDate();

    if (sMonth < 10) {
      sMonth = "0" + sMonth;
    }
    if (sDay < 10) {
      sDay = "0" + sDay;
    }

    if (eMonth < 10) {
      eMonth = "0" + eMonth;
    }
    if (eDay < 10) {
      eDay = "0" + eDay;
    }

    let sDate = sYear + sMonth + sDay;
    let eDate = eYear + eMonth + eDay;

    /* 쿼리 문 작성 */
    let postParam2 = {};
    let query = {};

    query["startDate"] = sDate;
    query["endDate"] = eDate;

    postParam2 = qs.stringify(query);

    axios
      .post("http://43.200.115.198:8080/personnelAppointment.jsp", postParam2)
      .then((res) => {
        setAppointmentData(res.data.ITEMS);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  // 등록
  const formRef = useRef();
  const saveBtn = () => {
    if (formRef.current.reportValidity()) {
      if (window.confirm("등록하시겠습니까?")) {
        if (!empData) {
          alert("사원을 찾을 수 없습니다.");
          return;
        }

        let postParm2 = {
          app_sabun: empData.sabun,
          app_name: empData.name,
          app_state: selectType,
          app_rank: selectRank,
          app_date: dateFormatString(_startDate),
          app_dept: selectDepart,
          app_center: selectCenter,
          app_team: selectTeam,
        };
        console.log(postParm2);
        postParm2 = qs.stringify(postParm2);

        axios
          .post("http://43.200.115.198:8080/appointmentregister.jsp", postParm2)
          .then((response) => {
            reLoading();
            console.log(response);
          })
          .catch((Error) => {
            console.log(Error);
          });
      }
    }
  };

  const sendSubmit = async (sabun) => {
    console.log("send submit");

    let postParam = {};
    let query = {};
    if (sabun.trim() == "") {
      delete query["sabunOrName"];
    } else {
      query["sabunOrName"] = sabun;
    }
    console.log("query : ", query);
    let getSabun = "";
    postParam = qs.stringify(query);
    await axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((res) => {
        let _data = res.data.ITEMS[0];
        setEmpData(_data);
        getSabun = _data.sabun;
      });

    let postParam3 = qs.stringify({
      id: getSabun,
    });

    await axios
      .post("http://43.200.115.198:8080/getpicture.jsp", postParam3)
      .then((response) => {
        console.log(response);
        if (response.data.ITEMS.length > 0) {
          setPicture(response.data.ITEMS[0].picture);
        }
        setRData(response.data);
        console.log("사진 : ", picture);
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
            sendSubmit(textName);
          }}
        >
          검색
        </button>
      </div>
      <form ref={formRef}>
        <div className="AppointmentModal_userInfo">
          <div className="AppointmentModal_userImg">
            {picture === null || picture === "" ? (
              <img
                className="ApppointmentModal_empImg"
                src={
                  userImg +
                  getParametersForUnsplash({
                    width: 110,
                    height: 110,
                    quality: 80,
                    format: "png",
                  })
                }
                alt="이미지"
              />
            ) : (
              <img
                className="empimg"
                style={{ width: "110px", height: "150px", borderRadius: "0px" }}
                src={picture}
                alt={"사진"}
              />
            )}
          </div>
          <div className="AppointmentModal_infoTable">
            <table>
              <tr>
                <td>사번</td>
                <td>성명</td>
                <td>직책</td>
              </tr>
              <tr>
                <td>{empData ? empData.sabun : ""}</td>
                <td>{empData ? empData.name : ""}</td>
                <td>{empData ? empData.rankKR : ""}</td>
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
              value={_startDate}
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
                  <td>{empData ? empData["centerKR"] : ""}</td>
                  <td>
                    <FormControl>
                      <Select
                        value={selectCenter}
                        size="small"
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectCenter}
                      >
                        {codeData && codeName ? (
                          Object.keys(codeData).map((item, index) => (
                            <MenuItem value={item}>{codeName[item]}</MenuItem>
                          ))
                        ) : (
                          <> </>
                        )}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>부서</td>
                  <td>{empData ? empData["deptKR"] : ""}</td>
                  <td>
                    <FormControl>
                      <Select
                        value={selectDepart}
                        size="small"
                        fullWidth
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectDepart}
                      >
                        {codeData && codeName && codeData[selectCenter] ? (
                          Object.keys(codeData[selectCenter]).map(
                            (item, index) => (
                              <MenuItem value={item + "-" + selectCenter}>
                                {codeName[item + "-" + selectCenter]}
                              </MenuItem>
                            )
                          )
                        ) : (
                          <> </>
                        )}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>팀</td>
                  <td>{empData ? empData["teamKR"] : ""}</td>
                  <td>
                    <FormControl>
                      <Select
                        value={selectTeam}
                        size="small"
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectTeam}
                      >
                        {codeData &&
                        codeName &&
                        codeData[selectCenter] &&
                        codeData[selectCenter][selectDepart.split("-")[0]] ? (
                          codeData[selectCenter][
                            selectDepart.split("-")[0]
                          ].map((item, index) => (
                            <MenuItem
                              value={selectDepart.split("-")[0] + "-" + item}
                            >
                              {
                                codeName[
                                  selectDepart.split("-")[0] + "-" + item
                                ]
                              }
                            </MenuItem>
                          ))
                        ) : (
                          <></>
                        )}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>직책</td>
                  <td>{empData ? empData["rankKR"] : ""}</td>
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
          발령취소
        </button>
        <button
          className="AppointmentModal_registerBtn"
          onClick={() => {
            saveBtn();
            setOpenModal(false);
          }}
        >
          발령등록
        </button>
      </div>
    </div>
  );
};
export default AppointmentModal;
