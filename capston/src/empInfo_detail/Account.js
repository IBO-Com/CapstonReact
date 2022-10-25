import React from "react";
import "../css/empinfo/Account.css";

const Account = () => {
  return (
    <div className="Account_container">
      <div className="Account_header">
        <span>계좌</span>
        <div className="Account_btns">
          <button className="Account_addBtn">추가</button>
          <button className="Account_saveBtn">저장</button>
        </div>
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
              <td>비고</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <input
                  type="radio"
                  name="userSelect"
                  className="account_radio"
                  //   onChange={() => {
                  //     radioBoxChange(name.sabun);
                  //   }}
                />
              </td>
              <td>신한은행</td>
              <td>1020301203102</td>
              <td>이정재</td>
              <td> </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <input
                  type="radio"
                  name="userSelect"
                  className="account_radio"
                  //   onChange={() => {
                  //     radioBoxChange(name.sabun);
                  //   }}
                />
              </td>
              <td>농협은행</td>
              <td>1022601234105</td>
              <td>이정재</td>
              <td> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Account;
