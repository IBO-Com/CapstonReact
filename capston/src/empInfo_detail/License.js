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

  const addDefaultTable = (
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
  );

  const addTable = []; 

  const addBtnClick = () => { //추가 버튼
    console.log(tempTable);
  }

  useEffect(() => {
    let loginInfo = cookies["loginInfo"];
    
    let postParam = {
      sabun: loginInfo.id
    }
  
    postParam = qs.stringify(postParam);
    axios.post("http://localhost:8080/CapstonProject/getLicense.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      console.log(data);
      setLicense(data);
    })
  }, [])

  return (
    <div className="License_container">
      <div className="License_header">
        <span>자격</span>
        <div className="License_btn">
          <button className="License_removeBtn">삭제</button>
          <button className="License_addBtn" onClick={() => {addBtnClick()}}>추가</button>
          <button className="License_saveBtn">저장</button>
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
                      />
                    </td>
                    <td>{item.acq_date.slice(0, 4) + "년 " + item.acq_date.slice(4, 6) + "월 " + item.acq_date.slice(6, 8) + "일"}</td>
                    <td>{item.cer_title}</td>
                    <td>{item.cer_number}</td>
                    <td>{item.cer_center}</td>
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
