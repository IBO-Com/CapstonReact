import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import { Button } from "@mui/material";
import styles from "../css/emp/empRegister/empRegister.module.css";
import "../css/emp/empRegister/FamilyRegister.css";
import { differenceInSeconds } from "date-fns";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [relationList, setRelationList] = useState("0");
  const [cohabitationList, setCohabitaionList] = useState("0");
  const [birthDate, setBirthtDate] = useState(new Date("2020-01-01"));

  const handleRelationList = (event) => {
    setRelationList(event.target.value);
  };

  const handleCohabitationList = (event) => {
    setCohabitaionList(event.target.value);
  };

  const handleBirthtDateChange = (date) => {
    setBirthtDate(date);
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
      <div className="FamilyReigster_container">
        <div className="FamilyRegister_title">
          <span>이정재의 가족</span>
          <div className="FamilyRegister_btns">
            <button className="FamilyRegister_removeBtn">삭제</button>
            <button className="FamilyRegister_addBtn">추가</button>
            <button className="FamilyRegister_saveBtn">저장</button>
          </div>
        </div>
        <div className="FamilyRegister_table">
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
                    className="FamilyRegister_radioBtn"
                  />
                </td>
                <td>
                  <FormControl size="small">
                    <Select
                      value={relationList || ""}
                      sx={{
                        minWidth: "130px",
                      }}
                      onChange={handleRelationList}
                    >
                      <MenuItem value={"0"}>부</MenuItem>
                      <MenuItem value={"1"}>모</MenuItem>
                      <MenuItem value={"2"}>배우자</MenuItem>
                      <MenuItem value={"3"}>자녀</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>김무공</td>
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
                      value={birthDate}
                      inputVariant="outlined"
                      showTodayButton
                      className="birthtDate"
                      size="small"
                      todayLabel="오늘"
                      onChange={handleBirthtDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </td>
                <td>
                  <FormControl size="small">
                    <Select
                      value={cohabitationList || ""}
                      sx={{
                        minWidth: "130px",
                      }}
                      onChange={handleCohabitationList}
                    >
                      <MenuItem value={"0"}>동거</MenuItem>
                      <MenuItem value={"1"}>별거</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
