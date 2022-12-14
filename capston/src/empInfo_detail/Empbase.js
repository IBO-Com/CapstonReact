import React, { useEffect, useRef, useState } from "react";
import "../css/Empbase/Empbase.css";
import { Checkbox } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import qs from "qs";
import * as Utils from "../modules/utils";

const Empbase = ({ userData, setUserData, defaultYear }) => {
  const [startDate, setStartDate] = useState(new Date()); //입사일
  //const [groupStartDate, setGroupStartDate] = useState(new Date()); //그룹입사일
  const [birthDate, setBirthDate] = useState(new Date()); //생년월일
  const [foreign, setForeign] = useState("0"); //외국인 여부
  const [married, setMarried] = useState("0"); //결혼 여부
  const [cookies, setCookie, removeCookie] = useCookies();

  const nameRef = useRef(); //이름
  const nameEngRef = useRef(); //영어이름
  const genderRef = useRef(); //성별
  const identityLRef = useRef(); //주민번호 왼쪽
  const identityRRef = useRef(); //주민번호 오른쪽
  const retireClsRef = useRef(); //재직상태
  const centerRef = useRef(); //본부명
  const salaryRef = useRef(); //연봉
  const emailRef = useRef(); //이메일
  const phone1Ref = useRef(); //휴대전화 1
  const phone2Ref = useRef(); //휴대전화 2
  const phone3Ref = useRef(); //휴대전화 3
  const companyPhone1Ref = useRef(); //사내번호 1
  const companyPhone2Ref = useRef(); //사내번호 2
  const companyPhone3Ref = useRef(); //사내번호 3
  const addressRef = useRef(); //도로명주소
  const addressDetailRef = useRef(); //상세주소
  const postcodeRef = useRef(); //우편번호

  const dateFormatString = (date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + month + day;
  };

  function inputNumberFormat(obj) {
    obj.target.value = comma(uncomma(obj.target.value));
  }

  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  }

  const saveBtnHandler = () => {
    let today = new Date();
    let postParam = {
      sabun: userData["sabun"],
      name: nameRef.current.value,
      eng_name: nameEngRef.current.value,
      birth: dateFormatString(birthDate),
      gender: genderRef.current.value,
      identity: identityLRef.current.value + identityRRef.current.value,
      retire_cls: retireClsRef.current.value == "재직" ? "0" : "1",
      start_date: dateFormatString(startDate),
      foreign: foreign,
      married: married,
      email: emailRef.current.value,
      phone:
        phone1Ref.current.value +
        phone2Ref.current.value +
        phone3Ref.current.value,
      companyPhone:
        companyPhone1Ref.current.value +
        companyPhone2Ref.current.value +
        companyPhone3Ref.current.value,
      address: addressRef.current.value,
      address_detail: addressDetailRef.current.value,
      postcode: postcodeRef.current.value,
      salary: salaryRef.current.value.replace(/\,/g, ""),
      today: String(today.getFullYear()) + String(parseInt(today.getMonth()) + 1) + String(today.getDate())
    };
    console.log("postParam : ", postParam);
    postParam = qs.stringify(postParam);
    axios
      .post("http://43.200.115.198:8080/updateEmployee.jsp", postParam)
      .then((res) => {
        if (res.data == "error\r\n") {
          alert("오류가 발생했습니다.");
        } else {
          alert("저장이 완료되었습니다.");
          Utils.AttendanceRegisterToPay();
          //수정 후 데이터 리로드
          axios
            .post(
              "http://43.200.115.198:8080/empselect.jsp",
              qs.stringify({
                sabunOrName: userData["sabun"],
              })
            )
            .then((res2) => {
              setUserData(res2.data.ITEMS[0]);
              console.log("reload Data : ", res2.data.ITEMS[0]);
            })
            .catch((Error) => {
              console.log("Error : ", Error);
            });
        }
      })
      .catch((Error) => {
        console.log("Error : ", Error);
      });
  };

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      let identityBase = userData["identity"].slice(6, 7);
      let year = "19";
      if (identityBase == "1" || identityBase == "2") {
        year = "19";
      } else {
        year = "20";
      }
      let birthYear = year + userData["identity"].slice(0, 2);
      let birthMonth = parseInt(userData["identity"].slice(2, 4)) - 1;
      let birthDay = userData["identity"].slice(4, 6);

      console.log(birthYear, birthMonth, birthDay);
      setBirthDate(new Date(birthYear, birthMonth, birthDay));

      let sd = userData["start_date"];
      setStartDate(
        new Date(sd.slice(0, 4), parseInt(sd.slice(4, 6)) - 1, sd.slice(6, 8))
      );
      setForeign(userData["foreign"]);
      setMarried(userData["married"]);
    }
  }, [userData]);

  function retireConfirm() {
    console.log();
  }

  return Object.keys(userData).length > 0 ? (
    <div
      className="baseInfo"
      style={{
        marginTop: "10px",
        marginLeft: "100px",
        marginRight: "10px",
        overflowX: "hidden",
        overflowY: "auto",
        height: "470px",
      }}
    >
      {cookies["loginInfo"].authority == "1" ? ( //관리자일때
        <>
          <div>
            <button
              style={{
                marginBottom: "5px",
                paddingBottom: "5px",
                paddingTop: "5px",
                height: "36px",
                width: "97px",
                backgroundColor: "#537AAA",
                border: "none",
                borderRadius: "2px",
                color: "white",
              }}
              className="card_search_btn"
              onClick={() => {
                saveBtnHandler();
              }}
            >
              저장
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      <span className="baseRead">기본사항</span>
      <div className="info_base_div">
        <div className="info_base_first info_box">
          <div className="info_margin">
            성명
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <input
                ref={nameRef}
                className="empbase_input"
                Value={userData["name"]}
              ></input>
            ) : (
              <span>{userData["name"]}</span>
            )}
          </div>

          <div className="info_margin">
            성별
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <select
                ref={genderRef}
                className="empbase_select"
                value={userData["gender"]}
                onChange={(e) => {
                  setUserData({ ...userData, gender: e.target.value });
                }}
              >
                <option value="0">남자</option>
                <option value="1">여자</option>
              </select>
            ) : (
              <span>{userData["gender"] == "0" ? "남자" : "여자"}</span>
            )}
          </div>
          <div
            className="info_margin"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div>그룹입사일</div>
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <div>
                <DatePicker
                  className="empbase_input"
                  dateFormat={"yyyy년 MM월 dd일"}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            ) : (
              <span>
                {dateFormatString(startDate).slice(0, 4) +
                  "년 " +
                  dateFormatString(startDate).slice(4, 6) +
                  "월 " +
                  dateFormatString(startDate).slice(6, 8) +
                  "일"}
              </span>
            )}
          </div>

          <div className="info_margin">
            외국인여부
            <Checkbox
              disabled={!parseInt(cookies["loginInfo"].authority)}
              checked={parseInt(foreign)}
              onChange={(e) => {
                if (e.target.checked == true) {
                  setForeign("1");
                } else {
                  setForeign("0");
                }
              }}
            />
          </div>
        </div>

        <div className="info_base_second info_box">
          <div className="info_margin">
            영문성명
            {cookies["loginInfo"].authority == "1" ? (
              <input
                ref={nameEngRef}
                className="empbase_input"
                Value={userData["eng_name"]}
              ></input>
            ) : (
              <span>{userData["eng_name"]}</span>
            )}
          </div>

          <div className="info_margin">
            주민등록번호
            {cookies["loginInfo"].authority == "1" ? (
              <>
                <input
                  ref={identityLRef}
                  className="empbase_input"
                  style={{ width: "100px" }}
                  Value={userData["identity"].slice(0, 6)}
                ></input>
                &nbsp;-&nbsp;
                <input
                  type={"password"}
                  ref={identityRRef}
                  className="empbase_input"
                  style={{ margin: "0px", width: "100px" }}
                  Value={userData["identity"].slice(6, 13)}
                ></input>
              </>
            ) : (
              <span>
                {userData["identity"].slice(0, 6)} -{" "}
                {userData["identity"].slice(6, 13)}
              </span>
            )}
          </div>
          <div
            className="info_margin"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div>입사일</div>
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <div>
                <DatePicker
                  className="empbase_input"
                  dateFormat={"yyyy년 MM월 dd일"}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            ) : (
              <span>
                {dateFormatString(startDate).slice(0, 4) +
                  "년 " +
                  dateFormatString(startDate).slice(4, 6) +
                  "월 " +
                  dateFormatString(startDate).slice(6, 8) +
                  "일"}
              </span>
            )}
          </div>

          <div className="info_margin">
            결혼여부
            <Checkbox
              disabled={!parseInt(cookies["loginInfo"].authority)}
              checked={parseInt(married)}
              onChange={(e) => {
                if (e.target.checked == true) {
                  setMarried("1");
                } else {
                  setMarried("0");
                }
              }}
            ></Checkbox>
          </div>
        </div>

        <div className="info_base_third info_box">
          <div
            className="info_margin"
            style={{ display: "flex", flexDirection: "row" }}
          >
            생년월일
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <div>
                <DatePicker
                  className="empbase_input"
                  dateFormat={"yyyy년 MM월 dd일"}
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                />
              </div>
            ) : (
              <span>
                {dateFormatString(birthDate).slice(0, 4) +
                  "년 " +
                  dateFormatString(birthDate).slice(4, 6) +
                  "월 " +
                  dateFormatString(birthDate).slice(6, 8) +
                  "일"}
              </span>
            )}
          </div>
          <div className="info_margin">
            재직상태
            <input
              disabled
              ref={retireClsRef}
              className="empbase_select"
              value={userData["retire_cls"] == "0" ? "재직" : "퇴직"}
            ></input>
          </div>
          <div className="info_margin">
            본부명
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <input
                disabled
                ref={centerRef}
                className="empbase_input"
                Value={userData["centerKR"]}
              ></input>
            ) : (
              <span>{userData["centerKR"]}</span>
            )}
          </div>
          <div className="info_margin">
            연봉
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <input
                ref={salaryRef}
                onChange={(e) => {inputNumberFormat(e)}}
                className="empbase_input"
                Value={comma(uncomma(parseInt(userData["salary"])))}
              ></input>
            ) : (
              <span>{parseInt(userData["salary"]).toLocaleString() + "원"}</span>
            )}
          </div>
        </div>
      </div>

      <span className="baseRead">연락처</span>
      <div className="info_base_div">
        <div className="info_base_first info_box">
          <div className="info_margin">
            이메일
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <input
                ref={emailRef}
                className="empbase_input"
                Value={userData["email"]}
              ></input>
            ) : (
              <span>{userData["email"]}</span>
            )}
          </div>
        </div>

        <div className="info_base_second info_box">
          <div
            className="info_margin"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div>휴대전화</div>
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  ref={phone1Ref}
                  style={{ width: "30px", margin: "0px" }}
                  className="empbase_input"
                  Value={userData["tel_no"].slice(0, 3)}
                ></input>{" "}
                &nbsp;-&nbsp;
                <input
                  ref={phone2Ref}
                  style={{ width: "50px", margin: "0px" }}
                  className="empbase_input"
                  Value={userData["tel_no"].slice(3, 7)}
                ></input>
                &nbsp;-&nbsp;
                <input
                  ref={phone3Ref}
                  style={{ width: "50px", margin: "0px" }}
                  className="empbase_input"
                  Value={userData["tel_no"].slice(7, 11)}
                ></input>
              </>
            ) : (
              <span>
                {userData["tel_no"].slice(0, 3) +
                  "-" +
                  userData["tel_no"].slice(3, 7) +
                  "-" +
                  userData["tel_no"].slice(7, 11)}
              </span>
            )}
          </div>
        </div>

        <div className="info_base_third info_box">
          <div
            className="info_margin"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div>사내번호</div>
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  ref={companyPhone1Ref}
                  style={{ width: "30px", margin: "0px" }}
                  className="empbase_input"
                  Value={"02"}
                ></input>{" "}
                &nbsp;-&nbsp;
                <input
                  ref={companyPhone2Ref}
                  style={{ width: "50px", margin: "0px" }}
                  className="empbase_input"
                  Value={"0" + userData["sabun"].slice(0, 3)}
                ></input>
                &nbsp;-&nbsp;
                <input
                  ref={companyPhone3Ref}
                  style={{ width: "50px", margin: "0px" }}
                  className="empbase_input"
                  Value={
                    userData["start_date"].slice(2, 4) +
                    userData["sabun"].slice(8, 10)
                  }
                ></input>
              </>
            ) : (
              <>
                <span>
                  {"02-" +
                    "0" +
                    userData["sabun"].slice(0, 3) +
                    "-" +
                    userData["start_date"].slice(2, 4) +
                    userData["sabun"].slice(8, 10)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <span className="baseRead">주소</span>
      <div className="info_base_div">
        <div className="info_base_first info_box address_box">
          <div className="info_margin">
            도로명 주소
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <input
                ref={addressRef}
                style={{ width: "500px", margin: "0px", marginLeft: "10px" }}
                className="empbase_input"
                Value={userData["address"]}
              ></input>
            ) : (
              <span>{userData["address"]}</span>
            )}
          </div>

          <div className="info_margin">
            상세주소 주소
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <input
                ref={addressDetailRef}
                style={{ width: "500px", margin: "0px", marginLeft: "10px" }}
                className="empbase_input"
                Value={userData["address_detail"]}
              ></input>
            ) : (
              <span>{userData["address_detail"]}</span>
            )}
          </div>
        </div>

        <div className="info_base_second info_box address_box2">
          <div className="info_margin">
            우편번호
            {cookies["loginInfo"].authority == "1" ? ( //관리자일때
              <input
                ref={postcodeRef}
                className="empbase_input"
                Value={userData["postcode"]}
              ></input>
            ) : (
              <span>{userData["postcode"]}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Empbase;
