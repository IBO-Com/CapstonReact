import React, { useEffect, useRef, useState } from 'react';
import DateFnsUtils from "@date-io/date-fns";
import qs from "qs";
import styles from "../css/emp/empRegister/empRegister.module.css";
import format from "date-fns/format";
import axios from 'axios';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import testimg from "../img/testimg.jpg";
import koLocale from "date-fns/locale/ko";

class koLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
      return format(date, "yyyy년　　 MM월", { locale: this.locale });
    }
  }
  
  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + "-" + month + "-" + day;
  }
  
const HelloBaseTab = () => {
    const formRef = useRef();
  const name = useRef();
  const englishName = useRef();
  const identityNumberF = useRef();
  const identityNumberB = useRef();
  const email = useRef();
  const tel = useRef();
  const address = useRef();
  const [gender, setGender] = useState(0);
  const [married, setMarried] = useState(0);
  const [center, setCenter] = useState("H-경영관리본부");
  const [dept, setDept] = useState("01-경영지원부");
  const [team, setTeam] = useState("101-인사관리팀");
  const [rank, setRank] = useState(1);
  const [rankTest, setRankTest] = useState("");
  const [dateComeIn, setDateComeIn] = useState(getFormatDate(new Date()));


  const urlSave = "http://43.200.115.198:8080/empregister.jsp";
  const urlGetCls = "http://43.200.115.198:8080/empGetRank.jsp";
  //const urlSave = "http://localhost:8080/empregister.jsp";
  //const urlGetCls = "http://localhost:8080/empGetRank.jsp";

  const handleDateChange = (date) => {
    setDateComeIn(getFormatDate(date));
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
    axios.get(urlGetCls).then((response) => {
      setRankTest(response.data.ITEMS);
    });
  }, []);

  useEffect(() => {
    let findDept = Object.keys(center_list[center])[0];
    setDept(findDept);
  }, [center]);

  useEffect(() => {
    let findTeam = center_list[center][dept][0];
    setTeam(findTeam);
  }, [dept]);

  const clickSaveButton = () => {
    if (formRef.current.reportValidity()) {
      if (window.confirm("저장하시겠습니까?")) {
        let postParam = qs.stringify({
          name: name.current.value,
          englishName: englishName.current.value,
          identityNumberFront: identityNumberF.current.value,
          identityNumberBack: identityNumberB.current.value,
          email: email.current.value,
          tel: tel.current.value,
          address: address.current.value,
          gender: gender,
          married: married,
          center: center.split("-")[0],
          dept: dept.split("-")[0],
          team: team.split("-")[0],
          rank: rank,
          dateComeIn: dateComeIn,
        });

        axios.post(urlSave, postParam).then((response) => {
          console.log(response);
          if (response.data.result === "success") {
            alert("저장되었습니다.");
          } else {
            alert("error");
          }
        });
      }
    }
  };

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
    return (
        <div>
                  <Button
            className={styles.buttonStyle}
            style={{
              marginLeft: "auto",
              marginRight: "2.5vw",
              marginTop: "-3px",
            }}
            onClick={() => clickSaveButton()}
            variant="contained"
          >
            저장
          </Button>


          <form ref={formRef}>
        <div className={styles.plzEmp}>
          <div style={{ margin: "auto" }}>
            <table className={styles.empTable}>
              <tbody>
                <tr>
                  <td rowSpan={3} colSpan={2}>
                    <div style={{ display: "flex" }}>
                      <div className={styles.empWrapimg}>
                        <img
                          className={styles.empimg}
                          src={testimg}
                          alt="이미지"
                        />
                      </div>
                      <div className={styles.inputStyle}>
                        <input
                          type="file"
                          style={{
                            display: "none",
                          }}
                          name="profile_img"
                          id="profile_img"
                          accept="image/*"
                          //onChange={(event) => handleFileOnChange(event, "img_1")}
                        />
                        <label
                          className={styles.inputFileButton}
                          for="profile_img"
                        >
                          파일찾기
                        </label>
                      </div>
                    </div>
                  </td>
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
                      InputProps={{ sx: { width: 108, height: 40 } }}
                      inputRef={identityNumberF}
                    />
                    <span>-</span>
                    <TextField
                      required
                      InputProps={{ sx: { width: 108, height: 40 } }}
                      inputRef={identityNumberB}
                    />
                  </td>
                  <td className={styles.tdPaddingLeft}>성별</td>
                  <td>
                    <FormControl>
                      <Select
                        value={gender}
                        sx={{ minWidth: "222px", height: 40 }}
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
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectMarried}
                      >
                        <MenuItem value={0}>미혼</MenuItem>
                        <MenuItem value={1}>기혼</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
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
                        {Object.keys(center_list).map((e, i) => (
                          <MenuItem value={e}>{e.split("-")[1]}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </td>
                  <td>부서</td>
                  <td>
                    <FormControl>
                      <Select
                        value={dept}
                        size="small"
                        fullWidth
                        sx={{ minWidth: "222px", height: 40 }}
                        onChange={handleSelectDept}
                      >
                        {Object.keys(center_list[center]).map((e, i) => (
                          <MenuItem value={e}>{e.split("-")[1]}</MenuItem>
                        ))}
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
                        {center_list[center][dept] ? (
                          center_list[center][dept].map((e, i) => (
                            <MenuItem value={e}>{e.split("-")[1]}</MenuItem>
                          ))
                        ) : (
                          <div></div>
                        )}
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
                        {rankTest.length > 0 ? (
                          rankTest.map((item) => (
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
                  <td>
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
                <tr>
                  <td className={styles.tdPaddingLeft}>
                    <strong className={styles.redStar}>*</strong>주소
                  </td>
                  <td colSpan={5}>
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
        </div>
      </form>
        </div>
    );
};

export default HelloBaseTab;