import React from "react";
import "../css/accountregister/accountRegister.css";
import Checkbox from "@material-ui/core/Checkbox";

const App = () => {
  return (
    <div className="accountRegister_container">
      <div className="accountRegister_Tab">
        <div className="accountRegister_empInfo">인사기본</div>
        <div className="accountRegister_account">계좌</div>
        <button className="accountRegister_registerBtn">등록</button>
      </div>
      <div className="accountRegister_content">
        <div className="accountRegister_title">
          <span>김명지의 계좌</span>
          <div className="accountRegister_Btn">
            <button className="accountRegister_addBtn">추가</button>
            <button className="accountRegister_saveBtn">저장</button>
          </div>
        </div>
        <div className="accountRegister_list">
          <table className="accountRegister_accountTable">
            <th>번호</th>
            <th>삭제</th>
            <th>은행코드</th>
            <th>계좌번호</th>
            <th>예금주</th>
            <th>비고</th>
            <tr>
              <td>1</td>
              <td className="accountRegister_checkbox">
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </td>
              <td>신한은행</td>
              <td>1020301203102</td>
              <td>김명지</td>
              <td> </td>
            </tr>
            <tr>
              <td>2</td>
              <td className="accountRegister_checkbox">
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </td>
              <td>농협은행</td>
              <td>1022601234105</td>
              <td>김명지</td>
              <td> </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
