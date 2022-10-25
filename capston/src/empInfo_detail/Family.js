import React from "react";
import "../css/empinfo/Family.css";

const App = () => {
  return (
    <div className="Family_container">
      <div className="Family_header">
        <span>가족</span>
        <div className="Family_btns">
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
            <tr>
              <td>1</td>
              <td>
                <input
                  type="radio"
                  name="familySelect"
                  className="family_radioBtn"
                />
              </td>
              <td>배우자</td>
              <td>김우굥</td>
              <td>1991-05-09</td>
              <td>동거</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
