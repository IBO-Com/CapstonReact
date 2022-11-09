import React, { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import * as Cookie from "../cookies/cookies";
import axios from "axios";
import qs from "qs";

function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate();
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "-" + month + "-" + day;
}

function RequestBT() {
  const formRef = useRef();
  const [dateStart, setDateStart] = useState(getFormatDate(new Date()));
  const [dateEnd, setDateEnd] = useState(getFormatDate(new Date()));

  const handleChangeStartDate = (date) => {
    setDateStart(date.target.value);
  };

  const handleChangeEndDate = (date) => {
    setDateEnd(date.target.value);
  };

  const urlSave = "http://43.200.115.198:8080/attrequest.jsp";
  //const urlSave = "http://localhost:8080/attrequestBT.jsp";

  const clickSaveButton = () => {
    if (formRef.current.reportValidity()) {
      if (window.confirm("신청하시겠습니까?")) {
        let sabun = Cookie.getCookie("empInfo").id;
        let postParam = qs.stringify({
          sabun: sabun,
          start_date: dateStart,
          end_date: dateEnd,
          work_form: "BT",
        });

        console.log(postParam);

        axios.post(urlSave, postParam).then((response) => {
          console.log(response);
          if (response.data.result === "success") {
            alert("저장되었습니다.");
          } else {
            alert("error");
          }
        });
      }
    }
  };

  return (
    <>
      <form ref={formRef}>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "60px",
          }}
        >
          <p>신청날짜</p>
        </div>
        <hr className="card_lineBar" align="left" />
        <div
          style={{
            marginTop: "30px",
            marginLeft: "60px",
          }}
        >
          <input
            style={{
              width: "150px",
              height: "40px",
              fontSize: "15px",
              marginRight: "20px",
            }}
            type="date"
            id="start"
            name="trip-start"
            value={dateStart}
            onChange={handleChangeStartDate}
            min="2022-01-01"
          ></input>
          ~
          <input
            style={{
              width: "150px",
              height: "40px",
              fontSize: "15px",
              marginLeft: "20px",
            }}
            type="date"
            id="start"
            name="trip-start"
            value={dateEnd}
            onChange={handleChangeEndDate}
            min="2022-01-01"
          ></input>
        </div>

        <div
          style={{
            marginTop: "30px",
            marginLeft: "60px",
          }}
        ></div>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "60px",
          }}
        >
          <p>사유</p>
        </div>
        <hr className="card_lineBar" align="left" />
        <div
          style={{
            marginTop: "30px",
            marginLeft: "60px",
          }}
        >
          <TextField InputProps={{ sx: { width: "70vw", height: "10vh" } }} />
        </div>
        <div>
          <Button
            style={{
              marginTop: "70px",
              marginLeft: "45%",
              width: "150px",
            }}
            onClick={() => clickSaveButton()}
            variant="contained"
          >
            신청하기
          </Button>
        </div>
      </form>
    </>
  );
}

export default React.memo(RequestBT);
