import axios from "axios";
import qs from "qs";
import React from "react";
import { useEffect } from "react";
import "../css/empinfo/Family.css";
import { useCookies } from "react-cookie";
import { useState } from "react";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [family, setFamily] = useState([]);
  const [defaultYear, setDefaultYear] = useState(19);
  let relation = {
    "0" : "부",
    "1" : "모",
    "2" : "배우자",
    "3" : "자녀"
  }
  let cohabitation = {
    "0" : "별거",
    "1" : "동거"
  }

  useEffect(() => {
    let loginInfo = cookies["loginInfo"];
    let postParam = {
      sabun: loginInfo.id
    }


    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getFamily.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      console.log(data);
      setFamily(data);
    }).catch((Error) => {
      console.log(Error);
    })
  }, []);

  return (
    <div className="Family_container">
      <div className="Family_header">
        <span>가족</span>
        <div className="Family_btns">
          <button className="Family_removeBtn">삭제</button>
          <button className="Family_addBtn">추가</button>
          <button className="Family_saveBtn">저장</button>
        </div>
      </div>
      <div className="Family_table">
        <table>
          <thead>
            <tr>
              <td>번호</td>
              <td>삭제</td>
              <td>관계</td>
              <td>성명</td>
              <td>생년월일</td>
              <td>동거여부</td>
            </tr>
          </thead>
          <tbody>
            {
              family.map((item, index) => {
                
                return(
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="radio"
                        name="familySelect"
                        className="family_radioBtn"
                      />
                    </td>
                    <td>{relation[item.relation]}</td>
                    <td>{item.name}</td>
                    <td>{
                      new Date().getFullYear() - 2000 < parseInt(item.identity.slice(0, 2)) ? "19" : "20" + 
                      item.identity.slice(0, 2) + "-" + item.identity.slice(2, 4) + "-" + item.identity.slice(4, 6) 
                      }</td>
                    <td>{item.cohabitation == "0" ? "별거" : "동거"}</td>
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
