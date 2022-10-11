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

function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "-" + month + "-" + day;
}

function EmpRegister() {
  const formRef = React.useRef();
  const name = useRef();
  const englishName = useRef();
  const identityNumber = useRef();
  const email = useRef();
  const tel = useRef();
  const address = useRef();
  const [gender, setGender] = React.useState(0);
  const [married, setMarried] = React.useState(0);
  const [center, setCenter] = React.useState("H-경영관리본부");
  const [dept, setDept] = React.useState("01-경영지원부");
  const [team, setTeam] = React.useState("101-인사관리팀");
  const [rank, setRank] = React.useState(1);
  const [dateComeIn, setDateComeIn] = React.useState(getFormatDate(new Date()));


  const url = "http://43.200.115.198:8080/empregister.jsp";
  //const url = "http://localhost:8080/empregister.jsp";

  const handleDateChange = (date) => {
    setDateComeIn(getFormatDate(date));
    console.log(dateComeIn);
  };
  const handleSelectGender = (event) => {
    setGender(event.target.value);
  };
  const handleSelectMarried = (event) => {
    setMarried(event.target.value);
  };
  const handleSelectCenter = (event) => {
    setCenter(event.target.value);
  };
  const handleSelectDept = (event) => {
    setDept(event.target.value);
  };
  const handleSelectTeam = (event) => {
    setTeam(event.target.value);
  };
  const handleSelectRank = (event) => {
    setRank(event.target.value);
  };

  useEffect(() => {
    let findDept = Object.keys(center_list[center])[0];
    setDept(findDept);
  }, [center])

  useEffect(() => {
    let findTeam = center_list[center][dept][0];
    setTeam(findTeam);
  }, [dept])

  const clickSaveButton = () => {
    if (formRef.current.reportValidity()) {
      if (window.confirm("저장하시겠습니까?")) {
        let postParam = qs.stringify({
          name: name.current.value,
          englishName: englishName.current.value,
          identityNumber: identityNumber.current.value,
          email: email.current.value,
          tel: tel.current.value,
          address: address.current.value,
          gender: gender,
          married: married,
          center: center.split('-')[0],
          dept: dept.split('-')[0],
          team: team.split('-')[0],
          rank: rank,
          dateComeIn: dateComeIn,
        });

        console.log("query : ", postParam);
        axios.post(url, postParam).then((response) => {
          console.log(response);
        });
      } else {
        
      }
    }
  };

  //일단 하드코딩, 추후 서버에서 가져올것임.
  //- 하드코딩이 나을 것 같아요!

  const center_list = {
    "H-경영관리본부": {
      "01-경영지원부": ["101-인사관리팀", "102-마케팅팀"],
      "02-경영관리부": ["201-총무회계팀", "202-경리팀"]
    },
    "C-사이버보안본부":{
      "03-침해대응부": ["301-침해대응팀", "302-위협분석팀"],
      "04-관제센터": ["401-보안관제팀", "402-정보보호팀"]
    },
    "S-보안연구본부": {
      "05-보안연구부": ["501-연구팀", "502-연구기획팀"],
      "06-보안취약점분석부":["601-종합분석팀", "602-취약점분석팀"]
    }};

  return (
    <div className="empInfo">
      <div className={styles.empLine}>
        <hr className="empFirstLine" align="left"></hr>
        <div className="empTabFlex">
          <div class="empBasic">인사기본</div>
          <div class="account">계좌</div>
        </div>
        <hr className="empFirstLine" align="left"></hr>
        <p className={styles.basicContents}>
          기본사항
          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              float: "right",
              marginRight: "2vw",
              backgroundColor: "#3875DE",
              color: "#FFFFFF",
            }}
            onClick={() => clickSaveButton()}
            variant="contained"
          >
            저장
          </Button>
        </p>

        <hr className={styles.basicLine}></hr>
        <form ref={formRef}>
          <div className="plzEmp">
            <div>
              <div className="empWrapimg">
                <img className="empimg" src={testimg} alt="이미지" />
              </div>
            </div>
            <div className="nameAnddept">
              <p className="empinfoName">김 명 지</p>
              <p className="empinfoDept">일단냅둠</p>
            </div>

            <div className="empBox">
              <table className={styles.empFirstTable}>
                <colgroup>
                  <col width="20%" />
                  <col width="30%" />
                  <col width="20%" />
                  <col width="30%" />
                </colgroup>
                <tbody className={styles.empinfoList}>
                  <tr>
                    <td>
                      <strong className={styles.redStar}>*</strong>성명
                    </td>
                    <td>
                      <TextField
                        InputProps={{ sx: { height: 40 } }}
                        required
                        inputRef={name}
                      />
                    </td>
                    <td className={styles.tdPaddingLeft}>영문 성명</td>
                    <td>
                      <TextField
                        inputRef={englishName}
                        InputProps={{ sx: { height: 40 } }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className={styles.redStar}>*</strong>주민등록번호
                    </td>
                    <td>
                      <TextField
                        required
                        InputProps={{ sx: { height: 40 } }}
                        inputRef={identityNumber}
                      />
                    </td>
                    <td className={styles.tdPaddingLeft}>성별</td>
                    <td>
                      <FormControl>
                        <Select
                          value={gender}
                          sx={{ minWidth: "200px", height: 40 }}
                          onChange={handleSelectGender}
                        >
                          <MenuItem value={0}>남성</MenuItem>
                          <MenuItem value={1}>여성</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className={styles.redStar}>*</strong>이메일
                    </td>
                    <td>
                      <TextField
                        required
                        InputProps={{ sx: { height: 40 } }}
                        inputRef={email}
                      />
                    </td>
                    <td className={styles.tdPaddingLeft}>결혼여부</td>
                    <td>
                      <FormControl>
                        <Select
                          value={married}
                          sx={{ minWidth: "200px", height: 40 }}
                          onChange={handleSelectMarried}
                        >
                          <MenuItem value={0}>미혼</MenuItem>
                          <MenuItem value={1}>기혼</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="plzEmp">
            <table className={styles.empBodyTable}>
              <colgroup>
                <col width="10%" />
                <col width="20%" />
                <col width="10%" />
                <col width="20%" />
                <col width="10%" />
                <col width="20%" />
              </colgroup>
              <tbody className={styles.empinfoList}>
                <tr>
                  <td className={styles.tdPaddingLeft}>본부</td>
                  <td>
                    <FormControl>
                      <Select
                        value={center}
                        size="small"
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectCenter}
                      >
                        {
                          Object.keys(center_list).map((e, i) => (
                              <MenuItem value={e}>{e.split('-')[1]}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </td>
                  <td className={styles.tdPaddingLeft}>부서</td>
                  <td>
                    <FormControl>
                      <Select
                        value={dept}
                        size="small"
                        fullWidth
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectDept}
                      >
                        {
                          Object.keys(center_list[center]).map((e, i) => (
                            <MenuItem value={e}>{e.split('-')[1]}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </td>
                  <td className={styles.tdPaddingLeft}>팀구분</td>
                  <td>
                    <FormControl>
                      <Select
                        value={team}
                        size="small"
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectTeam}
                      >
                        {
                          center_list[center][dept] ? (
                            center_list[center][dept].map((e, i) => (
                              <MenuItem value={e}>{e.split('-')[1]}</MenuItem>
                            ))
                          ) : (
                           <div></div>
                          )
                        }
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdPaddingLeft}>직급</td>
                  <td>
                    <FormControl>
                      <Select
                        value={rank}
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectRank}
                      >
                        <MenuItem value={1}>사원</MenuItem>
                        <MenuItem value={2}>대리</MenuItem>
                        <MenuItem value={3}>과장</MenuItem>
                        <MenuItem value={4}>차장</MenuItem>
                        <MenuItem value={5}>부장</MenuItem>
                        <MenuItem value={6}>이사</MenuItem>
                        <MenuItem value={7}>상무</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                  <td className={styles.tdPaddingLeft}>
                    <strong className={styles.redStar}>*</strong>연락처
                  </td>
                  <td>
                    <TextField
                      required
                      InputProps={{ sx: { height: 40 } }}
                      inputRef={tel}
                    />
                  </td>
                  <td className={styles.tdPaddingLeft}>
                    <strong className={styles.redStar}>*</strong>입사일
                  </td>
                  <td>
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
                    </MuiPickersUtilsProvider>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="plzEmp">
            <table className={styles.empAddressTable}>
              <colgroup>
                <col width="10%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <td className={styles.tdPaddingLeft}>
                    <strong className={styles.redStar}>*</strong>주소
                  </td>
                  <td>
                    <TextField
                      required
                      InputProps={{ sx: { height: 40 } }}
                      fullWidth
                      inputRef={address}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(EmpRegister);
