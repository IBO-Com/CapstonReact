import React, { useEffect, useState } from "react";
import "../css/empinfo/Account.css";
import qs from "qs";
import axios from "axios";
import { useCookies } from "react-cookie";
import bankCode from "../bankCode";

const Account = ({userData}) => {
  const [account, setAccount] = useState([]);
  const [radioBtn, setRadioBtn] = useState(-1);

  const addDefaultTable = {
    bank:"011",
    ac_number: "",
    bank_nam: ""
  }

  useEffect(() => {
    let loginInfo = userData;
    
    let postParam = {
      sabun: loginInfo["sabun"]
    }
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getBank.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      setAccount(data);
    })
    .catch((Error) => {
        alert("급여지출현황 오류!!");
    });


  }, [userData]);

  const addBtnClick = () => { //추가 버튼
    let tempTable = [...account];
    tempTable.push(addDefaultTable);
    setAccount(tempTable);
  }

  const removeBtnClick = () => { //삭제버튼
    let tempTable = [...account];
    if(radioBtn == -1 || (tempTable.length-1) < radioBtn) { //라디오 버튼이 선택되지 않았을때
      alert("삭제할 데이터가 선택되지 않았습니다.");
      return;
    }
    tempTable.splice(radioBtn, 1);
    setAccount(tempTable);
  }

  const saveBtnClick = () => { //저장 버튼
    let familyTable = document.querySelectorAll(".Account_table tbody tr");
    let isReady = true;
    let data = [];
    for(let i = 0; i < familyTable.length; i ++) {
      let tempArr = [];
      for(let j = 2; j <= 4; j++) {
        let element = null; 
        if(j == 2) {
          element = familyTable[i].querySelectorAll("td")[j].querySelector("select");
        } else {
          element = familyTable[i].querySelectorAll("td")[j].querySelector("input");
        }
        let val = element.value;
        val = val.replace(/\-/g, ""); //날짜는 하이픈 없앰

        if(val.trim() == '') { //값이 없을 때
          isReady = false;
          element.className = "Account_input Account_td_noneData";
        } else {
          element.className = "Account_input";
        }
        tempArr.push(val.replace(",", "."));
      }
      data.push(tempArr);
    }
    if(isReady == false) {
      alert("입력란에 공백이 존재합니다.");
      return;
    }
    let postParam = {
      sabun: userData["sabun"],
      length: data.length
    }
    for(let i = 0; i < data.length; i ++) {
      let row = data[i].join(",");
      postParam["data" + i] = row;
    }
    console.log(postParam);
    postParam = qs.stringify(postParam);

    
    axios.post("http://43.200.115.198:8080/updateAccount.jsp", postParam).then((res) => {
      alert("저장이 완료되었습니다.");
    }).catch((Error) => {
      alert("오류가 발생했습니다.");
      console.log(Error)
    })
    
  }

  return (
    <div className="Account_container">
      <div className="Account_header">
        <span>계좌</span>
        {
          
        <div className="Account_btns">
          <button className="Family_removeBtn" onClick={() => {removeBtnClick()}}>삭제</button>
          <button className="Family_addBtn" onClick={() => {addBtnClick()}}>추가</button>
          <button className="Family_saveBtn"onClick={() => {saveBtnClick()}}>저장</button>
        </div>
        }
      </div>
      <div className="Account_table">
        <table>
          <thead>
            <tr>
              <td>번호</td>
              <td>삭제</td>
              <td>은행코드</td>
              <td>계좌번호</td>
              <td>예금주</td>
            </tr>
          </thead>
          <tbody>
              {
              account.map((item, index) => {
                return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="radio"
                      name="userSelect"
                      className="account_radio"
                      onChange={() => { setRadioBtn(index)}}
                    />
                  </td>
                  <td>
                    <select  className="Account_select" defaultValue={String(item.bank).padStart(3, '0')}>
                      <option  style={{fontSize:"15px"}} key="0b" value="011">농협은행</option>
                      <option style={{fontSize:"15px"}} key="1b" value="004">국민은행</option>
                      <option style={{fontSize:"15px"}} key="2b" value="081">하나은행</option>
                      <option style={{fontSize:"15px"}} key="2b" value="088">신한은행</option>
                      <option style={{fontSize:"15px"}} key="4b" value="020">우리은행</option>
                    </select>
                  </td>
                  <td><input className="Account_input" Value={item.ac_number}></input></td>
                  <td><input className="Account_input" Value={item.bank_nam}></input></td>
                </tr>
                )})
              }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Account;
