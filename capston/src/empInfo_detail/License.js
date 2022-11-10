import React from "react";
import "../css/empinfo/License.css";
import axios from "axios";
import qs from "qs";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [license, setLicense] = useState([]);
  const [radioBtn, setRadioBtn] = useState(-1);

  const addDefaultTable = {
    acq_date: "20000101",
    cer_title: "",
    cer_number: "",
    cer_center: ""
  }
  const autoHyphen = (target) => {
    console.log(target);
    target.value = target.value
      .replace(/[^0-9]/g, '')
     .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
   }

  function YMDFormatter(num){ //날짜 자동으로 하이픈 넣기
    if(!num) return "";
    var formatNum = '';
    // 공백제거
    num=num.replace(/\s/gi, "");
    try{
         if(num.length == 8) {
              formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
         }
    } catch(e) {
         formatNum = num;
    }
    return formatNum;
  }

  const radioChange = (index) => { //라디오 체인지
    setRadioBtn(index);
  }

  const addBtnClick = () => { //추가 버튼
    let tempTable = [...license];
    tempTable.push(addDefaultTable);
    setLicense(tempTable);
  }

  const removeBtnClick = () => { //삭제버튼
    let tempTable = [...license];
    if(radioBtn == -1 || (tempTable.length-1) < radioBtn) { //라디오 버튼이 선택되지 않았을때
      alert("삭제할 데이터가 선택되지 않았습니다.");
      return;
    }
    tempTable.splice(radioBtn, 1);
    setLicense(tempTable);
  }

  const saveBtnClick = () => { //저장 버튼
    let licenseTable = document.querySelectorAll(".Licnese_table tbody tr");
    let isReady = true;
    let data = [];
    for(let i = 0; i < licenseTable.length; i ++) {
      let tempArr = [];
      for(let j = 2; j <= 5; j++) {
        let element = licenseTable[i].querySelectorAll("td")[j].querySelector("input");
        let val = element.value;
        if(j == 2) val = val.replace(/\-/g, ""); //날짜는 하이픈 없앰

        if(val.trim() == '') { //값이 없을 때
          isReady = false;
          element.className = "License_input License_td_noneData";
        } else {
          element.className = "License_input";
        }
        tempArr.push(val.replace(",", "."));
      }
      data.push(tempArr);
    }
    if(isReady == false) {
      alert("입력란에 공백이 존재합니다.");
      return;
    }
    let loginInfo = cookies["loginInfo"];
    let postParam = {
      sabun: loginInfo.id,
      length: data.length
    }
    for(let i = 0; i < data.length; i ++) {
      let row = data[i].join(",");
      postParam["data" + i] = row;
    }
    console.log(postParam);
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/updateLicense.jsp", postParam).then((res) => {
      alert("저장이 완료되었습니다.");
    }).catch((Error) => {
      alert("오류가 발생했습니다.");
      console.log(Error)
    })
  }

  useEffect(() => {
    let loginInfo = cookies["loginInfo"];
    
    let postParam = {
      sabun: loginInfo.id
    }
  
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getLicense.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      setLicense(data);
    })
  }, [])

  return (
    <div className="License_container">
      <div className="License_header">
        <span>자격</span>
        <div className="License_btn">
          <button className="License_removeBtn" onClick={()=> {removeBtnClick()}}>삭제</button>
          <button className="License_addBtn" onClick={() => {addBtnClick()}}>추가</button>
          <button className="License_saveBtn" onClick={() => {saveBtnClick()}}>저장</button>
        </div>
      </div>
      <div className="Licnese_table">
        <table>
          <thead>
            <tr>
              <td>번호</td>
              <td>삭제</td>
              <td>취득일자</td>
              <td>자격면허명</td>
              <td>자격번호</td>
              <td>부여기관</td>
            </tr>
          </thead>
          <tbody>
            {
              license.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="radio"
                        name="licenseSelect"
                        className="license_radioBtn"
                        onChange={() => {radioChange(index)}}
                      />
                    </td>
                    <td><input className="License_input" onInput={(e) => {autoHyphen(e.target)}} Value={YMDFormatter(item.acq_date)} maxLength={10}></input></td>
                    <td><input className="License_input" Value={item.cer_title}></input></td>
                    <td><input className="License_input" Value={item.cer_number}></input></td>
                    <td><input className="License_input" Value={item.cer_center}></input></td>
                  </tr>
                )
              })
            }
            

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
