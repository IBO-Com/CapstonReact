import React, { useEffect, useRef, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import qs from "qs";
import styles from "../css/emp/empRegister/empRegister.module.css";
import format from "date-fns/format";
import axios from "axios";
import KakaoAddressApi from "./KakaoAddressAPI";
import { useCookies } from "react-cookie";
import * as Utils from "../modules/utils";

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import testimg from "../img/user.png";
import koLocale from "date-fns/locale/ko";
import * as Cookie from "../cookies/cookies";
import Postcode from "react-daum-postcode";
import { border } from "@mui/system";

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
  const [cookies, setCookie, removeCookie] = useCookies();
  const formRef = useRef();
  const name = useRef();
  const englishName = useRef();
  const identityNumberF = useRef();
  const identityNumberB = useRef();
  const email = useRef();
  const tel = useRef();
  const address_detail = useRef();
  const address = useRef();
  const postcode = useRef();
  const salary = useRef();
  const [gender, setGender] = useState(0);
  const [married, setMarried] = useState(0);
  const [center, setCenter] = useState("H");
  const [dept, setDept] = useState("01-H");
  const [team, setTeam] = useState("01-101");
  const [rank, setRank] = useState("1");
  const [dateComeIn, setDateComeIn] = useState(getFormatDate(new Date()));
  const [rankList, setRankList] = useState("");
  const [isModal, setModal] = useState(false); //주소찾기 모달
  const [codeData, setCodeData] = useState();
  const [codeName, setCodeName] = useState();
  const [picture, setPicture] = useState({
    img_base64: "",
    img: "",
  });

  const urlCode = "http://43.200.115.198:8080/getAllCodeNm.jsp";
  const urlSave = "http://43.200.115.198:8080/empregister.jsp";
  const urlGetCls = "http://43.200.115.198:8080/empGetOrg.jsp";
  //const urlSave = "http://localhost:8080/empregister.jsp";
  //const urlGetCls = "http://localhost:8080/empGetOrg.jsp";

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
    let data = event.target.value;
    setCenter(data);
    let key = Object.keys(codeData[data])[0];
    setDept(key + "-" + data);

    let subKey = key + "-" + codeData[data][key][0];
    setTeam(subKey);
    
  };
  const handleSelectDept = (event) => {
    let data = event.target.value;
    setDept(data);
    
    let key = data.split("-")[0];
    setTeam(key + "-" + codeData[center][key][0]);
    
  };
  const handleSelectTeam = (event) => {
    setTeam(event.target.value);
  };
  const handleSelectRank = (event) => {
    console.log(event.target.value);
    setRank(event.target.value);
  };
  const handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    if (file !== undefined) {
      reader.onloadend = () => {
        setPicture({
          img_base64: file,
          img: reader.result,
        });
        console.log("[이미지]");
        console.log({
          img_base64: testimg,
          img: reader.result,
        });
        console.log(reader.resultStrin);
      };
      reader.readAsDataURL(file);
    }
  };

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

    axios.post(urlCode).then((res) => {
      let data = res.data.ITEMS;
      console.log("data : ",  data);
      setCodeName(data);
    }).catch((Error) => {

    })
    Utils.codeNameFiltering(setCodeData);
    
  }, []);

  const clickSaveButton = () => {
    if (formRef.current.reportValidity()) {
      if (window.confirm("저장하시겠습니까?")) {
        let update_date = dateComeIn;
        update_date = update_date.replace("-", "");
        update_date = update_date.replace("-", "");

        let postParam = {
          name: name.current.value,
          englishName: englishName.current.value,
          identityNumberFront: identityNumberF.current.value,
          identityNumberBack: identityNumberB.current.value,
          email: email.current.value,
          tel: tel.current.value,
          address: address.current.value,
          address_detail: address_detail.current.value,
          postcode: postcode.current.value,
          gender: gender,
          married: married,
          center: center,
          dept: dept,
          team: team,
          rank: rank,
          dateComeIn: dateComeIn,
          loginId: Cookie.getCookie("empInfo").id,
          img_base64: picture.img,
          salary: salary.current.value,
          update_date: update_date,
        };
        console.log("전송 : ", postParam);
        postParam = qs.stringify(postParam);

        axios.post(urlSave, postParam).then((response) => {
          console.log(response);
          if (response.data.result === "success") {
            setCookie("empRegister_userInfo", {
              authority: "0",
              id: response.data.sabun,
              name: name.current.value,
            });
            alert("저장되었습니다.");
          } else {
            alert("error");
          }
        });
      }
    }
  };

  return (
    <div>
      {isModal ? (
        <KakaoAddressApi
          setModal={setModal}
          address={address}
          postcode={postcode}
        />
      ) : (
        <></>
      )}

      <Button
        style={{
          marginLeft: "92%",
          marginRight: "2.5vw",
          marginTop: "-90px",
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
                        {picture.img === "" ? (
                          <>
                            <img
                              className={styles.empimg}
                              src={testimg}
                              alt="이미지1"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              className={styles.empimg}
                              src={picture.img}
                              alt="이미지2"
                            />
                          </>
                        )}
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
                          onChange={(event) => handleFileOnChange(event)}
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
                      type={"password"}
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
                      
                      {
                        codeData && codeName ? (
                          Object.keys(codeData).map((item, index) => (
                            <MenuItem value={item}>{codeName[item]}</MenuItem>
                          ))
                        ) : (
                          <> </>
                        )
                      }
                  
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
                      {
                        codeData && codeName && codeData[center] ? (
                            Object.keys(codeData[center]).map((item, index) => (
                            <MenuItem value={item +"-" + center}>{codeName[item +"-" + center]}</MenuItem>
                            )
                          )
                        ) : (
                          <> </>
                        )
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
                        codeData && codeName && codeData[center] && codeData[center][dept.split("-")[0]] ? (
                          codeData[center][dept.split("-")[0]].map((item, index) => (
                            <MenuItem value={dept.split("-")[0] + "-"  + item}>{codeName[dept.split("-")[0] + "-" + item]}</MenuItem>
                          ))
                        ) : (
                          <></>
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
                    <strong className={styles.redStar}>*</strong>우편번호
                  </td>
                  <td colSpan={1}>
                    <TextField
                      required
                      InputProps={{ sx: { height: 40 } }}
                      fullWidth
                      inputRef={postcode}
                    />
                  </td>
                  <td>
                    <Button
                      style={{
                        width: "80px",
                        height: "40px",
                        color: "white",
                        backgroundColor: "#1976d2",
                        border: "0px",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      주소 찾기
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdPaddingLeft}>
                    <strong className={styles.redStar}>*</strong>도로명 주소
                  </td>
                  <td colSpan={3}>
                    <TextField
                      required
                      InputProps={{ sx: { height: 40 } }}
                      fullWidth
                      inputRef={address}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdPaddingLeft}>
                    <strong className={styles.redStar}>*</strong>상세 주소
                  </td>
                  <td colSpan={3}>
                    <TextField
                      required
                      InputProps={{ sx: { height: 40 } }}
                      fullWidth
                      inputRef={address_detail}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdPaddingLeft}>
                    <strong className={styles.redStar}>*</strong>연봉
                  </td>
                  <td>
                    <TextField
                      required
                      InputProps={{ sx: { height: 40 } }}
                      fullWidth
                      inputRef={salary}
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
