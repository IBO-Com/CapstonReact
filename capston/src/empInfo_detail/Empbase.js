import React from "react";
import "../css/Empbase/Empbase.css";
import { Checkbox } from '@mui/material';
const Empbase = ({userData, defaultYear}) => {
  return (
    Object.keys(userData).length > 0 ? (
      <div className="baseInfo">
      <span className="baseRead">기본사항</span>
      <div className="info_base_div">
        <div className="info_base_first info_box">
          <div className="info_margin">
            성명
            <span>{userData["name"]}</span>
          </div>

          <div className="info_margin">
            성별
            <span>{userData["gender"] == "0" ? "남자" : "여자"}</span>
          </div>
          <div className="info_margin">
            그룹입사일
            <span>2022-10-02</span>
          </div>

          <div className="info_margin">
            외국인여부
            <Checkbox />
          </div>
        </div>

        <div className="info_base_second info_box">
        <div className="info_margin">
            영문성명
            <span>{userData["eng_name"]}</span>
          </div>

          <div className="info_margin">
            주민등록번호
            <span>{userData["identity"].slice(0, 6) + "-" + userData["identity"].slice(6, 13)}</span>
          </div>
          <div className="info_margin">
            입사일
            <span>2022-10-02</span>
          </div>

          <div className="info_margin">
            결혼여부
            <Checkbox />
          </div>
        </div>

        <div className="info_base_third info_box">
        <div className="info_margin">
            고용구분
            <span>[공개채용 | 기타]</span>
          </div>

          <div className="info_margin">
            생년월일
            <span>{(defaultYear + userData["identity"].slice(0, 2)) + "-" + userData["identity"].slice(2, 4) + "-" + userData["identity"].slice(4, 6)} | 양</span>
          </div>
          <div className="info_margin">
            인성직급/년차
            <span>[상무보/2년차]</span>
          </div>

          <div className="info_margin">
            재직상태
            <span>{userData["retire_cls"] == 0 ? "재직" : "퇴직"}</span>
          </div>
        </div>

      </div>

      <span className="baseRead">연락처</span>
      <div className="info_base_div">
        <div className="info_base_first info_box">
          <div className="info_margin">
            사무실전화
            <span>[02-564-7894]</span>
          </div>

        </div>

        <div className="info_base_second info_box">
        <div className="info_margin">
            사내이메일
            <span>{userData["email"]}</span>
          </div>
    

        </div>

        <div className="info_base_third info_box">
        <div className="info_margin">
            휴대전화
            <span>{userData["tel_no"].slice(0, 3) + "-" + userData["tel_no"].slice(3, 7) + "-" + userData["tel_no"].slice(7, 11)}</span>
          </div>


        </div>

      </div>


      <span className="baseRead">주소</span>
      <div className="info_base_div">
        <div className="info_base_first info_box address_box">
          <div className="info_margin">
            현주소지
            <span>{userData["address"]}</span>
          </div>

          <div className="info_margin">
            주민등록지
            <span>{userData["address"]}</span>
          </div>
          
        </div>

        <div className="info_base_second info_box address_box2">
        <div className="info_margin">
            우편번호
            <span>[111-2222]</span>
          </div>

          <div className="info_margin">
            우편번호
            <span>[111-2222]</span>
          </div>
       
        </div>

     

      </div>

    </div>
    ) : (
      <>
      </>
    )
   
  );
};

export default Empbase;
