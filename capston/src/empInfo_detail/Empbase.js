import React from "react";
import "../css/Empbase/Empbase.css";
import { Checkbox } from '@mui/material';
const Empbase = () => {
  return (
    <div className="baseInfo">
      <span className="baseRead">기본사항</span>
      <div className="info_base_div">
        <div className="info_base_first info_box">
          <div className="info_margin">
            성명
            <span>김명지</span>
          </div>

          <div className="info_margin">
            성별
            <span>여</span>
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
            <span>KIM MYOUNG JI</span>
          </div>

          <div className="info_margin">
            주민등록번호
            <span>000222-4111111</span>
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
            <span>공개채용 | 기타</span>
          </div>

          <div className="info_margin">
            생년월일
            <span>2000-02-22 | 양</span>
          </div>
          <div className="info_margin">
            인성직급/년차
            <span>상무보/2년차</span>
          </div>

          <div className="info_margin">
            재직상태
            <span>재직</span>
          </div>
        </div>

      </div>

      <span className="baseRead">연락처</span>
      <div className="info_base_div">
        <div className="info_base_first info_box">
          <div className="info_margin">
            사무실전화
            <span>02-564-7894</span>
          </div>

          <div className="info_margin">
            사내이메일
            <span>mm123@ibo.co.kr</span>
          </div>
        </div>

        <div className="info_base_second info_box">
        <div className="info_margin">
            자택전화
            <span>02-342-1283</span>
          </div>

          <div className="info_margin">
            사외이메일
            <span>mm123@gmail.com</span>
          </div>
  
    

        </div>

        <div className="info_base_third info_box">
        <div className="info_margin">
            휴대전화
            <span>01036626022</span>
          </div>

          <div className="info_margin">
            비상연락망
            <span>01036626022</span>
          </div>

        </div>

      </div>


      <span className="baseRead">주소</span>
      <div className="info_base_div">
        <div className="info_base_first info_box address_box">
          <div className="info_margin">
            현주소지
            <span>서울특별시 서대문구 가좌로 134</span>
          </div>

          <div className="info_margin">
            주민등록지
            <span>서울특별시 서대문구 가좌로 134</span>
          </div>
          
        </div>

        <div className="info_base_second info_box address_box2">
        <div className="info_margin">
            우편번호
            <span>111-2222</span>
          </div>

          <div className="info_margin">
            우편번호
            <span>111-2222</span>
          </div>
       
        </div>

     

      </div>

    </div>
  );
};

export default Empbase;
