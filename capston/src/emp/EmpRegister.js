import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import styles from "../css/emp/empRegister/empRegister.module.css";
import FormControl from "@mui/material/FormControl";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import qs from "qs";
import AccountRegister from "./AccountRegister";
import FamilyRegister from "./FamilyRegister";
import LicenseRegister from "./LicenseRegister";
import HelloBaseTab from "./HelloBaseTab";

function EmpRegister() {
  const [toogleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "98%",
        minHeight: "790px",
        maxHeight: "790px",
      }}
    >
      <div className={styles.empLine}>
        <hr className={styles.empFirstLine} align="left" />
        <div className={styles.empTabFlex}>
          <div
            className={styles.empBasic}
            onClick={() => {
              toggleTab(1);
            }}
          >
            인사기본
          </div>
          <div
            className={styles.account}
            onClick={() => {
              toggleTab(2);
            }}
          >
            계좌
          </div>
          <div
            className={styles.family}
            onClick={() => {
              toggleTab(3);
            }}
          >
            가족
          </div>
          <div
            className={styles.license}
            onClick={() => {
              toggleTab(4);
            }}
          >
            자격
          </div>
        </div>
        <hr className={styles.empFirstLine} align="left" />
        <div>
          {toogleState === 1 ? <HelloBaseTab /> : ""}
          {toogleState === 2 ? <AccountRegister /> : ""}
          {toogleState === 3 ? <FamilyRegister /> : ""}
          {toogleState === 4 ? <LicenseRegister /> : ""}
        </div>
      </div>
    </div>
  );
}

export default React.memo(EmpRegister);
