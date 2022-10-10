import React, { useState, useRef } from "react";
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
  const [center, setCenter] = React.useState("H");
  const [dept, setDept] = React.useState("01");
  const [team, setTeam] = React.useState("101");
  const [rank, setRank] = React.useState(1);
  const [dateComeIn, setDateComeIn] = React.useState(new Date());

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
          center: center,
          dept: dept,
          team: team,
          rank: rank,
          dateComeIn: dateComeIn,
        });
        axios.post(url, postParam).then((response) => {
          console.log(response);
        });
      } else {
        
      }
    }
  };

  //일단 하드코딩, 추후 서버에서 가져올것임.
  const center_list = ["경영관리본부", "사이버보안본부", "보안연구본부"];

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
                        <MenuItem value={"H"}>경영관리본부</MenuItem>
                        <MenuItem value={"C"}>사이버보안본부</MenuItem>
                        <MenuItem value={"S"}>보안연구본부</MenuItem>
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
                        <MenuItem value={"01"}>경영지원부</MenuItem>
                        <MenuItem value={"02"}>경영관리</MenuItem>
                        <MenuItem value={"03"}>침해대응부</MenuItem>
                        <MenuItem value={"04"}>관제센터</MenuItem>
                        <MenuItem value={"05"}>보안연구부</MenuItem>
                        <MenuItem value={"06"}>보안취약점연구부</MenuItem>
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
                        <MenuItem value={"101"}>인사관리팀</MenuItem>
                        <MenuItem value={"102"}>마케팅팀</MenuItem>
                        <MenuItem value={"201"}>총무회계팀</MenuItem>
                        <MenuItem value={"202"}>경리팀</MenuItem>
                        <MenuItem value={"301"}>침해대응팀</MenuItem>
                        <MenuItem value={"302"}>위협분석팀</MenuItem>
                        <MenuItem value={"401"}>보안관제팀</MenuItem>
                        <MenuItem value={"402"}>정보보호팀</MenuItem>
                        <MenuItem value={"501"}>연구팀</MenuItem>
                        <MenuItem value={"502"}>연구기획팀</MenuItem>
                        <MenuItem value={"601"}>종합분석팀</MenuItem>
                        <MenuItem value={"602"}>취약점분석팀</MenuItem>
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
