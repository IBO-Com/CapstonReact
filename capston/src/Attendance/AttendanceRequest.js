import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RequestOW from "./RequestOW";

function AttendanceRequest() {
  const [radioValue, setRadioValue] = React.useState("OW");

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <div
      style={{
        width: "98%",
        minHeight: "790px",
        background: "white",
      }}
    >
      <div
        style={{
          marginLeft: "60px",
        }}
      >
        <p>근태/근무신청 구분</p>
      </div>

      <hr className="card_lineBar" align="left" />
      <div
        style={{
          marginTop: "20px",
          marginLeft: "70px",
        }}
      >
        <FormControl>
          <RadioGroup
            row
            fixed
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radioValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="OW" control={<Radio />} label="외근" />
            <FormControlLabel value="BT" control={<Radio />} label="출장" />
            <FormControlLabel value="HW" control={<Radio />} label="재택" />
            <FormControlLabel value="RW" control={<Radio />} label="휴일대체" />
          </RadioGroup>
        </FormControl>
      </div>
      <div>{radioValue === "OW" ? <RequestOW /> : ""}</div>
    </div>
  );
}

export default React.memo(AttendanceRequest);
