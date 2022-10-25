import React from "react";
import "../css/empinfo/License.css";

const App = () => {
  return (
    <div className="License_container">
      <div className="License_header">
        <span>자격</span>
        <div className="License_btn">
          <button className="License_addBtn">추가</button>
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
              <td>직책</td>
              <td>담당업무</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <input
                  type="radio"
                  name="licenseSelect"
                  className="license_radioBtn"
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
