import React from "react";
import "../css/accountregister/accountRegister.css";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@mui/material";
import styles from "../css/emp/empRegister/empRegister.module.css";

const App = () => {
  return (
    <div className="accountRegister_container">
      <Button
        className={styles.buttonStyle}
        style={{
          marginLeft: "92%",
          marginRight: "2.5vw",
          marginTop: "-90px",
        }}
        // onClick={() => clickSaveButton()}
        variant="contained"
      >
        저장
      </Button>

      <div className="accountRegister_title">
        <span>김명지의 계좌</span>
        <div className="accountRegister_Btn">
          <button className="accountRegister_addBtn">추가</button>
          <button className="accountRegister_saveBtn">저장</button>
        </div>
      </div>
      <div className="accountRegister_list">
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
              <td>김명지</td>
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
              <td>김명지</td>
              <td> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
