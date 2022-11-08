import React, { useEffect, useState } from "react";
import "../css/empinfo/Account.css";
import qs from "qs";
import axios from "axios";
import { useCookies } from "react-cookie";
import bankCode from "../bankCode";

const Account = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [getBank, setGetBank] = useState([]);

  useEffect(() => {
    let loginInfo = cookies["loginInfo"];
    
    let postParam = {
      sabun: loginInfo.id
    }
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getBank.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      setGetBank(data);
    })
    .catch((Error) => {
        alert("급여지출현황 오류!!");
    });


  }, []);

  return (
    <div className="Account_container">
      <div className="Account_header">
        <span>계좌</span>
        {
          
        <div className="Account_btns">
          <button className="Account_removeBtn">삭제</button>
          <button className="Account_addBtn">추가</button>
          <button className="Account_saveBtn">저장</button>
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
              getBank.map((item, index) => {
                
                return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="radio"
                      name="userSelect"
                      className="account_radio"
                    />
                  </td>
                  <td>{bankCode[String(item.bank).padStart(3, '0')]}</td>
                  <td>{item.ac_number}</td>
                  <td>{item.bank_nam}</td>
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
