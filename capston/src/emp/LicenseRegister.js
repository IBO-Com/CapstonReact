import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import { Button } from "@mui/material";
import styles from "../css/emp/empRegister/empRegister.module.css";
import "../css/emp/empRegister/LicenseRegister.css";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [licenseDate, setLicenseDate] = useState(new Date("2020-01-01"));

  const handleLicenseDateChange = (date) => {
    setLicenseDate(date);
  };
  return (
    <>
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
      <div className="LicenseRegister_container">
        <div className="LicenseRegister_title">
          <span>이정재의 자격</span>
          <div className="LicenseRegister_btns">
            <button className="LicenseRegister_removeBtn">삭제</button>
            <button className="LicenseRegister_addBtn">추가</button>
            <button className="LicenseRegister_saveBtn">저장</button>
          </div>
        </div>
        <div className="LicenseRegister_table">
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
                    className="LicenseRegister_radioBtn"
                  />
                </td>
                <td>
                  <MuiPickersUtilsProvider
                    utils={koLocalizedUtils}
                    locale={koLocale}
                  >
                    <DatePicker
                      autoOk
                      variant="inline"
                      views={["year", "month", "date"]}
                      format="yyyy-MM-dd"
                      value={licenseDate}
                      inputVariant="outlined"
                      showTodayButton
                      className="LicensetDate"
                      size="small"
                      todayLabel="오늘"
                      onChange={handleLicenseDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
