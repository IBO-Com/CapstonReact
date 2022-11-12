import React, { useEffect, useRef, useState } from "react";
import "../css/Empbase/Empbase.css";
import { Checkbox } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Empbase = ({ userData, defaultYear }) => {
  const [startDate, setStartDate] = useState(new Date()); //입사일
  const [groupStartDate, setGroupStartDate] = useState(new Date()); //그룹입사일
  const [birthDate, setBirthDate] = useState(new Date()); //생년월일
  const [foreign, setForeign] = useState("0"); //외국인 여부
  const [married, setMarried] = useState("0"); //결혼 여부

  const nameRef = useRef(); //이름
  const nameEngRef = useRef(); //영어이름
  const genderRef = useRef(); //성별
  const identityLRef = useRef(); //주민번호 왼쪽
  const identityRRef = useRef(); //주민번호 오른쪽
  const retireClsRef = useRef(); //재직상태
  const centerRef = useRef(); //본부명
  const foreignRef = useRef(); //외국인여부
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

  const saveBtnHandler = () => {
    //console.log(genderRef.current.value);
    console.log(foreignRef.current);
  }

  useEffect(() => {
    if(Object.keys(userData).length > 0) {
      let identityBase = userData["identity"].slice(6, 7);
      let year = "19";
      if (identityBase == "1" || identityBase == "2") {
        year = "19";
      } else {
        year = "20";
      }
      let birthYear = year + userData["identity"].slice(0, 2);
      let birthMonth = (parseInt(userData["identity"].slice(2, 4))-1);
      let birthDay = userData["identity"].slice(4, 6);
      console.log(birthYear, birthMonth, birthDay);
      setBirthDate(new Date(birthYear, birthMonth, birthDay))
      setForeign(userData["foreign"]);
    } 
  }, [])

  return Object.keys(userData).length > 0 ? (
    <div className="baseInfo" style={{marginTop:"10px", marginLeft: "100px", marginRight: "10px", overflowX: "hidden",overflowY: "auto", height: "470px"}}>
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
          color: "white"
        }}
        className="card_search_btn"
        onClick={() => {
          saveBtnHandler();
        }}
      >
        저장
      </button>
    </div>

      <span className="baseRead">기본사항</span>
      <div className="info_base_div">
        <div className="info_base_first info_box">
          <div className="info_margin">
            성명
            <input ref={nameRef} className="empbase_input" Value={userData["name"]}></input>
          </div>

          <div className="info_margin">
            성별
            <select ref={genderRef} className="empbase_select" defaultValue={userData["gender"]}>
              <option value="0">남자</option>
              <option value="1">여자</option>
            </select>
          </div>
          <div className="info_margin" style={{display:"flex", flexDirection:"row"}}>
            <div>그룹입사일</div>
            <div >
              <DatePicker  className="empbase_input" dateFormat={"yyyy년 MM월 dd일"} selected={groupStartDate} onChange={date => setGroupStartDate(date)} />
            </div>
          </div>

          <div className="info_margin">
            외국인여부
            <Checkbox 
              checked={parseInt(foreign)}
              onChange={(e) => {
              if(e.target.checked == true) {
                setForeign("1");
              } else {
                setForeign("0");
              }
            }} />
          </div>
        </div>

        <div className="info_base_second info_box">
          <div className="info_margin">
            영문성명
            <input className="empbase_input" Value={userData["eng_name"]}></input>
          </div>

          <div className="info_margin" >
            주민등록번호
            <input className="empbase_input" style={{width:"100px"}} Value={userData["identity"].slice(0, 6)}></input>
            &nbsp;-&nbsp; 
            <input className="empbase_input" style={{margin:"0px", width:"100px"}} Value={userData["identity"].slice(6, 13)}></input>
          </div>
          <div className="info_margin"  style={{display:"flex", flexDirection:"row"}}>
          <div >입사일</div>
            <div >
              <DatePicker className="empbase_input" dateFormat={"yyyy년 MM월 dd일"} selected={startDate} onChange={date => setStartDate(date)} />
            </div>
          </div>

          <div className="info_margin">
            결혼여부
            <Checkbox onChange={(e) => {
              if(e.target.checked == true) {
                //여기 해야함
              } else {
                setForeign("0");
              }}}
              />
          </div>
        </div>

        <div className="info_base_third info_box">
          <div className="info_margin" style={{display:"flex", flexDirection:"row"}}>
            생년월일
            
            <div >
              <DatePicker className="empbase_input" dateFormat={"yyyy년 MM월 dd일"} selected={birthDate} onChange={date => setBirthDate(date)} />
            </div>
          </div>
          <div className="info_margin">
            재직상태
            <select className="empbase_select" defaultValue={userData["retire_cls"]}>
              <option value="0">재직</option>
              <option value="1">퇴직</option>
            </select>
          </div>
          <div className="info_margin">
            본부명
            <input className="empbase_input" Value={userData["centerKR"]}></input>
          </div>
        </div>
      </div>

      <span className="baseRead">연락처</span>
      <div className="info_base_div">
        <div className="info_base_first info_box">
          <div className="info_margin">
            이메일
            <input className="empbase_input" Value={userData["email"]}></input>
          </div>
        </div>

        <div className="info_base_second info_box">
          <div className="info_margin" style={{display:"flex", flexDirection:"row"}}>
            <div>휴대전화</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input style={{width:"30px", margin:"0px"}} className="empbase_input" Value={userData["tel_no"].slice(0, 3)}></input> &nbsp;-&nbsp;
            <input style={{width:"50px", margin:"0px"}} className="empbase_input" Value={userData["tel_no"].slice(3, 7)}></input>&nbsp;-&nbsp;
            <input style={{width:"50px", margin:"0px"}} className="empbase_input" Value={userData["tel_no"].slice(7, 11)}></input>
          </div>
        </div>

        <div className="info_base_third info_box">
        <div className="info_margin" style={{display:"flex", flexDirection:"row"}}>
            <div>사내번호</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input style={{width:"30px", margin:"0px"}} className="empbase_input" Value={"02"}></input> &nbsp;-&nbsp;
            <input style={{width:"50px", margin:"0px"}} className="empbase_input" Value={"0" + userData["sabun"].slice(0, 3)}></input>&nbsp;-&nbsp;
            <input style={{width:"50px", margin:"0px"}} className="empbase_input" Value={userData["start_date"].slice(2, 4) + userData["sabun"].slice(8, 10)}></input>
          </div>
        </div>
      </div>

      <span className="baseRead">주소</span>
      <div className="info_base_div">
        <div className="info_base_first info_box address_box">
          <div className="info_margin">
            도로명 주소
            <input style={{width:"500px", margin:"0px", marginLeft:"10px"}} className="empbase_input" Value={userData["address"]}></input>
          </div>

          <div className="info_margin">
            상세주소 주소
            <input style={{width:"500px", margin:"0px", marginLeft:"10px"}} className="empbase_input" Value={userData["address_detail"]}></input>
          </div>

        </div>

        <div className="info_base_second info_box address_box2">
          <div className="info_margin">
            우편번호
            <input className="empbase_input" Value={userData["postcode"]}></input>
          </div>

        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Empbase;
